package com.tfeo.backend.domain.member.model.dto.auth;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.tfeo.backend.domain.member.model.entity.Member;

import lombok.Getter;

@Getter
public class MemberAccount extends User {
	private Member member;
	private Long memberNo;

	public MemberAccount(Member member) {
		super(member.getEmail(), null, List.of(new SimpleGrantedAuthority("ROLE_USER")));
		this.member = member;
		this.memberNo = member.getMemberNo();
	}
}