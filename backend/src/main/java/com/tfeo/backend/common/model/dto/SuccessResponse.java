package com.tfeo.backend.common.model.dto;

import org.springframework.http.HttpStatus;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SuccessResponse {
	private HttpStatus status;
	private String message;
	private Object result;
}
