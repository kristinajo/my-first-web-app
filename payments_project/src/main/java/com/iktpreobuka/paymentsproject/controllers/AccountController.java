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
import com.iktpreobuka.paymentsproject.entities.BankEntity;
import com.iktpreobuka.paymentsproject.entities.ClientEntity;
import com.iktpreobuka.paymentsproject.entities.TransactionEntity;
import com.iktpreobuka.paymentsproject.repositories.AccountRepository;
import com.iktpreobuka.paymentsproject.repositories.BankRepository;
import com.iktpreobuka.paymentsproject.repositories.ClientRepository;
import com.iktpreobuka.paymentsproject.repositories.TransactionRepository;
import com.iktpreobuka.paymentsproject.services.AccountDao;


@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountController {

	@Autowired
	private AccountRepository accountRepository;
	
	@Autowired
	private BankRepository bankRepository;
	
	@Autowired
	private ClientRepository clientRepository;
	
	@Autowired
	private TransactionRepository transactionRepository;
	
	@Autowired
	private AccountDao accountDao;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> getAccounts() {
		return new ResponseEntity<List<AccountEntity>>((List<AccountEntity>) accountRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/{id}")
	public ResponseEntity<?> getAccountById(@PathVariable Integer id) {
		try {
			for (AccountEntity accountDB : accountRepository.findAll()) {
				if(accountDB.getId().equals(id)) {
					return new ResponseEntity<AccountEntity>(accountRepository.findOne(id), HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Account not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> saveAccount(@RequestBody AccountEntity account) {
		accountRepository.save(account);
		return new ResponseEntity<AccountEntity>(account, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/{id}")
	public ResponseEntity<?> updateAccount(@PathVariable Integer id, @RequestBody AccountEntity account) {
		try {
			for (AccountEntity accountEntity : accountRepository.findAll()) {
				if (accountEntity.getId().equals(id)) {
					AccountEntity accountDB = accountRepository.findOne(id);
					accountDB.setAccNumber(account.getAccNumber());
					accountRepository.save(accountDB);
					return new ResponseEntity<AccountEntity>(accountDB, HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Account not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<?> deleteAccount(@PathVariable Integer id) {
		AccountEntity accountDB = accountRepository.findOne(id);
		if(accountDB != null) {
			accountRepository.delete(id);
			return new ResponseEntity<AccountEntity>(accountDB, HttpStatus.OK);
		}
		return new ResponseEntity<RESTError>(new RESTError(1, "Account not found"), HttpStatus.NOT_FOUND);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/new-balance")
	public ResponseEntity<?> updateAccountBalance(@RequestParam Integer transactionId) {
			TransactionEntity transactionDB = transactionRepository.findOne(transactionId);
			for (AccountEntity accountEntity : accountRepository.findAll()) {
					if (transactionDB.getPayFrom().equals(accountEntity)) {
						accountEntity.setCurrentBalance(accountEntity.getCurrentBalance()-transactionDB.getAmount());
						accountRepository.save(accountEntity);
					}
					if (transactionDB.getPayTo().equals(accountEntity)) {
						accountEntity.setCurrentBalance(accountEntity.getCurrentBalance()+transactionDB.getAmount());
						accountRepository.save(accountEntity);
					}
				}
			return new ResponseEntity<AccountEntity>(HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/{id}/owner")
	public ResponseEntity<?> addOwnerToAccount(@PathVariable Integer id, @RequestBody ClientEntity owner) {
		try {
			for (AccountEntity accountEntity : accountRepository.findAll()) {
				if (accountEntity.getId().equals(id)) {
					AccountEntity accountDB = accountRepository.findOne(id);
					ClientEntity clientDB = clientRepository.findFirstByPersonalId(owner.getPersonalId());
					if (clientDB != null) {
						accountDB.setOwner(clientDB);
						accountRepository.save(accountDB);
					}
					else {
						clientRepository.save(owner);
						accountDB.setOwner(owner);
						accountRepository.save(accountDB);
					}
					return new ResponseEntity<AccountEntity>(accountDB, HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Account not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/{id}/bank")
	public ResponseEntity<?> addBankToAccount(@PathVariable Integer id, @RequestBody BankEntity bank) {
		try {
			for (AccountEntity accountEntity : accountRepository.findAll()) {
				if (accountEntity.getId().equals(id)) {
					AccountEntity accountDB = accountRepository.findOne(id);
					BankEntity bankDB = bankRepository.findFirstByNameAndTaxId(bank.getName(), bank.getTaxId());
					if (bankDB != null) {
						accountDB.setBank(bankDB);
						accountRepository.save(accountDB);
					}
					else {
						bankRepository.save(bank);
						accountDB.setBank(bank);
						accountRepository.save(accountDB);
					}
					return new ResponseEntity<AccountEntity>(accountDB, HttpStatus.OK);
				}
			}
			return new ResponseEntity<RESTError>(new RESTError(1, "Account not found"), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<RESTError>(new RESTError(2, "Exception occured: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method =RequestMethod.GET, value = "/by-bank")
	public ResponseEntity<?> findAccountsByBankName(@RequestParam String bankName) {
		return new ResponseEntity<List<AccountEntity>>((List<AccountEntity>) accountDao.findByBankName(bankName), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/by-owner")
	public ResponseEntity<?> getByOwner(@RequestParam Integer ownerId) {
		return new ResponseEntity<List<AccountEntity>>((List<AccountEntity>) accountRepository.findByOwnerId(ownerId), HttpStatus.OK);
	}
}
