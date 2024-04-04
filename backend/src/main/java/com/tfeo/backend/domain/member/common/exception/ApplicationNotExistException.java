package com.tfeo.backend.domain.member.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class ApplicationNotExistException extends BadRequestException {
	private static final String MESSAGE = "집 신청 내역이 없습니다. homeNo: %d, memberNo: %d";

	public ApplicationNotExistException(Long homeNo, Long memberNo) {
		super(String.format(MESSAGE, homeNo, memberNo));
	}
}
