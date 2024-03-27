package com.tfeo.backend.domain.member.model.dto;

import java.time.LocalDate;

import com.tfeo.backend.common.model.entity.MemberPersonality;
import com.tfeo.backend.common.model.type.Address;
import com.tfeo.backend.common.model.type.CertificateStatusType;
import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.domain.member.model.entity.Member;

import lombok.Getter;

@Getter
public class MemberResponseDto {
	private final Long memberNo;
	private final String name;
	private final String phone;
	private final String email;
	private final String registerNo;
	private final String college;
	private final Address address;
	private final String profileUrl;
	private final GenderType gender;
	private final Role role;
	private final String certificate;
	private final CertificateStatusType certificateStatus;
	private final MemberPersonality memberPersonality;
	private final LocalDate certificateRegisterDate;
	private final LocalDate certificateExpirationDate;

	public MemberResponseDto(Member member) {
		this.memberNo = member.getMemberNo();
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
