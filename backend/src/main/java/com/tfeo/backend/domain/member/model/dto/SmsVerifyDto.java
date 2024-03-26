package com.tfeo.backend.domain.member.model.dto;

import lombok.Getter;

@Getter
public class SmsVerifyDto {
	private String phone;
	private String verificationCode;
}
