package com.tfeo.backend.domain.activity.service;

import static com.tfeo.backend.common.model.type.ActivityApproveType.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.activity.common.ActivityException;
import com.tfeo.backend.domain.activity.model.dto.AddActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.AddActivityResponseDto;
import com.tfeo.backend.domain.activity.model.dto.ModifyActivityRequestDto;
import com.tfeo.backend.domain.activity.model.entity.Activity;
import com.tfeo.backend.domain.activity.repository.ActivityRepository;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ActivityCommandServiceImpl implements ActivityCommandService {

	private final MemberRepository memberRepository;
	private final ActivityRepository activityRepository;

	@Override
	public AddActivityResponseDto addActivity(Long memberNo, MemberRoleType role, AddActivityRequestDto request) {
		try {
			Member member = memberRepository.findByMemberNo(memberNo)
				.orElseThrow(() -> new ActivityException("해당 회원이 존재하지 않습니다. id=" + memberNo));

			AddActivityResponseDto activity = AddActivityResponseDto.builder()
				.week(request.getWeek())
				.activityImageUrl(request.getActivityImageUrl())
				.activityText(request.getActivityText())
				.activityApproveType(WAITING)
				.contractNo(request.getContractNo())
				.build();
			return activity;
		} catch (Exception e) {
			throw new ActivityException(e.getMessage());
		}
	}

	@Override
	public Long modifyActivity(Long memberNo, MemberRoleType role, Long activityNo, ModifyActivityRequestDto request) {
		try {
			Member member = memberRepository.findByMemberNo(memberNo)
				.orElseThrow(() -> new ActivityException("해당 회원이 존재하지 않습니다. id=" + memberNo));

			Activity activity = activityRepository.findById(activityNo)
				.orElseThrow(() -> new ActivityException("해당 활동인증글이 존재하지 않습니다. id=" + activityNo));

			activity.updateActivity(request.getActivityImageUrl(), request.getActivityText());

			return activity.getActivityNo();
		} catch (Exception e) {
			throw new ActivityException(e.getMessage());
		}
	}

	@Override
	public void removeActivity(Long memberNo, MemberRoleType role, Long activityNo) {
		try {
			Member member = memberRepository.findByMemberNo(memberNo)
				.orElseThrow(() -> new ActivityException("해당 회원이 존재하지 않습니다. id=" + memberNo));

			Activity activity = activityRepository.findById(activityNo)
				.orElseThrow(() -> new ActivityException("해당 활동인증글이 존재하지 않습니다. id=" + activityNo));

			activityRepository.delete(activity);
		} catch (Exception e) {
			throw new ActivityException(e.getMessage());
		}
	}
}
