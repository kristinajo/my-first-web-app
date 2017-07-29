package com.iktpreobuka.paymentsproject.services;

import java.util.List;

import com.iktpreobuka.paymentsproject.entities.AccountEntity;

public interface AccountDao {

	public List<AccountEntity> findByBankName(String bankName);
}
