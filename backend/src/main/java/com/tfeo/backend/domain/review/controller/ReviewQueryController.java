package com.tfeo.backend.domain.review.controller;

import static com.tfeo.backend.common.model.type.Role.*;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.common.service.AuthenticationService;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.review.model.dto.ReadReviewResponseDto;
import com.tfeo.backend.domain.review.service.ReviewQueryService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/review")
@RestController
public class ReviewQueryController {

	private final ReviewQueryService reviewQueryService;
	private final AuthenticationService authenticationService;

	//리뷰 목록 조회
	@GetMapping(value = "/{homeNo}")
	public ResponseEntity<?> reviewListRead(@PathVariable("homeNo") Long homeNo, HttpServletRequest httprequest) {
		Role role = USER;
		List<ReadReviewResponseDto> result = reviewQueryService.readReviewList(homeNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "리뷰 목록 조회 성공", result));

	}

	//리뷰 상세 조회
	@GetMapping(value = "/detail/{reviewNo}")
	public ResponseEntity<?> reviewRead(@PathVariable("reviewNo") Long reviewNo, HttpServletRequest httprequest) {
		ReadReviewResponseDto result = reviewQueryService.readReview(reviewNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "리뷰 상세 조회 성공", result));

	}
}
