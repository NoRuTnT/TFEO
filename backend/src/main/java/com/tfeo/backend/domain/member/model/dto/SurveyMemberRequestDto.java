package com.tfeo.backend.domain.member.model.dto;

import java.time.LocalTime;

import com.tfeo.backend.common.model.type.GenderType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SurveyMemberRequestDto {
	private String college;
	private Double lat;
	private Double lng;
	private GenderType gender;
	private LocalTime sleepAt;
	private LocalTime wakeAt;
	private LocalTime returnAt;
}
