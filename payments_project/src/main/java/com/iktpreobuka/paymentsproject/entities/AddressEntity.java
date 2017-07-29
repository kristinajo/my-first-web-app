package com.iktpreobuka.paymentsproject.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
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
public class AddressEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String street;
	private String city;
	private String country;
	
	@JsonIgnore
	@OneToMany(mappedBy = "address", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
	private List<ClientEntity> clients = new ArrayList<>();

	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public AddressEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public List<ClientEntity> getClients() {
		return clients;
	}
	public void setClients(List<ClientEntity> clients) {
		this.clients = clients;
	}
	
	
}
