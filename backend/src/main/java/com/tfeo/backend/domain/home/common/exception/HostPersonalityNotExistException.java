package com.tfeo.backend.domain.home.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class HostPersonalityNotExistException extends BadRequestException {
	private static final String MESSAGE = "집주인 성향이 존재하지 않습니다. hostPersonalityNo: %d";

	public HostPersonalityNotExistException(Long hostPersonalityNo) {
		super(String.format(MESSAGE, hostPersonalityNo));
	}
}
