//ActivityQueryServiceImpl
package com.tfeo.backend.domain.activity.service;

import static com.tfeo.backend.common.model.type.ActivityApproveType.*;
import static com.tfeo.backend.common.model.type.ContractProgressType.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.common.service.FileService;
import com.tfeo.backend.domain.activity.common.ActivityException;
import com.tfeo.backend.domain.activity.common.ActivitySpecification;
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
	private final FileService fileService;

	@Override
	public Page<ReadActivityResponseDto> readActivityList(Long memberNo,
		@ModelAttribute("request") ReadActivityRequestDto request, Pageable pageable) {
		Specification<Activity> spce = null;
		if (request.getSgg() != null) {
			spce = ActivitySpecification.bySgg(request.getSgg());
		}
		if (request.getApprove() != null) {
			spce = spce.and(ActivitySpecification.equalApprove(request.getApprove()));
		}
		if (request.getWeek() != null) {
			spce = spce.and(ActivitySpecification.equalWeek(request.getWeek()));
		}
		Page<Activity> activities = activityRepository.findAll(spce, pageable);

		return activities.map(activity -> {
			ReadActivityResponseDto.ReadActivityResponseDtoBuilder builder = ReadActivityResponseDto.builder()
				.activityNo(activity.getActivityNo())
				.week(activity.getWeek())
				.memberName(activity.getContract().getMember().getName())
				.activityApproveType(activity.getApprove())
				.createdAt(activity.getCreatedAt())
				.si(activity.getContract().getHome().getAddress().getSi())
				.sgg(activity.getContract().getHome().getAddress().getSgg())
				.emd(activity.getContract().getHome().getAddress().getEmd())
				.ro(activity.getContract().getHome().getAddress().getRo())
				.detail(activity.getContract().getHome().getAddress().getDetail());

			return builder.build();
		});

	}

	@Override
	public List<ReadActivityResponseDto> readRoadmap(Long memberNo,  Long studentNo) {
		try {
			Member student = memberRepository.findByMemberNo(studentNo)
				.orElseThrow(() -> new ActivityException("해당 회원이 존재하지 않습니다. id=" + studentNo));

			Contract contract = contractRepository.findByMember(DONE, studentNo)
				.orElseThrow(() -> new ActivityException("해당 회원은 현재 진행중인 계약이 없습니다. id=" + studentNo));

			List<Activity> activities = activityRepository.findByContractNo(contract.getContractNo());

			List<ReadActivityResponseDto> result = new ArrayList<>();
			for (Activity activity : activities) {
				ReadActivityResponseDto responseDto = ReadActivityResponseDto.builder()
					.memberNo(memberNo)
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
	public ReadActivityResponseDto readActivity(Long memberNo,  Long activityNo) {
		try {
			System.out.println(activityNo);
			Activity activity = activityRepository.findById(activityNo)
				.orElseThrow(() -> new ActivityException("해당 활동인증글이 존재하지 않습니다. id=" + activityNo));
			String imageUrl="";
			if(activity.getApprove().equals(APPROVE))  imageUrl = fileService.createPresignedUrlToDownload(activity.getActivityImageUrl());
			System.out.println("##############################");
			ReadActivityResponseDto result = ReadActivityResponseDto.builder()
				.memberNo(activity.getContract().getMember().getMemberNo())
				.memberName(activity.getContract().getMember().getName())
				.activityNo(activity.getActivityNo())
				.week(activity.getWeek())
				.createdAt(activity.getCreatedAt())
				.activityImageUrl(imageUrl)
				.activityText(activity.getActivityText())
				.activityApproveType(activity.getApprove())
				.build();
			return result;
		} catch (Exception e) {
			throw new ActivityException(e.getMessage());
		}
	}
}