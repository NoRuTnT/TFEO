package com.tfeo.backend.domain.member.model.dto;

import java.time.LocalDateTime;

import com.tfeo.backend.common.model.entity.MemberPersonality;
import com.tfeo.backend.common.model.type.CertificateStatusType;
import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.common.model.type.MemberRoleType;

public class MemberRequestDto {
	String id;
	String name;
	String phone;
	String email;
	String registerNo;
	String college;
	String address;
	String profileUrl;
	GenderType gender;
	MemberRoleType role;
	String certificate;
	CertificateStatusType certificateStatus;
	LocalDateTime certificateRegisterDate;
	LocalDateTime certificateExpirationDate;
	MemberPersonality memberPersonality;
}
