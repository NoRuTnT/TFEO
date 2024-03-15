package com.tfeo.backend.domain.member.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class WishNotExistException extends BadRequestException {
	private static final String MESSAGE = "회원의 찜하기 목록에 없는 집입니다. homeNo: %d, memberNo: %d";
	public WishNotExistException(Long homeNo, Long memberNo) {
		super(String.format(MESSAGE, homeNo, memberNo));
	}
}
