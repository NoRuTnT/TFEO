package com.tfeo.backend.domain.activity.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddActivityRequestDto {
	private String week;
	private String activityImageUrl;
	private String activityText;
	private Long contractNo;

}
