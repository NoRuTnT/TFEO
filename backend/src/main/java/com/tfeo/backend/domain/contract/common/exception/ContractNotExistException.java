package com.tfeo.backend.domain.contract.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class ContractNotExistException extends BadRequestException {
	private static final String MESSAGE = "존재하지 않는 계약입니다. %s: %d";
	public ContractNotExistException(String paramName, Long no) {
		super(String.format(MESSAGE, paramName, no));
	}
}
