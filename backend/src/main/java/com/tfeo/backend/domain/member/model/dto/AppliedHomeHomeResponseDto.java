package com.tfeo.backend.domain.member.model.dto;

import java.util.List;

import com.tfeo.backend.common.model.type.Address;
import com.tfeo.backend.domain.home.model.entity.Home;

import lombok.Getter;

@Getter
public class AppliedHomeHomeResponseDto {
	private Long homeNo;
	private Address address;
	private Integer rent;
	private String hostName;
	private List<String> hostImageUrlList;
	private List<String> homeImageUrlList;
	private String introduce;

	public AppliedHomeHomeResponseDto(Home home, List<String> hostImageUrlList, List<String> homeImageUrlList) {
		this.homeNo = home.getHomeNo();
		this.address = Address.builder()
			.si(home.getAddress().getSi())
			.sgg(home.getAddress().getSgg())
			.detail(home.getAddress().getDetail())
			.ro(home.getAddress().getRo())
			.emd(home.getAddress().getEmd())
			.build();
		this.rent = home.getRent();
		this.hostName = home.getHostName();
		this.homeImageUrlList = homeImageUrlList;
		this.hostImageUrlList = hostImageUrlList;
		this.introduce = home.getIntroduce();
	}
}
