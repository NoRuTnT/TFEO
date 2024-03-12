package com.tfeo.backend.domain.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.domain.member.common.exception.MemberNotExistException;
import com.tfeo.backend.domain.member.model.dto.MemberResponseDto;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;

	public MemberResponseDto findMember() {
		Member member = memberRepository.findByMemberNo(1L)
			.orElseThrow(() -> new MemberNotExistException(1L));
		MemberResponseDto memberResponseDto = new MemberResponseDto(member);
		return memberResponseDto;
	}

	@Transactional
	public void deleteMember() {
		Member member = memberRepository.findByMemberNo(1L)
			.orElseThrow(() -> new MemberNotExistException(1L));
		memberRepository.delete(member);
	}
}
