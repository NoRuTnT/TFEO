package com.tfeo.backend.domain.home.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.tfeo.backend.domain.common.model.Address;

import lombok.Getter;

@Entity
@Getter
public class Home {
	@Id
	@Column(name="home_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long homeNo;
	@Column(name="host_name")
	private String hostName;
	@Column(name="host_age")
	private int hostAge;
	@Column(name="host_phone")
	private String hostPhone;
	@Column(name="home_gender")
	private String hostGender;
	@Column(name="guardian_name")
	private String guardianName;
	@Column(name="guardian_phone")
	private String guardianPhone;
	private String relation;
	@Column(name="host_register_no")
	private String hostRegisterNo;
	@Column(name="host_account_no")
	private String hostAccountNo;
	@Column(name="host_bank")
	private String hostBank;
	private Address address;
	private int rent;
	private Double lat;
	private Double lng;
	@Column(name="non_member")
	private Boolean nonMember;
	private String introduce;
}
