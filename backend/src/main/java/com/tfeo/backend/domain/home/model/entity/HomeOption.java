package com.tfeo.backend.domain.home.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class HomeOption {
	@Id
	@Column(name="home_option_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long homeOptionNo;
	@Column(name="option_no")
	private Long optionNo;
	@Column(name="home_no")
	private Long homeNo;
}
