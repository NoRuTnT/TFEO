package com.tfeo.backend.domain.home.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class HomeOptionNotExistException extends BadRequestException {
	private static final String MESSAGE = "집 옵션이 존재하지 않습니다. homeOptionNo: %d";

	public HomeOptionNotExistException(Long homeOptionNo) {
		super(String.format(MESSAGE, homeOptionNo));
	}
}
