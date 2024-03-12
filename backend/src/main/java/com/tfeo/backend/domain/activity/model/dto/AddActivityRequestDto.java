package com.tfeo.backend.domain.activity.model.dto;

import lombok.Data;

@Data
public class AddActivityRequestDto {
	private Integer week;
	private String activityImageUrl;
	private String activityText;
	private Long contractNo;

}
