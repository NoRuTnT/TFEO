package com.tfeo.backend.domain.home.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class HomeNotExistException extends BadRequestException {
	private static final String MESSAGE = "번호에 맞는 집을 찾을 수 없습니다. homeNo: %d";

	public HomeNotExistException(Long homeNo) {
		super(String.format(MESSAGE, homeNo));
	}
}
