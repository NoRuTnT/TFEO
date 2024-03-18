package com.tfeo.backend.domain.home.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HomeQueryServiceImpl implements HomeQueryService {
	@Override
	public void findHomeList() {

	}

	@Override
	public void findHomeDetails() {

	}

	@Override
	public void findHomeNoneMemberList() {

	}

	@Override
	public void findHomeInProgressList() {

	}

	@Override
	public void findHomeCompletionList() {

	}

	@Override
	public void findHomeAppliedMemberList() {

	}
}
