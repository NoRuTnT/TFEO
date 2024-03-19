package com.tfeo.backend.domain.review.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.domain.member.repository.MemberRepository;
import com.tfeo.backend.domain.review.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ReviewQueryServiceImpl implements ReviewQueryService {
	private final MemberRepository  memberRepository;
	private final ReviewRepository reviewRepository;

}
