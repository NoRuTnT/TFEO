package com.tfeo.backend.domain.activity.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class ActivityNotExistException extends BadRequestException {
	private static final String MESSAGE = "존재하지 않는 인증글 입니다. activityNo: %d";

	public ActivityNotExistException(Long activityNo) {
		super(String.format(MESSAGE, activityNo));
	}
}
