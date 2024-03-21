package com.tfeo.backend.common.model.dto;

import com.tfeo.backend.common.exception.BadRequestException;

public class FileNotExistException extends BadRequestException {

	private static final String MESSAGE = "파일을 찾을 수 없습니다. filePath: %s";

	public FileNotExistException(String filePath) {
		super(String.format(MESSAGE, filePath));
		this.printStackTrace();
	}
}
