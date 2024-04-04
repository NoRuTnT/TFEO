package com.tfeo.backend.domain.home.service;

import com.tfeo.backend.domain.home.model.dto.CreateFormResponseDto;
import com.tfeo.backend.domain.home.model.dto.HomeApplicationRequestDto;
import com.tfeo.backend.domain.home.model.dto.HomeDto;
import com.tfeo.backend.domain.home.model.dto.HomeRequestDto;
import com.tfeo.backend.domain.home.model.dto.HomeResponseDto;

public interface HomeCommandService {
	HomeResponseDto addHome(HomeRequestDto homeRequestDto);

	void addHomeAppliedByNoneMember(HomeDto homeDto);

	HomeResponseDto modifyHome(Long homeNo, HomeRequestDto homeRequestDto);

	void removeHome(Long homeNo);

	void approveHomeNoneMemberRegistration(Long homeNo);

	void refuseHomeNoneMemberRegistration(Long homeNo);

	CreateFormResponseDto approveHomeApplication(HomeApplicationRequestDto homeApplicationRequest);

	void refuseHomeApplication(HomeApplicationRequestDto homeApplicationRequest);
}
