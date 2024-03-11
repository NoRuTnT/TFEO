package com.tfeo.backend.advice;

import lombok.Getter;

@Getter
public class ErrorResponse {
	private final Integer status;
	private final String message;

	public ErrorResponse(Integer status, String message) {
		this.status = status;
		this.message = message;
	}
}
