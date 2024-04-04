package com.tfeo.backend.domain.activity.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.common.service.AuthenticationService;
import com.tfeo.backend.domain.activity.model.dto.ReadActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.ReadActivityResponseDto;
import com.tfeo.backend.domain.activity.service.ActivityQueryService;
import com.tfeo.backend.domain.member.model.entity.Member;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/activity")
@RestController
public class ActivityQueryController {

	private final ActivityQueryService activityQueryService;
	private final AuthenticationService authenticationService;

	//활동인증글 목록 검색
	@GetMapping
	public ResponseEntity<?> activityListRead(@ModelAttribute("searchRequest") ReadActivityRequestDto request,
		@PageableDefault(size = 5, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
		HttpServletRequest httprequest
	) {
		Optional<Member> memberOptional = authenticationService.getMember(httprequest);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		Page<ReadActivityResponseDto> result = activityQueryService.readActivityList(memberNo, request, pageable);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 목록 조회 성공", result));
	}

	//학생별 로드맵 조회
	@GetMapping(value = "/{studentNo}")
	public ResponseEntity<?> roadmapRead(@PathVariable("studentNo") Long studentNo, HttpServletRequest httprequest) {
		Optional<Member> memberOptional = authenticationService.getMember(httprequest);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		List<ReadActivityResponseDto> result = activityQueryService.readRoadmap(memberNo, studentNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "로드맵 조회 성공", result));
	}

	//활동인증글 상세 조회
	@GetMapping(value = "/{activityNo}/detail")
	public ResponseEntity<?> activityRead(@PathVariable("activityNo") Long activityNo, HttpServletRequest httprequest) {
		Optional<Member> memberOptional = authenticationService.getMember(httprequest);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		ReadActivityResponseDto result = activityQueryService.readActivity(memberNo, activityNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 상세 조회 성공", result));
	}

}
