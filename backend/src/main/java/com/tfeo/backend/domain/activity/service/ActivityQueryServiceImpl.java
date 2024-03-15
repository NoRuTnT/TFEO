package com.tfeo.backend.domain.activity.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.common.model.type.ActivityApproveType;
import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.activity.common.ActivityException;
import com.tfeo.backend.domain.activity.model.dto.ReadActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.ReadActivityResponseDto;
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
public class ActivityQueryServiceImpl implements ActivityQueryService {

	private final MemberRepository memberRepository;
	private final ActivityRepository activityRepository;
	private final ContractRepository contractRepository;

	@Override
	public Page<ReadActivityResponseDto> readActivityList(Long memberNo, MemberRoleType role,
		ReadActivityRequestDto request, Pageable pageable) {
		// ActivityApproveType approveType = request.getApprove();
		return null;
	}

	@Override
	public List<ReadActivityResponseDto> readRoadmap(Long memberNo, MemberRoleType role, Long studentNo) {
		try {
			Member student = memberRepository.findByMemberNo(studentNo)
				.orElseThrow(() -> new ActivityException("해당 회원이 존재하지 않습니다. id=" + studentNo));

			Contract contract = contractRepository.findByMember(studentNo)
				.orElseThrow(() -> new ActivityException("해당 회원은 현재 진행중인 계약이 없습니다. id=" + studentNo));

			List<Activity> activities = activityRepository.findByContractNo(contract.getContractNo());

			List<ReadActivityResponseDto> result = new ArrayList<>();
			for (Activity activity : activities) {
				ReadActivityResponseDto responseDto = ReadActivityResponseDto.builder()
					.activityNo(activity.getActivityNo())
					.week(activity.getWeek())
					.createdAt(activity.getCreatedAt())
					.activityApproveType(activity.getApprove())
					.build();
				result.add(responseDto);
			}

			return result;

		} catch (Exception e) {
			throw new ActivityException(e.getMessage());
		}
	}

	@Override
	public ReadActivityResponseDto readActivity(Long memberNo, MemberRoleType role, Long activityNo) {
		try {
			Activity activity = activityRepository.findById(activityNo)
				.orElseThrow(() -> new ActivityException("해당 활동인증글이 존재하지 않습니다. id=" + activityNo));
			ReadActivityResponseDto result = ReadActivityResponseDto.builder()
				.memberNo(activity.getContract().getMember().getMemberNo())
				.memberName(activity.getContract().getMember().getName())
				.activityNo(activity.getActivityNo())
				.week(activity.getWeek())
				.createdAt(activity.getCreatedAt())
				.activityImageUrl(activity.getActivityImageUrl())
				.activityText(activity.getActivityText())
				.activityApproveType(activity.getApprove())
				.build();
			return result;
		} catch (Exception e) {
			throw new ActivityException(e.getMessage());
		}
	}
}
