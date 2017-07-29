package com.iktpreobuka.paymentsproject.entities;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.iktpreobuka.paymentsproject.converters.LocalDateAttributeConverter;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TransactionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(nullable = false)
	private Double amount;
	
	@Convert(converter = LocalDateAttributeConverter.class)
	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	private LocalDate dateOfExecution = LocalDate.now();
	
	private String paymentPurpose;
	private Integer paymentCode;
	private Integer referenceNumber;
	

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "payTo")
	private AccountEntity payTo;
	

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "payFrom")
	private AccountEntity payFrom;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public LocalDate getDateOfExecution() {
		return dateOfExecution;
	}
	public void setDateOfExecution(LocalDate dateOfExecution) {
		this.dateOfExecution = dateOfExecution;
	}
	public String getPaymentPurpose() {
		return paymentPurpose;
	}
	public void setPaymentPurpose(String paymentPurpose) {
		this.paymentPurpose = paymentPurpose;
	}
	public Integer getPaymentCode() {
		return paymentCode;
	}
	public void setPaymentCode(Integer paymentCode) {
		this.paymentCode = paymentCode;
	}
	public Integer getReferenceNumber() {
		return referenceNumber;
	}
	public void setReferenceNumber(Integer referenceNumber) {
		this.referenceNumber = referenceNumber;
	}
	public TransactionEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public AccountEntity getPayTo() {
		return payTo;
	}
	public void setPayTo(AccountEntity payTo) {
		this.payTo = payTo;
	}
	public AccountEntity getPayFrom() {
		return payFrom;
	}
	public void setPayFrom(AccountEntity payFrom) {
		this.payFrom = payFrom;
	}
	
	
}
