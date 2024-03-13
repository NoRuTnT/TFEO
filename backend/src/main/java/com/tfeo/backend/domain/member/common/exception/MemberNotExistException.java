package com.tfeo.backend.domain.member.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class MemberNotExistException extends BadRequestException {
	private static final String MESSAGE = "존재하지 않는 회원입니다. memberNo: %d";

	public MemberNotExistException(Long memberNo) {
		super(String.format(MESSAGE, memberNo));
	}
}
