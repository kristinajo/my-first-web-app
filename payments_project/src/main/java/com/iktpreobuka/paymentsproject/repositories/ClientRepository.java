package com.iktpreobuka.paymentsproject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.iktpreobuka.paymentsproject.entities.ClientEntity;

public interface ClientRepository extends CrudRepository<ClientEntity, Integer> {

	public List<ClientEntity> findBySurnameAllIgnoreCaseOrderByNameAsc(String surname);
	
	public List<ClientEntity> findByNameAllIgnoreCaseOrderBySurnameAsc(String name);
	
	public ClientEntity findFirstByPersonalId(String personalId);
	
}
