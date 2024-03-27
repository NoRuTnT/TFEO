package com.tfeo.backend.domain.member.model.dto;

import com.tfeo.backend.common.model.type.Address;

import lombok.Getter;

@Getter
public class MemberRequestDto {
	private String name;
	private String phone;
	private String email;
	private String registerNo;
	private Address address;
	private Boolean isProfileChanged;
	private Boolean isCertificateChanged;
}
