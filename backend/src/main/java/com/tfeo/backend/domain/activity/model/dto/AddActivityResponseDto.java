package com.tfeo.backend.domain.activity.model.dto;

import java.time.LocalDateTime;

import com.tfeo.backend.common.model.type.ActivityApproveType;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AddActivityResponseDto {
	private Long activityNo;
	private String week;
	private LocalDateTime createdAt;
	private String activityImageUrl;
	private String activityText;
	private ActivityApproveType activityApproveType;
	private Long contractNo;
}
