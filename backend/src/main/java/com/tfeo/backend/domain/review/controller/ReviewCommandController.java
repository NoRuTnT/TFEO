package com.tfeo.backend.domain.review.controller;

import static com.tfeo.backend.common.model.type.Role.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.domain.review.model.dto.AddReviewRequestDto;
import com.tfeo.backend.domain.review.model.dto.AddReviewResponseDto;
import com.tfeo.backend.domain.review.model.dto.ModifyReviewRequestDto;
import com.tfeo.backend.domain.review.service.ReviewCommandService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/review")
@RestController
public class ReviewCommandController {

	private final ReviewCommandService reviewCommandService;

	//리뷰 작성
	@PostMapping
	public ResponseEntity<?> reviewAdd(@RequestBody AddReviewRequestDto request) {
		Long memberNo = 1L;
		Role role = USER;
		AddReviewResponseDto result = reviewCommandService.addReview(memberNo, role, request);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "리뷰 작성 성공", result));
	}

	//리뷰 수정
	@PutMapping(value = "/{reviewNo}")
	public ResponseEntity<?> reviewModify(@PathVariable("reviewNo") Long reviewNo,
		@RequestBody ModifyReviewRequestDto request) {
		Long memberNo = 1L;
		Role role = USER;
		Long result = reviewCommandService.modifyReview(memberNo, role, reviewNo, request);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "리뷰 수정 성공", result));
	}

	//리뷰 삭제
	@DeleteMapping(value = "/{reviewNo}")
	public ResponseEntity<?> reviewRemove(@PathVariable("reviewNo") Long reviewNo) {
		Long memberNo = 1L;
		Role role = USER;
		reviewCommandService.removeReview(memberNo, role, reviewNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "리뷰 삭제 성공", null));

	}

}
