package com.tfeo.backend.domain.home.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Option {
	@Id
	@Column(name="option_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long optionNo;
	@Column(name="option_name")
	private String optionName;
}
