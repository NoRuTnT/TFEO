package com.tfeo.backend.domain.contract.service;

import static com.tfeo.backend.common.model.type.ActivityApproveType.*;
import static com.tfeo.backend.common.model.type.ContractProgressType.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.common.service.FileService;
import com.tfeo.backend.domain.activity.model.entity.Activity;
import com.tfeo.backend.domain.activity.repository.ActivityRepository;
import com.tfeo.backend.domain.contract.common.exception.ContractDayNotExistException;
import com.tfeo.backend.domain.contract.common.exception.ContractNotExistException;
import com.tfeo.backend.domain.contract.model.dto.ContractResponseDto;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.contract.repository.ContractRepository;
import com.tfeo.backend.domain.home.model.dto.HomeDetailsResponseDto;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.member.common.exception.MemberNotExistException;
import com.tfeo.backend.domain.member.model.dto.AppliedHomeResponseDto;
import com.tfeo.backend.domain.member.model.dto.MemberResponseDto;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ContractServiceImpl implements ContractService {

	private final MemberRepository memberRepository;
	private final HomeRepository homeRepository;
	private final ContractRepository contractRepository;
	private final ActivityRepository activityRepository;
	private final FileService fileService;

	//계약 완료 승인 -> 완성된 계약서 저장
	@Override
	public void completionContract(Long contractNo) {
		Contract contract = contractRepository.findById(contractNo)
			.orElseThrow(() -> new ContractNotExistException("contractNo", contractNo));

		// 계약 완료로 변경
		contract.setProgress(DONE);
		// 변경 내용 반영
		contractRepository.save(contract);

		LocalDate startAt = contract.getStartAt();
		LocalDate expiredAt = contract.getExpiredAt();

		if (startAt == null || expiredAt == null) {
			throw new ContractDayNotExistException(contract.getContractNo());
		}

		//활동인증글 생성
		for (int i = 0; !startAt.plusWeeks(i).isAfter(expiredAt); i++) {
			LocalDate tmpDate = startAt.plusWeeks(i);
			Activity activity = Activity.builder()
				.week(getCurrentWeekOfMonth(startAt.plusWeeks(i)))
				.approve(NONE)
				.contract(contract)
				.activityImageUrl("")
				.activityText("")
				.createdAt(LocalDateTime.now())
				.startAt(tmpDate.minusDays(tmpDate.getDayOfWeek().getValue() - 1))
				.expiredAt(tmpDate.plusDays(tmpDate.getDayOfWeek().getValue() - 1))
				.build();
			activityRepository.save(activity);
		}
	}

	// 계약서 폼 생성 (담당자가 집 신청한 학생 승인 시 호출하는 메서드)
	@Override
	public String creationContractForm(Long contractNo) {
		// 계약서 폼을 저장할 계약 찾기
		Contract contract = contractRepository.findById(contractNo)
			.orElseThrow(() -> new ContractNotExistException("contractNo", contractNo));

		// 파일 이름 설정
		String filePath = fileService.createPath("contract");

		// 계약서 url
		contract.setContractUrl(filePath);
		// repository 변경 사항 반영
		contractRepository.save(contract);
		// 계약서를 업로드할 url 반환, 파일 이름 저장
		return fileService.createPresignedUrlToUpload(filePath);
	}

	// 계약 상세 조회
	@Override
	public AppliedHomeResponseDto getContract(Long contractNo) {
		Contract contract = contractRepository.findById(contractNo)
			.orElseThrow(() -> new ContractNotExistException("contractNo", contractNo));
		ContractResponseDto contractResponseDto = new ContractResponseDto(contract);
		HomeDetailsResponseDto homeDetailsResponseDto = new HomeDetailsResponseDto(contract.getHome());
		MemberResponseDto memberResponseDto = new MemberResponseDto(contract.getMember());
		return new AppliedHomeResponseDto(homeDetailsResponseDto, contractResponseDto, memberResponseDto);
	}

	// 계약서 목록 조회 (학생)
	@Override
	public List<ContractResponseDto> getContracts(Long memberNo) {
		List<Contract> contracts = contractRepository.findAllByMemberNo(memberNo)
			.orElseThrow(() -> new ContractNotExistException("memberNo", memberNo));
		return contracts.stream()
			.map(ContractResponseDto::new)
			.collect(Collectors.toList());
	}

	// 계약서 싸인
	@Override
	public String signContract(Long memberNo, Long contractNo) {
		Member member = memberRepository.findById(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Contract contract = contractRepository.findById(contractNo)
			.orElseThrow(() -> new ContractNotExistException("contractNo", contractNo));

		if (member.getRole() == Role.USER)
			contract.setStudentSign(true);
		if (member.getRole() == Role.MANAGER)
			contract.setHostSign(true);

		contract.setProgress(IN_PROGRESS);
		contractRepository.save(contract);

		return fileService.createPresignedUrlToUpload(contract.getContractUrl());
	}

	// 계약서 삭제
	@Override
	public void deleteContract(Long contractNo) {
		Contract contract = contractRepository.findById(contractNo)
			.orElseThrow(() -> new ContractNotExistException("contractNo", contractNo));
		contractRepository.delete(contract);
	}

	@Override
	public String getPreSignedUrl(Long contractNo) {
		Contract contract = contractRepository.findById(contractNo)
			.orElseThrow(() -> new ContractNotExistException("contractNo", contractNo));
		return fileService.createPresignedUrlToDownload(contract.getContractUrl());
	}

	public static String getCurrentWeekOfMonth(LocalDate localDate) {
		// 한 주의 시작은 월요일이고, 첫 주에 4일이 포함되어있어야 첫 주 취급 (목/금/토/일)
		WeekFields weekFields = WeekFields.of(DayOfWeek.MONDAY, 4);

		int weekOfMonth = localDate.get(weekFields.weekOfMonth());

		// 첫 주에 해당하지 않는 주의 경우 전 달 마지막 주차로 계산
		if (weekOfMonth == 0) {
			// 전 달의 마지막 날 기준
			LocalDate lastDayOfLastMonth = localDate.with(TemporalAdjusters.firstDayOfMonth()).minusDays(1);
			return getCurrentWeekOfMonth(lastDayOfLastMonth);
		}

		// 이번 달의 마지막 날 기준
		LocalDate lastDayOfMonth = localDate.with(TemporalAdjusters.lastDayOfMonth());
		// 마지막 주차의 경우 마지막 날이 월~수 사이이면 다음달 1주차로 계산
		if (weekOfMonth == lastDayOfMonth.get(weekFields.weekOfMonth())
			&& lastDayOfMonth.getDayOfWeek().compareTo(DayOfWeek.THURSDAY) < 0) {
			LocalDate firstDayOfNextMonth = lastDayOfMonth.plusDays(1); // 마지막 날 + 1일 => 다음달 1일
			return getCurrentWeekOfMonth(firstDayOfNextMonth);
		}

		return localDate.getYear() + "년 " + localDate.getMonthValue() + "월 " + weekOfMonth + "주차";
	}
}
