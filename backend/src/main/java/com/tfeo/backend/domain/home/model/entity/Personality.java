package com.tfeo.backend.domain.home.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Personality {
	@Id
	@Column(name="personality_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long personalityNo;
	@Column(name="personality_name")
	private String personalityName;

}
