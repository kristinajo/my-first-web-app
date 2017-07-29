package com.iktpreobuka.paymentsproject.controllers;

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
import org.springframework.web.bind.annotation.RestController;

import com.iktpreobuka.paymentsproject.controllers.util.RESTError;
import com.iktpreobuka.paymentsproject.entities.AddressEntity;
import com.iktpreobuka.paymentsproject.repositories.AddressRepository;

@RestController
@RequestMapping("/addresses")
@CrossOrigin
public class AddressController {

	@Autowired
	private AddressRepository addressRepository;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> getAddresses() {
		return new ResponseEntity<List<AddressEntity>>((List<AddressEntity>) addressRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/{id}")
	public ResponseEntity<?> getAddressById(@PathVariable Integer id) {
		try {
			for (AddressEntity addressDB : addressRepository.findAll()) {
				if(addressDB.getId().equals(id)) {
					return new ResponseEntity<AddressEntity>(addressRepository.findOne(id), HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Address not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> saveAddress(@RequestBody AddressEntity address) {
		addressRepository.save(address);
		return new ResponseEntity<AddressEntity>(address, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/{id}")
	public ResponseEntity<?> updateAddress(@PathVariable Integer id, @RequestBody AddressEntity address) {
		try {
			for (AddressEntity addressEntity : addressRepository.findAll()) {
				if (addressEntity.getId().equals(id)) {
					AddressEntity addressDB = addressRepository.findOne(id);
					addressDB.setStreet(address.getStreet());
					addressDB.setCity(address.getCity());
					addressDB.setCountry(address.getCountry());
					addressRepository.save(addressDB);
					return new ResponseEntity<AddressEntity>(addressDB, HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Address not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<?> deleteAddress(@PathVariable Integer id) {
		AddressEntity addressDB = addressRepository.findOne(id);
		if(addressDB != null) {
			addressRepository.delete(id);
			return new ResponseEntity<AddressEntity>(addressDB, HttpStatus.OK);
		}
		return new ResponseEntity<RESTError>(new RESTError(1, "Address not found"), HttpStatus.NOT_FOUND);
	}
}
