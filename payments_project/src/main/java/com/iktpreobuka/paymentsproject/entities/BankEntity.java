package com.iktpreobuka.paymentsproject.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BankEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(unique = true)
	private String name;
	
	@Column(unique = true)
	private Integer taxId;
	
	@JsonIgnore
	@OneToMany(mappedBy = "bank", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
	private List<AccountEntity> accounts = new ArrayList<>();


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BankEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public List<AccountEntity> getAccounts() {
		return accounts;
	}

	public void setAccounts(List<AccountEntity> accounts) {
		this.accounts = accounts;
	}

	public Integer getTaxId() {
		return taxId;
	}

	public void setTaxId(Integer taxId) {
		this.taxId = taxId;
	}
	
	
}
