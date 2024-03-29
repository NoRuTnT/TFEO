package com.tfeo.backend.domain.activity.service;

import static com.tfeo.backend.common.model.type.ActivityApproveType.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.time.LocalDate;

import org.apache.tomcat.util.http.fileupload.FileUtils;
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

import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.common.service.FileService;
import com.tfeo.backend.domain.activity.common.ActivityException;
import com.tfeo.backend.domain.activity.common.exception.AccessDeniedException;
import com.tfeo.backend.domain.activity.common.exception.ActivityNotExistException;
import com.tfeo.backend.domain.activity.common.exception.ImageNotExistException;
import com.tfeo.backend.domain.activity.common.exception.PeriodException;
import com.tfeo.backend.domain.activity.common.exception.TextBlankException;
import com.tfeo.backend.domain.activity.model.dto.AddActivityRequestDto;
import com.tfeo.backend.domain.activity.model.dto.AddActivityResponseDto;
import com.tfeo.backend.domain.activity.model.dto.ModifyActivityRequestDto;
import com.tfeo.backend.domain.activity.model.entity.Activity;
import com.tfeo.backend.domain.activity.repository.ActivityRepository;
import com.tfeo.backend.domain.contract.repository.ContractRepository;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.member.common.exception.MemberNotExistException;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class ActivityCommandServiceImpl implements ActivityCommandService {

	private final DefaultMessageService messageService;
	private final MemberRepository memberRepository;
	private final HomeRepository homeRepository;
	private final ActivityRepository activityRepository;
	private final FileService fileService;

	@Autowired
	public ActivityCommandServiceImpl(MemberRepository memberRepository, HomeRepository homeRepository,
		ActivityRepository activityRepository,
		ContractRepository contractRepository,
		FileService fileService) {
		this.messageService = NurigoApp.INSTANCE.initialize("NCSEFOIOGSP2WVMR", "OKB94BHPG494AHUKXGZCBPLL4YILF0DS",
			"https://api.coolsms.co.kr");
		this.memberRepository = memberRepository;
		this.homeRepository = homeRepository;
		this.activityRepository = activityRepository;
		this.fileService = fileService;
	}

	@Override
	public AddActivityResponseDto addActivity(Long memberNo, Long activityNo,
		AddActivityRequestDto request) {

		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));

		Activity activity = activityRepository.findById(activityNo)
			.orElseThrow(() -> new ActivityNotExistException(activityNo));

		if (!member.equals(activity.getContract().getMember())) {
			throw new AccessDeniedException(memberNo);
		}

		if (activity.getStartAt().isAfter(LocalDate.now()) || activity.getExpiredAt().isBefore(LocalDate.now())) {
			throw new PeriodException();
		}

		if(request.getActivityText().isBlank()){
			throw new TextBlankException();
		}

		if(request.getActivityImageUrl().isEmpty()){
			throw new ImageNotExistException();
		}

		String filePath = fileService.createPath("activity");
		String activityPresignedUrlToUpload = fileService.createPresignedUrlToUpload(filePath);
		activity.writeActivity(filePath, request.getActivityText());

		AddActivityResponseDto result = AddActivityResponseDto.builder()
			.activityNo(activity.getActivityNo())
			.week(activity.getWeek())
			.createdAt(activity.getCreatedAt())
			.activityImageUrl(activityPresignedUrlToUpload)
			.activityText(activity.getActivityText())
			.activityApproveType(activity.getApprove())
			.contractNo(activity.getContract().getContractNo())
			.build();

		return result;
	}

	@Override
	public String modifyActivity(Long memberNo,  Long activityNo, ModifyActivityRequestDto request) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));

		Activity activity = activityRepository.findById(activityNo)
			.orElseThrow(() -> new ActivityNotExistException(activityNo));

		if (!member.equals(activity.getContract().getMember())) {
			throw new AccessDeniedException(memberNo);
		}

		String filePath = activity.getActivityImageUrl();
		String activityPresignedUrlToUpload = null;

		if(!request.getActivityImageUrl().isEmpty()) {
			filePath = fileService.createPath("activity");
			activityPresignedUrlToUpload = fileService.createPresignedUrlToUpload(filePath);
		}

		activity.updateActivity(filePath, request.getActivityText());

		return activityPresignedUrlToUpload;
	}

	@Override
	public void removeActivity(Long memberNo,  Long activityNo) {

		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));

		Activity activity = activityRepository.findById(activityNo)
			.orElseThrow(() -> new ActivityNotExistException(activityNo));

		activity.deleteActivity();
	}

	@Override
	public SingleMessageSentResponse approveActivity(Long memberNo,Long activityNo) {
		try {
			Member member = memberRepository.findByMemberNo(memberNo)
				.orElseThrow(() -> new MemberNotExistException(memberNo));

			Activity activity = activityRepository.findById(activityNo)
				.orElseThrow(() -> new ActivityNotExistException(activityNo));

			//승인 처리
			activity.setApprove(APPROVE);

			String presignedUrl = fileService.createPresignedUrlToDownload(activity.getActivityImageUrl());

			URL url = new URL(presignedUrl);
			InputStream inputStream = url.openStream();

			// 파일로 데이터 복사
			OutputStream outputStream = new FileOutputStream("tempFile"); // 임시 파일로 저장
			ReadableByteChannel byteChannel = Channels.newChannel(inputStream);
			((FileOutputStream)outputStream).getChannel().transferFrom(byteChannel, 0, Long.MAX_VALUE);

			String imageId = this.messageService.uploadFile(new File("tempFile"), StorageType.MMS, null);

			// 스트림 및 파일 닫기
			inputStream.close();
			outputStream.close();

			//보호자 전화번호
			String receiver = homeRepository.findByMemeber(memberNo).orElseThrow(
				() -> new ActivityException("계약한 집을 찾을 수 없습니다. id=" + memberNo)
			).getGuardianPhone();

			Message message = new Message();
			// 발신번호 및 수신번호는 반드시 01012345678 형태로 입력
			message.setFrom("01045417183");
			message.setTo(receiver);
			message.setText(activity.getActivityText());
			message.setImageId(imageId);

			SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));

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
