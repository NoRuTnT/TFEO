//ActivityCommandServiceImpl
package com.tfeo.backend.domain.activity.service;

import static com.tfeo.backend.common.model.type.ActivityApproveType.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.nurigo.sdk.message.response.SingleMessageSentResponse;

import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.tfeo.backend.common.config.SmsUtils;
import com.tfeo.backend.common.service.FileService;
import com.tfeo.backend.domain.activity.common.ActivityException;
import com.tfeo.backend.domain.activity.common.exception.AccessDeniedException;
import com.tfeo.backend.domain.activity.common.exception.ActivityNotExistException;
import com.tfeo.backend.domain.activity.common.exception.PeriodException;
import com.tfeo.backend.domain.activity.common.exception.TextBlankException;
import com.tfeo.backend.domain.activity.model.dto.AddActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.AddActivityResponseDto;
import com.tfeo.backend.domain.activity.model.dto.ModifyActivityRequestDto;
import com.tfeo.backend.domain.activity.model.entity.Activity;
import com.tfeo.backend.domain.activity.repository.ActivityRepository;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.member.common.exception.MemberNotExistException;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ActivityCommandServiceImpl implements ActivityCommandService {

	// private final DefaultMessageService messageService;
	private final MemberRepository memberRepository;
	private final HomeRepository homeRepository;
	private final ActivityRepository activityRepository;
	private final FileService fileService;
	private final SmsUtils smsUtils;

	// @Autowired
	// public ActivityCommandServiceImpl(MemberRepository memberRepository, HomeRepository homeRepository,
	// 	ActivityRepository activityRepository,
	// 	ContractRepository contractRepository,
	// 	FileService fileService) {
	// 	this.messageService = NurigoApp.INSTANCE.initialize("NCSEFOIOGSP2WVMR", "OKB94BHPG494AHUKXGZCBPLL4YILF0DS",
	// 		"https://api.coolsms.co.kr");
	// 	this.memberRepository = memberRepository;
	// 	this.homeRepository = homeRepository;
	// 	this.activityRepository = activityRepository;
	// 	this.fileService = fileService;
	// }

	@Override
	public String addActivity(Long memberNo, Long activityNo,
		AddActivityRequestDto request) {

		// Member member = memberRepository.findByMemberNo(memberNo)
		//     .orElseThrow(() -> new MemberNotExistException(memberNo));

		Activity activity = activityRepository.findById(activityNo)
			.orElseThrow(() -> new ActivityNotExistException(activityNo));

		// if (!memberNo.equals(activity.getContract().getMember().getMemberNo())) {
		//     throw new AccessDeniedException(memberNo);
		// }

		if (activity.getStartAt().isAfter(LocalDate.now()) || activity.getExpiredAt().isBefore(LocalDate.now())) {
			throw new PeriodException();
		}

		if (request.getActivityText().isBlank()) {
			throw new TextBlankException();
		}

		String filePath = fileService.createPath("activity");
		String activityPresignedUrlToUpload = fileService.createPresignedUrlToUpload(filePath);
		System.out.println("#######################");
		System.out.println(activityPresignedUrlToUpload);
		activity.writeActivity(filePath, request.getActivityText());

		//승인 처리
		activity.setApprove(APPROVE);

		AddActivityResponseDto result = AddActivityResponseDto.builder()
			.activityNo(activity.getActivityNo())
			.week(activity.getWeek())
			.createdAt(activity.getCreatedAt())
			.activityImageUrl(activityPresignedUrlToUpload)
			.activityText(activity.getActivityText())
			.activityApproveType(activity.getApprove())
			.contractNo(activity.getContract().getContractNo())
			.build();

		// 관리자 승인 & 알림톡 전송
		// approveActivity(memberNo,activityNo);

		return activityPresignedUrlToUpload;
	}

	@Override
	public String modifyActivity(Long memberNo, Long activityNo, ModifyActivityRequestDto request) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));

		Activity activity = activityRepository.findById(activityNo)
			.orElseThrow(() -> new ActivityNotExistException(activityNo));

		if (!member.equals(activity.getContract().getMember())) {
			throw new AccessDeniedException(memberNo);
		}

		String filePath = activity.getActivityImageUrl();
		String activityPresignedUrlToUpload = null;

		if (!request.getActivityImageUrl().isEmpty()) {
			filePath = fileService.createPath("activity");
			activityPresignedUrlToUpload = fileService.createPresignedUrlToUpload(filePath);
		}

		activity.updateActivity(filePath, request.getActivityText());

		return activityPresignedUrlToUpload;
	}

	@Override
	public void removeActivity(Long memberNo, Long activityNo) {

		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));

		Activity activity = activityRepository.findById(activityNo)
			.orElseThrow(() -> new ActivityNotExistException(activityNo));

		activity.deleteActivity();
	}

	@Override
	public SingleMessageSentResponse approveActivity(Long memberNo, Long activityNo) {
		try {
			Member member = memberRepository.findByMemberNo(memberNo)
				.orElseThrow(() -> new MemberNotExistException(memberNo));

			Activity activity = activityRepository.findById(activityNo)
				.orElseThrow(() -> new ActivityNotExistException(activityNo));

			//승인 처리
			activity.setApprove(APPROVE);
			S3Object s3Object = fileService.getObject(activity.getActivityImageUrl());
			S3ObjectInputStream objectInputStream = s3Object.getObjectContent();
			File file = new File("temp.jpg");
			byte[] bytes = IOUtils.toByteArray(objectInputStream);
			log.info("ok");
			try {
				log.info("file stream start");
				FileOutputStream fos = new FileOutputStream(file);
				fos.write(bytes);
				fos.close();
				log.info("s3 file convert success");
			} catch (IOException e) {
				e.printStackTrace();
			}

			// String imageId = this.messageService.uploadFile(file, StorageType.MMS, null);

			// 보호자 전화번호
			String receiver = homeRepository.findByMemeber(memberNo).orElseThrow(
				() -> new ActivityException("계약한 집을 찾을 수 없습니다. id=" + memberNo)
			).getGuardianPhone();
			log.info("send message");
			String message = activity.getActivityText();

			// Message message = new Message();
			// // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력
			// message.setFrom(member.getPhone());
			// message.setTo("01045417183");
			// // message.setTo(receiver);
			// message.setText(activity.getActivityText());
			// message.setImageId(imageId);

			// SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));

			// file.delete();

			SingleMessageSentResponse response = smsUtils.sendOne(receiver, message, file);
			file.delete();
			return response;

		} catch (Exception e) {
			throw new ActivityException(e.getMessage());
		}
	}

	@Override
	public Long rejectActivity(Long memberNo, Long activityNo) {

		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Activity activity = activityRepository.findById(activityNo)
			.orElseThrow(() -> new ActivityNotExistException(activityNo));

		//반려 처리
		activity.setApprove(REJECT);

		return activity.getActivityNo();
	}
}