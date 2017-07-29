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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AccountEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(unique = true, length = 18, nullable = false)
	private String accNumber;
	
	private Double currentBalance;
	
	
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "bank")
	private BankEntity bank;
	
	
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "owner")
	private ClientEntity owner;
	
	@JsonIgnore
	@OneToMany(mappedBy = "payTo", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
	private List<TransactionEntity> incomingTransactions = new ArrayList<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "payFrom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
	private List<TransactionEntity> outgoingTransactions = new ArrayList<>();
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getAccNumber() {
		return accNumber;
	}
	public void setAccNumber(String accNumber) {
		this.accNumber = accNumber;
	}
	public Double getCurrentBalance() {
		return currentBalance;
	}
	public void setCurrentBalance(Double currentBalance) {
		this.currentBalance = currentBalance;
	}
	public AccountEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public BankEntity getBank() {
		return bank;
	}
	public void setBank(BankEntity bank) {
		this.bank = bank;
	}
	public ClientEntity getOwner() {
		return owner;
	}
	public void setOwner(ClientEntity owner) {
		this.owner = owner;
	}
	public List<TransactionEntity> getIncomingTransactions() {
		return incomingTransactions;
	}
	public void setIncomingTransactions(List<TransactionEntity> incomingTransactions) {
		this.incomingTransactions = incomingTransactions;
	}
	public List<TransactionEntity> getOutgoingTransactions() {
		return outgoingTransactions;
	}
	public void setOutgoingTransactions(List<TransactionEntity> outgoingTransactions) {
		this.outgoingTransactions = outgoingTransactions;
	}
	
	
}
