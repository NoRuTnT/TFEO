package com.tfeo.backend.domain.activity.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class TextBlankException extends BadRequestException {
	private  static final String MESSAGE = "내용을 입력해주세요.";

	public TextBlankException(){super(MESSAGE);}
}
