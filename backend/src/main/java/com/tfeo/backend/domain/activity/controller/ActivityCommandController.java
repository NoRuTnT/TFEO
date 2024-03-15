package com.tfeo.backend.domain.activity.controller;

import static com.tfeo.backend.common.model.type.MemberRoleType.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.nurigo.sdk.message.response.SingleMessageSentResponse;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.activity.model.dto.AddActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.AddActivityResponseDto;
import com.tfeo.backend.domain.activity.model.dto.ModifyActivityRequestDto;
import com.tfeo.backend.domain.activity.service.ActivityCommandService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/activity")
@RestController
public class ActivityCommandController {

	private final ActivityCommandService activityCommandService;

	//활동인증글 작성
	@PutMapping(value="/{activityNo}")
	public ResponseEntity<?> activityAdd(@PathVariable("activityNo") Long activityNo,
		@RequestBody AddActivityRequestDto request) {
		Long memberNo = 1L;
		MemberRoleType role = MEMBER;
		AddActivityResponseDto result = activityCommandService.addActivity(memberNo, role,activityNo, request);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 작성 성공", result));
	}

	//활동인증글 수정
	@PutMapping("/{activityNo}/edit")
	public ResponseEntity<?> activityModify(@PathVariable("activityNo") Long activityNo,
		@RequestBody ModifyActivityRequestDto request) {
		Long memberNo = 1L;
		MemberRoleType role = MEMBER;
		Long result = activityCommandService.modifyActivity(memberNo, role, activityNo, request);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 수정 성공", result));
	}

	//활동인증글 삭제
	@PutMapping("/{activityNo}/delete")
	public ResponseEntity<?> activityRemove(@PathVariable("activityNo") Long activityNo) {
		Long memberNo = 1L;
		MemberRoleType role = MEMBER;
		activityCommandService.removeActivity(memberNo, role, activityNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 삭제 성공", null));
	}

	//활동인증글 승인
	@PutMapping("/{activityNo}/approve")
	public ResponseEntity<?> activityApprove(@PathVariable("activityNo") Long activityNo) {
		Long memberNo = 1L;
		MemberRoleType role = MEMBER;
		SingleMessageSentResponse result = activityCommandService.approveActivity(memberNo, role, activityNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 승인 성공", result));
	}

	//활동인증글 반려
	@PutMapping("/{activityNo}/reject")
	public ResponseEntity<?> activityReject(@PathVariable("activityNo") Long activityNo) {
		Long memberNo = 1L;
		MemberRoleType role = MEMBER;
		Long result = activityCommandService.rejectActivity(memberNo, role, activityNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 반려 성공", result));
	}

}
