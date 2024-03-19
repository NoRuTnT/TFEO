package com.tfeo.backend.domain.member.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class VerificationNotExistException extends BadRequestException {
	private static final String MESSAGE = "인증번호가 재발급이 필요합니다.";

	public VerificationNotExistException() {
		super(MESSAGE);
	}
}
