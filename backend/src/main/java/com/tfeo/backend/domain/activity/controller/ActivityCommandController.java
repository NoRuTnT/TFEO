package com.tfeo.backend.domain.activity.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.nurigo.sdk.message.response.SingleMessageSentResponse;

import com.tfeo.backend.common.model.dto.SuccessResponse;
import com.tfeo.backend.common.service.AuthenticationService;
import com.tfeo.backend.domain.activity.model.dto.AddActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.ModifyActivityRequestDto;
import com.tfeo.backend.domain.activity.service.ActivityCommandService;
import com.tfeo.backend.domain.member.model.entity.Member;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/activity")
@RestController
public class ActivityCommandController {

	private final ActivityCommandService activityCommandService;
	private final AuthenticationService authenticationService;

	//활동인증글 작성
	@PutMapping(value = "/{activityNo}")
	public ResponseEntity<?> activityAdd(@PathVariable("activityNo") Long activityNo,
		@RequestBody AddActivityRequestDto request, HttpServletRequest httprequest) {
		Optional<Member> memberOptional = authenticationService.getMember(httprequest);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		// Role role = USER;
		String result = activityCommandService.addActivity(memberNo, activityNo, request);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 작성 성공", result));
	}

	//활동인증글 수정
	@PutMapping("/{activityNo}/edit")
	public ResponseEntity<?> activityModify(@PathVariable("activityNo") Long activityNo,
		@RequestBody ModifyActivityRequestDto request, HttpServletRequest httprequest) {
		Optional<Member> memberOptional = authenticationService.getMember(httprequest);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		String result = activityCommandService.modifyActivity(memberNo, activityNo, request);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 수정 성공", result));
	}

	//활동인증글 삭제
	@PutMapping("/{activityNo}/delete")
	public ResponseEntity<?> activityRemove(@PathVariable("activityNo") Long activityNo,
		HttpServletRequest httprequest) {
		Optional<Member> memberOptional = authenticationService.getMember(httprequest);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		activityCommandService.removeActivity(memberNo, activityNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 삭제 성공", null));
	}

	//활동인증글 승인
	@PutMapping("/{activityNo}/approve")
	public ResponseEntity<?> activityApprove(@PathVariable("activityNo") Long activityNo,
		HttpServletRequest httprequest) {
		Optional<Member> memberOptional = authenticationService.getMember(httprequest);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		SingleMessageSentResponse result = activityCommandService.approveActivity(memberNo, activityNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 승인 성공", result));
	}

	//활동인증글 반려
	@PutMapping("/{activityNo}/reject")
	public ResponseEntity<?> activityReject(@PathVariable("activityNo") Long activityNo,
		HttpServletRequest httprequest) {
		Optional<Member> memberOptional = authenticationService.getMember(httprequest);
		if (!memberOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("가입된 사용자 데이터를 찾을 수 없습니다.");
		}
		Member member = memberOptional.get();
		Long memberNo = member.getMemberNo();
		Long result = activityCommandService.rejectActivity(memberNo, activityNo);
		return ResponseEntity.ok(new SuccessResponse(HttpStatus.OK, "활동인증글 반려 성공", result));
	}

}
