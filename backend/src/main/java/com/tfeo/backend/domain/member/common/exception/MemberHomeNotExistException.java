package com.tfeo.backend.domain.member.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class MemberHomeNotExistException extends BadRequestException {
	private static final String MESSAGE = "현재 거주중인 집이 없습니다. memberNo: %d";

	public MemberHomeNotExistException(Long memberNo) {
		super(String.format(MESSAGE, memberNo));
	}
}
