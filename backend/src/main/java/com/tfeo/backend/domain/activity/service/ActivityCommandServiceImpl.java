package com.tfeo.backend.domain.activity.service;

import static com.tfeo.backend.common.model.type.ActivityApproveType.*;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.activity.common.ActivityException;
import com.tfeo.backend.domain.activity.model.dto.AddActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.AddActivityResponseDto;
import com.tfeo.backend.domain.activity.model.dto.ModifyActivityRequestDto;
import com.tfeo.backend.domain.activity.model.entity.Activity;
import com.tfeo.backend.domain.activity.repository.ActivityRepository;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.contract.repository.ContractRepository;
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
	private final ContractRepository contractRepository;

	@Override
	public AddActivityResponseDto addActivity(Long memberNo, MemberRoleType role, AddActivityRequestDto request) {
		try {
			Member member = memberRepository.findByMemberNo(memberNo)
				.orElseThrow(() -> new ActivityException("해당 회원이 존재하지 않습니다. id=" + memberNo));

			Contract contract = contractRepository.findById(request.getContractNo())
				.orElseThrow(() -> new ActivityException("해당 계약이 존재하지 않습니다. id=" + request.getContractNo()));

			Activity activity = Activity.builder()
				.week(request.getWeek())
				.createdAt(LocalDateTime.now())
				.activityImageUrl(request.getActivityImageUrl())
				.activityText(request.getActivityText())
				.approve(WAITING)
				.contract(contract)
				.build();
			activityRepository.save(activity);

			AddActivityResponseDto result = AddActivityResponseDto.builder()
				.activityNo(activity.getActivityNo())
				.week(activity.getWeek())
				.createdAt(activity.getCreatedAt())
				.activityImageUrl(activity.getActivityImageUrl())
				.activityText(activity.getActivityText())
				.activityApproveType(activity.getApprove())
				.contractNo(activity.getContract().getContractNo())
				.build();

			return result;
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
