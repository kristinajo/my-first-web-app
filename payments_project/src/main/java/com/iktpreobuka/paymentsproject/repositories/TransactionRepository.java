package com.iktpreobuka.paymentsproject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.iktpreobuka.paymentsproject.entities.AccountEntity;
import com.iktpreobuka.paymentsproject.entities.TransactionEntity;

public interface TransactionRepository extends CrudRepository<TransactionEntity, Integer> {

	public List<TransactionEntity> findByPayToOrPayFrom (AccountEntity payTo, AccountEntity payFrom);
}
