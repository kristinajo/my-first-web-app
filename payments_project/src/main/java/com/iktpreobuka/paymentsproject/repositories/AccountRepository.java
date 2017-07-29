package com.iktpreobuka.paymentsproject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.iktpreobuka.paymentsproject.entities.AccountEntity;

public interface AccountRepository extends CrudRepository<AccountEntity, Integer> {

	public AccountEntity findByAccNumber (String accNumber);
	
	public List<AccountEntity> findByOwnerId (Number ownerId);
}
