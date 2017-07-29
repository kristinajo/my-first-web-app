package com.iktpreobuka.paymentsproject.repositories;

import org.springframework.data.repository.CrudRepository;

import com.iktpreobuka.paymentsproject.entities.BankEntity;

public interface BankRepository extends CrudRepository<BankEntity, Integer> {

	BankEntity findFirstByNameAndTaxId(String name, Integer taxId);
}
