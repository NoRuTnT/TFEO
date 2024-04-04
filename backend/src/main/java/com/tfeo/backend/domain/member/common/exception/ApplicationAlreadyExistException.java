package com.tfeo.backend.domain.member.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class ApplicationAlreadyExistException extends BadRequestException {
	private static final String MESSAGE = "이미 신청한 집이 있는 회원입니다. memberNo: %d";

	public ApplicationAlreadyExistException(Long memberNo) {
		super(String.format(MESSAGE, memberNo));
	}
}
