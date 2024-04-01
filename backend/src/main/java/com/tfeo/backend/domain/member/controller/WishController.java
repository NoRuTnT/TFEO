package com.tfeo.backend.domain.member.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.common.service.AuthenticationService;
import com.tfeo.backend.domain.member.model.dto.FindWishListDto;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.service.WishService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members/wish")
public class WishController {
	private final WishService wishService;
	private final AuthenticationService authenticationService;

	@PostMapping("/{homeNo}")
	public ResponseEntity<?> wishAdd(@PathVariable("homeNo") Long homeNo, HttpServletRequest request) {
		Optional<Member> memberOptional = authenticationService.getMember(request);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		wishService.addWish(memberNo, homeNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("찜하기가 성공했습니다.")
			.build();
		return ResponseEntity.ok(successResponse);
	}

	@GetMapping("")
	public ResponseEntity<?> wishList(HttpServletRequest request) {
		Optional<Member> memberOptional = authenticationService.getMember(request);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		List<FindWishListDto> findWishListDtoList = wishService.findWishList(memberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.result(findWishListDtoList)
			.build();
		return ResponseEntity.ok(successResponse);
	}

	@DeleteMapping("/{homeNo}")
	public ResponseEntity<?> wishRemove(@PathVariable("homeNo") Long homeNo, HttpServletRequest request) {
		Optional<Member> memberOptional = authenticationService.getMember(request);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		wishService.removeWish(memberNo, homeNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("찜하기 취소가 성공했습니다.")
			.build();
		return ResponseEntity.ok(successResponse);
	}
}
