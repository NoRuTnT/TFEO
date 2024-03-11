package com.tfeo.backend.domain.activity.model.dto;

import com.tfeo.backend.domain.contract.model.entity.Contract;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddActivityResponseDto {
	private Long activityNo;
	private String week;
	private String activityImageUrl;
	private String activityText;
	private Contract contract;

	public AddActivityResponseDto toEntity() {
		return AddActivityResponseDto.builder()
			.activityNo(activityNo)
			.week(week)
			.activityImageUrl(activityImageUrl)
			.activityText(activityText)
			// .activityApproveType(WAITING)
			.contract(contract)
			.build();
	}

}
