package com.tfeo.backend.domain.home.service;

import com.tfeo.backend.domain.home.model.dto.HomeApplicationRequestDto;
import com.tfeo.backend.domain.home.model.dto.HomeDto;
import com.tfeo.backend.domain.home.model.dto.HomeRequestDto;

public interface HomeCommandService {
	public void addHome(HomeRequestDto homeRequestDto);

	public void addHomeAppliedByNoneMember(HomeDto homeDto);

	public void modifyHome(Long homeNo, HomeRequestDto homeRequestDto);

	public void removeHome(Long homeNo);

	public void approveHomeNoneMemberRegistration(Long homeNo);

	public void refuseHomeNoneMemberRegistration(Long homeNo);

	public void approveHomeApplication(HomeApplicationRequestDto homeApplicationRequest);

	public void refuseHomeApplication(HomeApplicationRequestDto homeApplicationRequest);
}
