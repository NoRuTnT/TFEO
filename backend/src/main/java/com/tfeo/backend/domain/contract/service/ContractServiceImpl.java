package com.tfeo.backend.domain.contract.service;

import static com.tfeo.backend.common.model.type.ActivityApproveType.*;
import static com.tfeo.backend.common.model.type.ContractProgressType.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfeo.backend.domain.activity.common.ActivityException;
import com.tfeo.backend.domain.activity.model.entity.Activity;
import com.tfeo.backend.domain.activity.repository.ActivityRepository;
import com.tfeo.backend.domain.contract.common.exception.ContractDayNotExistException;
import com.tfeo.backend.domain.contract.common.exception.ContractNotExistException;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.contract.repository.ContractRepository;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.member.common.MemberException;
import com.tfeo.backend.domain.member.common.exception.MemberNotExistException;
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


	//계약서 승인
	@Override
	public void creationContract(Long memberNo, Long contractNo) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));

		Contract contract =contractRepository.findById(contractNo)
			.orElseThrow(()->new ContractNotExistException(contractNo));

		// 계약완료로 변경
		contract.setProgress(DONE);

		LocalDate startAt = contract.getStartAt();
		LocalDate expiredAt = contract.getExpiredAt();

		if(startAt==null || expiredAt==null){
			throw new ContractDayNotExistException(contractNo);
		}

		//활동인증글 생성
		for(int i = 0; !startAt.plusWeeks(i).isAfter(expiredAt);i++){
			LocalDate tmpDate = startAt.plusWeeks(i);
			Activity activity = Activity.builder()
				.week(getCurrentWeekOfMonth(startAt.plusWeeks(i)))
				.approve(NONE)
				.contract(contract)
				.startAt(tmpDate.minusDays(tmpDate.getDayOfWeek().getValue()-1))
				.expiredAt(tmpDate.plusDays(tmpDate.getDayOfWeek().getValue()-1))
				.build();
			activityRepository.save(activity);
		}
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
		if (weekOfMonth == lastDayOfMonth.get(weekFields.weekOfMonth()) && lastDayOfMonth.getDayOfWeek().compareTo(DayOfWeek.THURSDAY) < 0) {
			LocalDate firstDayOfNextMonth = lastDayOfMonth.plusDays(1); // 마지막 날 + 1일 => 다음달 1일
			return getCurrentWeekOfMonth(firstDayOfNextMonth);
		}

		return localDate.getYear() +"년 " + localDate.getMonthValue() + "월 " + weekOfMonth + "주차";
	}
}
