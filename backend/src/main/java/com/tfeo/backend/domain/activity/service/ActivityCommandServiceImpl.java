package com.tfeo.backend.domain.activity.service;

import static com.tfeo.backend.common.model.type.ActivityApproveType.*;

import java.io.File;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.model.StorageType;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.activity.common.ActivityException;
import com.tfeo.backend.domain.activity.model.dto.AddActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.AddActivityResponseDto;
import com.tfeo.backend.domain.activity.model.dto.ModifyActivityRequestDto;
import com.tfeo.backend.domain.activity.model.entity.Activity;
import com.tfeo.backend.domain.activity.repository.ActivityRepository;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.contract.repository.ContractRepository;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class ActivityCommandServiceImpl implements ActivityCommandService {

	private DefaultMessageService messageService;
	private MemberRepository memberRepository;
	private HomeRepository homeRepository;
	private ActivityRepository activityRepository;
	private ContractRepository contractRepository;

	@Autowired
	public ActivityCommandServiceImpl(MemberRepository memberRepository, HomeRepository homeRepository,
		ActivityRepository activityRepository,
		ContractRepository contractRepository) {
		this.messageService = NurigoApp.INSTANCE.initialize("NCSEFOIOGSP2WVMR", "OKB94BHPG494AHUKXGZCBPLL4YILF0DS",
			"https://api.coolsms.co.kr");
		this.memberRepository = memberRepository;
		this.homeRepository = homeRepository;
		this.activityRepository = activityRepository;
		this.contractRepository = contractRepository;
	}

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

	@Override
	public SingleMessageSentResponse approveActivity(Long memberNo, MemberRoleType role, Long activityNo) {
		try {
			Member member = memberRepository.findByMemberNo(memberNo)
				.orElseThrow(() -> new ActivityException("해당 회원이 존재하지 않습니다. id=" + memberNo));

			Activity activity = activityRepository.findById(activityNo)
				.orElseThrow(() -> new ActivityException("해당 활동인증글이 존재하지 않습니다. id=" + activityNo));

			//승인 처리
			activity.setApprove(APPROVE);

			ClassPathResource resource = new ClassPathResource("static/sample.jpg");
			File file = resource.getFile();
			String imageId = this.messageService.uploadFile(file, StorageType.MMS, null);

			//보호자 전화번호
			String receiver = homeRepository.findByMemeber(memberNo).orElseThrow(
				() -> new ActivityException("계약한 집을 찾을 수 없습니다. id=" + memberNo)
			).getGuardianPhone();

			Message message = new Message();
			// 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
			message.setFrom("01045417183");
			message.setTo(receiver);
			message.setText(activity.getActivityText());
			message.setImageId(imageId);

			// 여러 건 메시지 발송일 경우 send many 예제와 동일하게 구성하여 발송할 수 있습니다.
			SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
			System.out.println(response);

			return response;

		} catch (Exception e) {
			throw new ActivityException(e.getMessage());
		}
	}

	@Override
	public Long rejectActivity(Long memberNo, MemberRoleType role, Long activityNo) {
		try {
			Member member = memberRepository.findByMemberNo(memberNo)
				.orElseThrow(() -> new ActivityException("해당 회원이 존재하지 않습니다. id=" + memberNo));

			Activity activity = activityRepository.findById(activityNo)
				.orElseThrow(() -> new ActivityException("해당 활동인증글이 존재하지 않습니다. id=" + activityNo));

			activity.setApprove(REJECT);

			return activity.getActivityNo();

		} catch (Exception e) {
			throw new ActivityException(e.getMessage());
		}
	}
}
