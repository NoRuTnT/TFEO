package com.tfeo.backend.domain.activity.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.activity.common.ActivityException;
import com.tfeo.backend.domain.activity.model.dto.AddActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.AddActivityResponseDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class ActivityCommandServiceImpl implements ActivityCommandService {

	@Override
	public AddActivityResponseDto addActivity(Long memberNo, MemberRoleType role, AddActivityRequestDto request) {
		try {
			// Activity activity = AddActivityResponseDto.
			return null;
		} catch (Exception e) {
			throw new ActivityException(e.getMessage());
		}
	}
}
