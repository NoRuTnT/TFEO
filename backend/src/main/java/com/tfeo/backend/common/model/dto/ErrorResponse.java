package com.tfeo.backend.common.model.dto;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ErrorResponse {
	private final HttpStatus status;
	private final String message;

	public ErrorResponse(HttpStatus status, String message) {
		this.status = status;
		this.message = message;
	}
}
