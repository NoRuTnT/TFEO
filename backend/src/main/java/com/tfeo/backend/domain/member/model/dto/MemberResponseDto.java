package com.tfeo.backend.domain.member.model.dto;

import java.time.LocalDateTime;

import com.tfeo.backend.common.model.entity.MemberPersonality;
import com.tfeo.backend.common.model.type.Address;
import com.tfeo.backend.common.model.type.CertificateStatusType;
import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.member.model.entity.Member;

import lombok.Getter;

@Getter
public class MemberResponseDto {
	Long memberNo;
	String id;
	String name;
	String phone;
	String email;
	String registerNo;
	String college;
	Address address;
	String profileUrl;
	GenderType gender;
	MemberRoleType role;
	String certificate;
	CertificateStatusType certificateStatus;
	LocalDateTime certificateRegisterDate;
	LocalDateTime certificateExpirationDate;
	MemberPersonality memberPersonality;

	public MemberResponseDto(Member member) {
		this.memberNo = member.getMemberNo();
		this.id = member.getId();
		this.name = member.getName();
		this.phone = member.getPhone();
		this.email = member.getEmail();
		this.registerNo = member.getRegisterNo();
		this.college = member.getCollege();
		this.address = Address.builder().si(member.getAddress().getSi())
			.sgg(member.getAddress().getSgg())
			.ro(member.getAddress().getRo())
			.emd(member.getAddress().getEmd())
			.detail(member.getAddress().getDetail())
			.build();
		this.profileUrl = member.getProfileUrl();
		this.gender = member.getGender();
		this.role = member.getRole();
		this.certificate = member.getCertificate();
		this.certificateStatus = member.getCertificateStatus();
		this.certificateRegisterDate = member.getCertificateRegisterDate();
		this.certificateExpirationDate = member.getCertificateExpirationDate();
		this.memberPersonality = member.getMemberPersonality();
	}
}
