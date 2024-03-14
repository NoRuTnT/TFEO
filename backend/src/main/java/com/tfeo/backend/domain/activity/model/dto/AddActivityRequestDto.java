package com.tfeo.backend.domain.activity.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddActivityRequestDto {
	private String activityImageUrl;
	private String activityText;
}
