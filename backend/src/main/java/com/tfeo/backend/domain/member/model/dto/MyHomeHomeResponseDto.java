package com.tfeo.backend.domain.member.model.dto;

import java.util.List;

import com.tfeo.backend.common.model.type.Address;
import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.domain.home.model.entity.Home;

import lombok.Getter;

@Getter
public class MyHomeHomeResponseDto {
	private Long homeNo;
	private Address address;
	private Integer rent;
	private String hostName;
	private Integer hostAge;
	private String hostPhone;
	private GenderType hostGender;
	private String hostAccountNo;
	private String hostBank;
	private List<String> homeImageUrlList;
	private List<String> hostImageUrlList;

	public MyHomeHomeResponseDto(Home home, List<String> homeImageUrl, List<String> hostImageUrl) {
		this.homeNo = home.getHomeNo();
		this.address = Address.builder()
			.si(home.getAddress().getSi())
			.sgg(home.getAddress().getSgg())
			.emd(home.getAddress().getEmd())
			.ro(home.getAddress().getRo())
			.detail(home.getAddress().getDetail())
			.build();
		this.rent = home.getRent();
		this.hostName = home.getHostName();
		this.hostAge = home.getHostAge();
		this.hostPhone = home.getHostPhone();
		this.hostGender = home.getHostGender();
		this.hostAccountNo = home.getHostAccountNo();
		this.hostBank = home.getHostBank();
		this.homeImageUrlList = homeImageUrl;
		this.hostImageUrlList = hostImageUrl;
	}
}
