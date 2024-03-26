package com.tfeo.backend.domain.review.controller;

import static com.tfeo.backend.common.model.type.MemberRoleType.*;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.review.model.dto.ReadReviewResponseDto;
import com.tfeo.backend.domain.review.service.ReviewQueryService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/review")
@RestController
public class ReviewQueryController {

	private  final ReviewQueryService reviewQueryService;

	//리뷰 목록 조회
	@GetMapping(value="/{homeNo}")
	public ResponseEntity<?> reviewListRead(@PathVariable("homeNo") Long homeNo){
		Long memberNo = 1L;
		MemberRoleType role = MEMBER;
		List<ReadReviewResponseDto> result = reviewQueryService.readReviewList(memberNo, role, homeNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "리뷰 목록 조회 성공", result));

	}

	//리뷰 상세 조회
	@GetMapping(value="/detail/{reviewNo}")
	public ResponseEntity<?> reviewRead(@PathVariable("reviewNo") Long reviewNo){
		Long memberNo = 1L;
		MemberRoleType role = MEMBER;
		ReadReviewResponseDto result = reviewQueryService.readReview(memberNo, role, reviewNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "리뷰 상세 조회 성공", result));

	}
}
