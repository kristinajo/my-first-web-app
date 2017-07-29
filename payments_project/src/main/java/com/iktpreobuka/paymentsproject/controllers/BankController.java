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
import com.iktpreobuka.paymentsproject.entities.BankEntity;
import com.iktpreobuka.paymentsproject.repositories.BankRepository;

@RestController
@RequestMapping("/banks")
@CrossOrigin
public class BankController {

	@Autowired
	private BankRepository bankRepository;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> getBanks() {
		return new ResponseEntity<List<BankEntity>>((List<BankEntity>) bankRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/{id}")
	public ResponseEntity<?> getBankById(@PathVariable Integer id) {
		try {
			for (BankEntity bankDB : bankRepository.findAll()) {
				if(bankDB.getId().equals(id)) {
					return new ResponseEntity<BankEntity>(bankRepository.findOne(id), HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Bank not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> saveBank(@RequestBody BankEntity bank) {
		bankRepository.save(bank);
		return new ResponseEntity<BankEntity>(bank, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/{id}")
	public ResponseEntity<?> updateBank(@PathVariable Integer id, @RequestBody BankEntity bank) {
		try {
			for (BankEntity bankEntity : bankRepository.findAll()) {
				if (bankEntity.getId().equals(id)) {
					BankEntity bankDB = bankRepository.findOne(id);
					bankDB.setName(bank.getName());
					bankDB.setTaxId(bank.getTaxId());
					bankRepository.save(bankDB);
					return new ResponseEntity<BankEntity>(bankDB, HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Bank not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<?> deleteBank(@PathVariable Integer id) {
		BankEntity bankDB = bankRepository.findOne(id);
		if(bankDB != null) {
			bankRepository.delete(id);
			return new ResponseEntity<BankEntity>(bankDB, HttpStatus.OK);
		}
		return new ResponseEntity<RESTError>(new RESTError(1, "Bank not found"), HttpStatus.NOT_FOUND);
	}
}

