package com.tfeo.backend.domain.home.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class HostImage {
	@Id
	@Column(name="host_image_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hostImageNo;
	@Column(name="home_no")
	private Long homeNo;
	@Column(name="host_image_url")
	private String hostImageUrl;
}
