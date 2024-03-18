package com.tfeo.backend.domain.activity.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class PeriodException extends BadRequestException {
	private static final String MESSAGE = "글을 작성할 수 있는 기간이 아닙니다.";

	public PeriodException() {
		super(MESSAGE);
	}
}