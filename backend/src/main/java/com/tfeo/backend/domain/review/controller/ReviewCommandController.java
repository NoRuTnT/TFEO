package com.tfeo.backend.domain.review.controller;

import static com.tfeo.backend.common.model.type.Role.*;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

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
import com.tfeo.backend.common.service.AuthenticationService;
import com.tfeo.backend.domain.member.model.entity.Member;
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
	private final AuthenticationService authenticationService;

	//리뷰 작성
	@PostMapping
	public ResponseEntity<?> reviewAdd(@RequestBody AddReviewRequestDto request, HttpServletRequest httprequest) {
		Optional<Member> memberOptional = authenticationService.getMember(httprequest);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		Role role = USER;
		AddReviewResponseDto result = reviewCommandService.addReview(memberNo, role, request);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "리뷰 작성 성공", result));
	}

	//리뷰 수정
	@PutMapping(value = "/{reviewNo}")
	public ResponseEntity<?> reviewModify(@PathVariable("reviewNo") Long reviewNo,
		@RequestBody ModifyReviewRequestDto request, HttpServletRequest httprequest) {
		Optional<Member> memberOptional = authenticationService.getMember(httprequest);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		Role role = USER;
		Long result = reviewCommandService.modifyReview(memberNo, role, reviewNo, request);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "리뷰 수정 성공", result));
	}

	//리뷰 삭제
	@DeleteMapping(value = "/{reviewNo}")
	public ResponseEntity<?> reviewRemove(@PathVariable("reviewNo") Long reviewNo, HttpServletRequest httprequest) {
		Optional<Member> memberOptional = authenticationService.getMember(httprequest);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		Role role = USER;
		reviewCommandService.removeReview(memberNo, role, reviewNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "리뷰 삭제 성공", null));

	}

}
