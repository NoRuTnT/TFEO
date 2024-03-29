package com.tfeo.backend.domain.activity.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.domain.activity.model.dto.ReadActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.ReadActivityResponseDto;

public interface ActivityQueryService {
	Page<ReadActivityResponseDto> readActivityList(Long memberNo,
		ReadActivityRequestDto request, Pageable pageable);

	List<ReadActivityResponseDto> readRoadmap(Long memberNo, Long studentNo);

	ReadActivityResponseDto readActivity(Long memberNo, Long activityNo);

}
