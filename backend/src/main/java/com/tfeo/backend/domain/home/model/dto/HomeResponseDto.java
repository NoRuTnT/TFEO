package com.tfeo.backend.domain.home.model.dto;

import com.tfeo.backend.common.model.type.Address;
import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.domain.home.model.entity.Home;

import lombok.Getter;

@Getter
public class HomeResponseDto {
	private Long homeNo;
	private String hostName;
	private int hostAge;
	private String hostPhone;
	private GenderType hostGender;
	private String guardianName;
	private String guardianPhone;
	private String relation;
	private String hostRegisterNo;
	private String hostAccountNo;
	private String hostBank;
	private Address address;
	private int rent;
	private Double lat;
	private Double lng;
	private Boolean nonregisterMember;
	private String introduce;
	private Integer maintenanceFee;

	public HomeResponseDto(Home home) {
		this.homeNo = home.getHomeNo();
		this.hostName = home.getHostName();
		this.hostAge = home.getHostAge();
		this.hostPhone = home.getHostPhone();
		this.hostGender = home.getHostGender();
		this.guardianName = home.getGuardianName();
		this.guardianPhone = home.getGuardianPhone();
		this.relation = home.getRelation();
		this.hostRegisterNo = home.getHostRegisterNo();
		this.hostAccountNo = home.getHostAccountNo();
		this.hostBank = home.getHostBank();
		this.address = home.getAddress();
		this.rent = home.getRent();
		this.lat = home.getLat();
		this.lng = home.getLng();
		nonregisterMember = home.getNonregisterMember();
		this.introduce = home.getIntroduce();
		this.maintenanceFee = home.getMaintenanceFee();
	}
}
