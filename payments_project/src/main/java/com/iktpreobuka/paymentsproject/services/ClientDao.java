package com.iktpreobuka.paymentsproject.services;

import java.util.List;

import com.iktpreobuka.paymentsproject.entities.ClientEntity;

public interface ClientDao {

	public List<ClientEntity> findClientsByCity(String city);
}
