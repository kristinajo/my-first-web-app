package com.iktpreobuka.paymentsproject.repositories;

import org.springframework.data.repository.CrudRepository;

import com.iktpreobuka.paymentsproject.entities.AddressEntity;

public interface AddressRepository extends CrudRepository<AddressEntity, Integer> {

	AddressEntity findFirstByStreetAndCityAndCountry (String street, String city, String country);
	
}
