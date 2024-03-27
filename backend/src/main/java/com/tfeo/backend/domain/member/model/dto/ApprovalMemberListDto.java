package com.tfeo.backend.domain.member.model.dto;

import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.domain.member.model.entity.Member;

import lombok.Getter;

@Getter
public class ApprovalMemberListDto {
	private Long memberNo;
	private String name;
	private GenderType gender;
	private String phone;
	private String college;

	public ApprovalMemberListDto(Member member) {
		this.memberNo = member.getMemberNo();
		this.name = member.getName();
		this.gender = member.getGender();
		this.phone = member.getPhone();
		this.college = member.getCollege();
	}
}
