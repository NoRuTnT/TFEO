package com.tfeo.backend.domain.activity.controller;

import static com.tfeo.backend.common.model.type.Role.*;

import java.util.List;

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
import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.domain.activity.model.dto.ReadActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.ReadActivityResponseDto;
import com.tfeo.backend.domain.activity.service.ActivityQueryService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/activity")
@RestController
public class ActivityQueryController {

	private final ActivityQueryService activityQueryService;

	//활동인증글 목록 검색
	@GetMapping
	public ResponseEntity<?> activityListRead(
		@ModelAttribute("searchRequest") ReadActivityRequestDto request,
		@PageableDefault(size = 5, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
	) {
		Long memberNo = 1L;
		Role role = USER;
		Page<ReadActivityResponseDto> result = activityQueryService.readActivityList(memberNo, role, request, pageable);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 목록 조회 성공", result));
	}

	//학생별 로드맵 조회
	@GetMapping(value = "/{studentNo}")
	public ResponseEntity<?> roadmapRead(@PathVariable("studentNo") Long studentNo) {
		Long memberNo = 1L;
		Role role = USER;
		List<ReadActivityResponseDto> result = activityQueryService.readRoadmap(memberNo, role, studentNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "로드맵 조회 성공", result));
	}

	//활동인증글 상세 조회
	@GetMapping(value = "/{activityNo}/detail")
	public ResponseEntity<?> activityRead(@PathVariable("activityNo") Long activityNo) {
		Long memberNo = 1L;
		Role role = USER;

		ReadActivityResponseDto result = activityQueryService.readActivity(memberNo, role, activityNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 상세 조회 성공", result));
	}

}
