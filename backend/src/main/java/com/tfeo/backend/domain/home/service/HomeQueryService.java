package com.tfeo.backend.domain.home.service;

public interface HomeQueryService {
	public void findHomeList();

	public void findHomeDetails();

	public void findHomeNoneMemberList();

	public void findHomeInProgressList();

	public void findHomeCompletionList();

	public void findHomeAppliedMemberList();
}
