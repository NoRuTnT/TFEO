package com.tfeo.backend.domain.member.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class ApplicationAlreadyExistException extends BadRequestException {
	private static final String MESSAGE = "이미 신청한 집입니다. homeNo: %d, memberNo: %d";

	public ApplicationAlreadyExistException(Long homeNo, Long memberNo) {
		super(String.format(MESSAGE, homeNo, memberNo));
	}
}
