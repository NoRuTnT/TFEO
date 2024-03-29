package com.tfeo.backend.domain.activity.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class ImageNotExistException extends BadRequestException {
	private  static final String MESSAGE = "이미지를 업로드해주세요.";

	public ImageNotExistException(){super(MESSAGE);}
}
