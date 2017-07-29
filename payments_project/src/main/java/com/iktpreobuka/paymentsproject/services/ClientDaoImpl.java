package com.iktpreobuka.paymentsproject.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.iktpreobuka.paymentsproject.entities.ClientEntity;

@Service
public class ClientDaoImpl implements ClientDao {

	@PersistenceContext
	EntityManager em;
	
	@Override
	public List<ClientEntity> findClientsByCity(String city) {
		String sql = "select c " +
					"from ClientEntity c " +
					"left join fetch c.address a " +
					"where a.city = :city ";
		Query query = em.createQuery(sql);
		query.setParameter("city", city);
		List<ClientEntity> result = new ArrayList<>();
		result = query.getResultList();
		return result;
	}

}
