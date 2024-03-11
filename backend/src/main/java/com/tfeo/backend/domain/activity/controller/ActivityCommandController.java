package com.tfeo.backend.domain.activity.controller;

import static com.tfeo.backend.common.model.type.MemberRoleType.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.activity.service.ActivityCommandService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/activity")
@RestController
public class ActivityCommandController {

	private final ActivityCommandService activityCommandService;

	//활동인증글 작성
	@PostMapping
	public ResponseEntity<?> addActivity() {
		Long memberNo = 1L;
		MemberRoleType role = MEMBER;
		// AddActivityResponseDto result =  activityCommandService.
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 작성 성공", null));
	}

	//활동인증글 수정
	@PutMapping("/activityNo")
	public ResponseEntity<?> modifyActivity() {
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 수정 성공", null));
	}

	//활동인증글 삭제
	@DeleteMapping("/activityNo")
	public ResponseEntity<?> removeActivity() {
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 삭제 성공", null));
	}

}
