package com.tfeo.backend.domain.home.service;

import com.tfeo.backend.domain.home.model.dto.HomeApplicationRequestDto;
import com.tfeo.backend.domain.home.model.dto.HomeDto;
import com.tfeo.backend.domain.home.model.dto.HomeRequestDto;
import com.tfeo.backend.domain.home.model.dto.HomeResponseDto;

public interface HomeCommandService {
	public HomeResponseDto addHome(HomeRequestDto homeRequestDto);

	public void addHomeAppliedByNoneMember(HomeDto homeDto);

	public HomeResponseDto modifyHome(Long homeNo, HomeRequestDto homeRequestDto);

	public void removeHome(Long homeNo);

	public void approveHomeNoneMemberRegistration(Long homeNo);

	public void refuseHomeNoneMemberRegistration(Long homeNo);

	public void approveHomeApplication(HomeApplicationRequestDto homeApplicationRequest);

	public void refuseHomeApplication(HomeApplicationRequestDto homeApplicationRequest);
}
