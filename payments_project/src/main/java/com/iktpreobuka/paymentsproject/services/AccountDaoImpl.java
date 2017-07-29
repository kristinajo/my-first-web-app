package com.iktpreobuka.paymentsproject.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.iktpreobuka.paymentsproject.entities.AccountEntity;
import com.iktpreobuka.paymentsproject.entities.ClientEntity;

@Service
public class AccountDaoImpl implements AccountDao {

	@PersistenceContext
	EntityManager em;
	
	@Override
	public List<AccountEntity> findByBankName(String bankName) {
		String sql = "select a " +
				"from AccountEntity a " +
				"left join fetch a.bank b " +
				"where b.name = :bankName ";
	Query query = em.createQuery(sql);
	query.setParameter("bankName", bankName);
	List<AccountEntity> result = new ArrayList<>();
	result = query.getResultList();
	return result;
	}

	
}
