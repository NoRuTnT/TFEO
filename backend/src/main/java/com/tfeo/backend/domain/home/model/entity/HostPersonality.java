package com.tfeo.backend.domain.home.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class HostPersonality {
	@Id
	@Column(name="host_personality_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hostPersonalityNo;
	@Column(name="home_no")
	private Long homeNo;
	@Column(name="personality_no")
	private Long personalityNo;

}
