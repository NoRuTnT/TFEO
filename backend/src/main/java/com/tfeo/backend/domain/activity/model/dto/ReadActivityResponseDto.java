package com.tfeo.backend.domain.activity.model.dto;

import java.time.LocalDateTime;

import com.tfeo.backend.common.model.type.ActivityApproveType;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReadActivityResponseDto {
	private Long memberNo;
	private String memberName;
	private Long activityNo;
	private String week;
	private LocalDateTime createdAt;
	private String activityImageUrl;
	private String activityText;
	private ActivityApproveType activityApproveType;
	private Long contractNo;
	// 주소
	private String si;
	private String sgg;
	private String emd;
	private String ro;
	private String detail;
}
