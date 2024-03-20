package com.tfeo.backend.domain.member.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class VerificationWrongException extends BadRequestException {
	private static final String MESSAGE = "인증번호가 틀렸습니다.";

	public VerificationWrongException() {
		super(MESSAGE);
	}
}
