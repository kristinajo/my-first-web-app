package com.iktpreobuka.paymentsproject.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iktpreobuka.paymentsproject.controllers.util.RESTError;
import com.iktpreobuka.paymentsproject.repositories.AccountRepository;
import com.iktpreobuka.paymentsproject.repositories.AddressRepository;
import com.iktpreobuka.paymentsproject.repositories.ClientRepository;
import com.iktpreobuka.paymentsproject.services.ClientDao;
import com.iktpreobuka.paymentsproject.entities.AddressEntity;
import com.iktpreobuka.paymentsproject.entities.ClientEntity;
import com.iktpreobuka.paymentsproject.entities.AccountEntity;

@RestController
@RequestMapping("/clients")
@CrossOrigin
public class ClientController {

	@Autowired
	private ClientRepository clientRepository;
	
	@Autowired
	private ClientDao clientDao;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private AccountRepository accountRepository;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> getClients() {
		return new ResponseEntity<List<ClientEntity>>((List<ClientEntity>) clientRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/{id}")
	public ResponseEntity<?> getClientById(@PathVariable Integer id) {
		try {
			for (ClientEntity clientDB : clientRepository.findAll()) {
				if(clientDB.getId().equals(id)) {
					return new ResponseEntity<ClientEntity>(clientRepository.findOne(id), HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Client not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/{id}/accounts")
	public ResponseEntity<?> getAccounts(@PathVariable Integer id) {
		try {
			for (ClientEntity clientDB : clientRepository.findAll()) {
				if(clientDB.getId().equals(id)) {
					return new ResponseEntity<List<AccountEntity>>((List<AccountEntity>) accountRepository.findByOwnerId(id), HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Client not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> saveClient(@RequestBody ClientEntity client) {
		clientRepository.save(client);
		return new ResponseEntity<ClientEntity>(client, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/{id}")
	public ResponseEntity<?> updateClient(@PathVariable Integer id, @RequestBody ClientEntity client) {
		try {
			for (ClientEntity clientEntity : clientRepository.findAll()) {
				if (clientEntity.getId().equals(id)) {
					ClientEntity clientDB = clientRepository.findOne(id);
					clientDB.setName(client.getName());
					clientDB.setSurname(client.getSurname());
					clientDB.setEmail(client.getEmail());
					clientDB.setMobilePhoneNumber(client.getMobilePhoneNumber());
					clientDB.setPersonalId(client.getPersonalId());
					clientDB.setAddress(client.getAddress());
					clientRepository.save(clientDB);
					return new ResponseEntity<ClientEntity>(clientDB, HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Client not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<?> deleteClient(@PathVariable Integer id) {
		ClientEntity clientDB = clientRepository.findOne(id);
		if(clientDB != null) {
			for (AccountEntity accountDB : accountRepository.findByOwnerId(id)) {
				accountDB.setOwner(null);
			}
			clientRepository.delete(id);
			return new ResponseEntity<ClientEntity>(clientDB, HttpStatus.OK);
		}
		return new ResponseEntity<RESTError>(new RESTError(1, "Client not found"), HttpStatus.NOT_FOUND);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/by-surname")
	public ResponseEntity<?> findBySurname(@RequestParam String surname) {
		return new ResponseEntity<List<ClientEntity>>((List<ClientEntity>) clientRepository.findBySurnameAllIgnoreCaseOrderByNameAsc(surname), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/by-name")
	public ResponseEntity<?> findByName(@RequestParam String name) {
		return new ResponseEntity<List<ClientEntity>>((List<ClientEntity>) clientRepository.findByNameAllIgnoreCaseOrderBySurnameAsc(name), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/{id}/address")
	public ResponseEntity<?> addAddressToClient(@PathVariable Integer id, @RequestBody AddressEntity address) {
		try {
			for (ClientEntity clientEntity : clientRepository.findAll()) {
				if (clientEntity.getId().equals(id)) {
					ClientEntity clientDB = clientRepository.findOne(id);
					AddressEntity addressDB = addressRepository.findFirstByStreetAndCityAndCountry(address.getStreet(), address.getCity(), address.getCountry());
					if(addressDB != null) {
						clientDB.setAddress(addressDB);
						clientRepository.save(clientDB);
					}
					else {
						addressRepository.save(address);
						clientDB.setAddress(address);
						clientRepository.save(clientDB);
					}
					return new ResponseEntity<ClientEntity>(clientDB, HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Client not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/by-city")
	public ResponseEntity<?> findClientsByCity(@RequestParam String city) {
		return new ResponseEntity<List<ClientEntity>>((List<ClientEntity>) clientDao.findClientsByCity(city), HttpStatus.OK);
	}
	
}
