package com.tfeo.backend.domain.activity.service;

import net.nurigo.sdk.message.response.SingleMessageSentResponse;

import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.domain.activity.model.dto.AddActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.AddActivityResponseDto;
import com.tfeo.backend.domain.activity.model.dto.ModifyActivityRequestDto;

public interface ActivityCommandService {
	AddActivityResponseDto addActivity(Long memberNo, Role role, Long activityNo, AddActivityRequestDto request);

	Long modifyActivity(Long memberNo, Role role, Long activityNo,
		ModifyActivityRequestDto request);

	void removeActivity(Long memberNo, Role role, Long activityNo);

	SingleMessageSentResponse approveActivity(Long memberNo, Role role, Long activityNo);

	Long rejectActivity(Long memberNo, Role role, Long activityNo);

}
