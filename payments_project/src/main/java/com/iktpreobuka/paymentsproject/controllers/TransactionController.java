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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iktpreobuka.paymentsproject.controllers.util.RESTError;
import com.iktpreobuka.paymentsproject.entities.AccountEntity;
import com.iktpreobuka.paymentsproject.entities.TransactionEntity;
import com.iktpreobuka.paymentsproject.repositories.AccountRepository;
import com.iktpreobuka.paymentsproject.repositories.TransactionRepository;

@RestController
@RequestMapping("/transactions")
@CrossOrigin
public class TransactionController {

	@Autowired
	private TransactionRepository transactionRepository;
	
	@Autowired
	private AccountRepository accountRepository;
	
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> getTransactions() {
		return new ResponseEntity<List<TransactionEntity>>((List<TransactionEntity>) transactionRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/{id}")
	public ResponseEntity<?> getTransactionById(@PathVariable Integer id) {
		try {
			for (TransactionEntity transactionDB : transactionRepository.findAll()) {
				if(transactionDB.getId().equals(id)) {
					return new ResponseEntity<TransactionEntity>(transactionRepository.findOne(id), HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Transaction not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> saveTransaction(@RequestBody TransactionEntity transaction, @RequestParam String payTo, @RequestParam String payFrom) {
		AccountEntity accountTo = accountRepository.findByAccNumber(payTo);
		AccountEntity accountFrom = accountRepository.findByAccNumber(payFrom);
		if(accountFrom.getCurrentBalance() < transaction.getAmount()) {
			return new ResponseEntity<RESTError>(new RESTError(1, "Not enough funds for this transaction"), HttpStatus.NOT_ACCEPTABLE);
		}
		transactionRepository.save(transaction);
		transaction.setPayTo(accountTo);
		transaction.setPayFrom(accountFrom);
		transactionRepository.save(transaction);
		return new ResponseEntity<TransactionEntity>(transaction, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value="/by-account")
	public ResponseEntity<?> getByAccNumber(@RequestParam String accNumber) {
		AccountEntity accountDB = accountRepository.findByAccNumber(accNumber);
		return new ResponseEntity<List<TransactionEntity>>((List<TransactionEntity>) transactionRepository.findByPayToOrPayFrom(accountDB, accountDB), HttpStatus.OK);
	}
}
