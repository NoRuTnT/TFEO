package com.tfeo.backend.domain.home.service;

public interface HomeCommandService {
	public void addHome();

	public void addHomeAppliedByNoneMember();

	public void modifyHome();

	public void removeHome();

	public void approveHomeNoneMemberRegistration();

	public void refuseHomeNoneMemberRegistration();

	public void approveHomeApplication();

	public void refuseHomeApplication();
}
