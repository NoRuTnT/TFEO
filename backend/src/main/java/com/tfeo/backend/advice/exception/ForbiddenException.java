package com.tfeo.backend.advice.exception;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends BusinessException {

	public ForbiddenException(final String message) {
		super(message);
	}

	@Override
	public HttpStatus status() {
		return HttpStatus.FORBIDDEN;
	}
}