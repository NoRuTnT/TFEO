package com.tfeo.backend.domain.member.model.dto;

import java.time.LocalDate;

import com.tfeo.backend.common.model.type.Address;
import com.tfeo.backend.common.model.type.CertificateStatusType;
import com.tfeo.backend.common.model.type.GenderType;

import lombok.Getter;

@Getter
public class AppliedMemberListDto {
	private Long memberNo;
	private String name;
	private String phone;
	private String email;
	private String registerNo;
	private String college;
	private Address address;
	private String profileUrl;
	private GenderType gender;
	private String certificate;
	private CertificateStatusType certificateStatus;
	private LocalDate certificateRegisterDate;
	private LocalDate certificateExpirationDate;
}
