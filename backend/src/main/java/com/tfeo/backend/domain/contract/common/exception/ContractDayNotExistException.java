package com.tfeo.backend.domain.contract.common.exception;

import com.tfeo.backend.common.exception.BadRequestException;

public class ContractDayNotExistException extends BadRequestException {
	private static final String MESSAGE = "계약 기간이 정해지지 않았습니다. contractNo: %d";
	public ContractDayNotExistException(Long contractNo) {
		super(String.format(MESSAGE, contractNo));
	}
}
