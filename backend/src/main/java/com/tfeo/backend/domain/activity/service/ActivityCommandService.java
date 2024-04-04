package com.tfeo.backend.domain.activity.service;

import net.nurigo.sdk.message.response.SingleMessageSentResponse;

import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.domain.activity.model.dto.AddActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.AddActivityResponseDto;
import com.tfeo.backend.domain.activity.model.dto.ModifyActivityRequestDto;

public interface ActivityCommandService {
	String addActivity(Long memberNo,  Long activityNo, AddActivityRequestDto request);

	String modifyActivity(Long memberNo,  Long activityNo,
		ModifyActivityRequestDto request);

	void removeActivity(Long memberNo,  Long activityNo);

	SingleMessageSentResponse approveActivity(Long memberNo, Long activityNo);

	Long rejectActivity(Long memberNo,  Long activityNo);

}
