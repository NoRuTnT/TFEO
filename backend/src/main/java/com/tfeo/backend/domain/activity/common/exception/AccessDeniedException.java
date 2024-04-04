package com.tfeo.backend.domain.activity.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class AccessDeniedException extends BadRequestException {
	private static final String MESSAGE = "권한이 없습니다. memberNo: %d";

	public AccessDeniedException(Long memberNo) {
		super(String.format(MESSAGE, memberNo));
	}
}
