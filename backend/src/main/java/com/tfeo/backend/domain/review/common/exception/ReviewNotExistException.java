package com.tfeo.backend.domain.review.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class ReviewNotExistException extends BadRequestException {
	private static final String MESSAGE = "존재하지 않는 리뷰입니다. reviewNo: %d";
	public ReviewNotExistException(Long reviewNo) {
		super(String.format(MESSAGE, reviewNo));
	}
}
