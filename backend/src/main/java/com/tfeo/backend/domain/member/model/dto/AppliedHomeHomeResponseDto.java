package com.tfeo.backend.domain.member.model.dto;

import java.util.List;

import com.tfeo.backend.common.model.type.Address;
import com.tfeo.backend.domain.home.model.entity.Home;

import lombok.Getter;

@Getter
public class AppliedHomeHomeResponseDto {
	private final Long homeNo;
	private final Address address;
	private final Integer rent;
	private final String hostName;
	private final List<String> hostImageUrlList;
	private final List<String> homeImageUrlList;
	private final String introduce;

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
