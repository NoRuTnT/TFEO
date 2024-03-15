package com.tfeo.backend.domain.member.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.domain.member.model.dto.FindWishListDto;
import com.tfeo.backend.domain.member.service.WishService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/members/wish")
public class WishController {
	private final WishService wishService;
	private final Long temporaryMemberNo = 1L; // Todo: security 적용 시 삭제

	@PostMapping("/{homeNo}")
	public ResponseEntity<SuccessResponse> wishAdd(@PathVariable("homeNo") Long homeNo) {
		wishService.addWish(temporaryMemberNo, homeNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("찜하기가 성공했습니다.")
			.build();
		return ResponseEntity.ok(successResponse);
	}

	@GetMapping("")
	public ResponseEntity<SuccessResponse> wishList() {
		List<FindWishListDto> findWishListDtoList = wishService.findWishList(temporaryMemberNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.result(findWishListDtoList)
			.build();
		return ResponseEntity.ok(successResponse);
	}

	@DeleteMapping("/{homeNo}")
	public ResponseEntity<SuccessResponse> wishRemove(@PathVariable("homeNo") Long homeNo) {
		wishService.removeWish(temporaryMemberNo, homeNo);
		SuccessResponse successResponse = SuccessResponse.builder()
			.status(HttpStatus.OK)
			.message("찜하기 취소가 성공했습니다.")
			.build();
		return ResponseEntity.ok(successResponse);
	}
}
