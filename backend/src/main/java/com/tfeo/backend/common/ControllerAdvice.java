package com.tfeo.backend.common;

import java.util.stream.Collectors;

import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.tfeo.backend.common.exception.BusinessException;
import com.tfeo.backend.common.model.dto.ErrorResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

	//비즈니스 로직과 관련된 예외처리 << 400번대
	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
		log.error("{} error message >> {} ", e.getClass().getSimpleName(), e.getMessage());
		return ResponseEntity.status(e.status()).body(new ErrorResponse(e.status(), e.getMessage()));
	}

	//validation 관련 예외처리1 << 400
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException e) {
		String errorMessage = e.getConstraintViolations().stream()
			.map(violation -> String.format("Field '%s': %s",
				violation.getPropertyPath(),
				violation.getMessage()))
			.collect(Collectors.joining("; "));
		log.error("ConstraintViolationException error message >> {} ", errorMessage);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(new ErrorResponse(HttpStatus.BAD_REQUEST, errorMessage));
	}

	//validation 관련 예외처리2 << 400
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		String errorMessage = e.getBindingResult().getFieldErrors().stream()
			.map(fieldError -> String.format("Field '%s': %s",
				fieldError.getField(),
				fieldError.getDefaultMessage()))
			.collect(Collectors.joining("; "));
		log.error("MethodArgumentNotValidException error message >> {} ", errorMessage);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
			.body(new ErrorResponse(HttpStatus.BAD_REQUEST, errorMessage));
	}

	// 그 외 예상하지 못한 예외처리 << 500
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<ErrorResponse> unexpectedRException(RuntimeException e) {
		log.error("{} error message >> {} \n", e.getClass().getSimpleName(), e.getMessage(), e);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
	}
}