package com.tfeo.backend.domain.home.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class HostPreference {
	@Id
	@Column(name="host_preference_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hostPreferenceNo;
	@Column(name="host_no")
	private Long hostNo;
	@Column(name="tag_no")
	private Long tagNo;

}
