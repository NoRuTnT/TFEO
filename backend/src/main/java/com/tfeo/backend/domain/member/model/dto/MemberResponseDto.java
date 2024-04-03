package com.tfeo.backend.domain.member.model.dto;

import java.time.LocalDate;

import com.tfeo.backend.common.model.type.Address;
import com.tfeo.backend.common.model.type.CertificateStatusType;
import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.domain.member.model.entity.Member;

import lombok.Getter;

@Getter
public class MemberResponseDto {
	private Long memberNo;
	private String name;
	private String phone;
	private String email;
	private String registerNo;
	private String college;
	private Address address;
	private String profileUrl;
	private GenderType gender;
	private Role role;
	private String certificate;
	private CertificateStatusType certificateStatus;
	private LocalDate certificateRegisterDate;
	private LocalDate certificateExpirationDate;
	private MemberPersonalityDto memberPersonality;

	public MemberResponseDto(Member member) {
		this.memberNo = member.getMemberNo();
		this.name = member.getName();
		this.phone = member.getPhone();
		this.email = member.getEmail();
		this.registerNo = member.getRegisterNo();
		this.college = member.getCollege();
		if (member.getAddress() != null) {
			this.address = Address.builder()
				.si(member.getAddress().getSi())
				.sgg(member.getAddress().getSgg())
				.ro(member.getAddress().getRo())
				.emd(member.getAddress().getEmd())
				.detail(member.getAddress().getDetail())
				.build();
		} else {
			this.address = null;
		}
		this.gender = member.getGender();
		this.role = member.getRole();
		this.certificateStatus = member.getCertificateStatus();
		this.certificateRegisterDate = member.getCertificateRegisterDate();
		this.certificateExpirationDate = member.getCertificateExpirationDate();
		if (member.getMemberPersonality() != null) {
			this.memberPersonality = new MemberPersonalityDto(member.getMemberPersonality());
		} else {
			this.memberPersonality = null;
		}
	}

	public void updateProfilePresignedUrl(String url) {
		this.profileUrl = url;
	}

	public void updateCertificatePresignedUrl(String url) {
		this.certificate = url;
	}
}
