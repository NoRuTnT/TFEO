package com.tfeo.backend.domain.activity.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.activity.model.dto.ReadActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.ReadActivityResponseDto;

public interface ActivityQueryService {
	public Page<ReadActivityResponseDto> readActivityList(Long memberNo, MemberRoleType role,
		ReadActivityRequestDto request, Pageable pageable);

	public List<ReadActivityResponseDto> readRoadmap(Long memberNo, MemberRoleType role, Long studentNo);

	public ReadActivityResponseDto readActivity(Long memberNo, MemberRoleType role, Long activityNo);

}
