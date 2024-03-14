package com.tfeo.backend.domain.activity.service;

import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.activity.model.dto.AddActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.AddActivityResponseDto;
import com.tfeo.backend.domain.activity.model.dto.ModifyActivityRequestDto;

public interface ActivityCommandService {
	public AddActivityResponseDto addActivity(Long memberNo, MemberRoleType role, AddActivityRequestDto request);

	public Long modifyActivity(Long memberNo, MemberRoleType role, Long activityNo,
		ModifyActivityRequestDto request);

	public void removeActivity(Long memberNo, MemberRoleType role, Long activityNo);
}