package com.tfeo.backend.domain.home.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class HomeNotRegisteredByNoneMember extends BadRequestException {
	private static final String MESSAGE = "비회원에 의해 등록된 집이 아닙니다. homeNo: %d";

	public HomeNotRegisteredByNoneMember(Long homeNo) {
		super(String.format(MESSAGE, homeNo));
	}
}
