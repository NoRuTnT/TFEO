package com.tfeo.backend.domain.member.model.dto;

import java.time.LocalDate;

import lombok.Getter;

@Getter
public class MemberHomeApplicationRequestDto {
	private LocalDate startAt;
	private LocalDate expiredAt;
}
