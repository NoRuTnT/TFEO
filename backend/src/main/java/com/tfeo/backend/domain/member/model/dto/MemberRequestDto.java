package com.tfeo.backend.domain.member.model.dto;

import java.time.LocalDateTime;

import com.tfeo.backend.common.model.entity.MemberPersonality;
import com.tfeo.backend.common.model.type.CertificateStatusType;
import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.common.model.type.MemberRoleType;

import lombok.Getter;

@Getter
public class MemberRequestDto {
	private String name;
	private String phone;
	private String email;
	private String registerNo;
	private String college;
	private String address;
	private String profileUrl;
	private GenderType gender;
	private MemberRoleType role;
	private String certificate;
	private CertificateStatusType certificateStatus;
	private LocalDateTime certificateRegisterDate;
	private LocalDateTime certificateExpirationDate;
	private MemberPersonality memberPersonality;
}
