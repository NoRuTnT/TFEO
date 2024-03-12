package com.tfeo.backend.domain.activity.model.dto;

import com.tfeo.backend.common.model.type.ActivityApproveType;

import lombok.Data;

@Data
public class ReadActivityRequestDto {
	private String sgg;
	private Integer week;
	private ActivityApproveType approve;
}
