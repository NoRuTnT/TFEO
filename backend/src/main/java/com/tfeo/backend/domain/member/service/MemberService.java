package com.tfeo.backend.domain.member.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.nurigo.sdk.message.response.SingleMessageSentResponse;

import com.tfeo.backend.common.config.RedisUtils;
import com.tfeo.backend.common.config.SmsUtils;
import com.tfeo.backend.common.model.type.ContractProgressType;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.contract.repository.ContractRepository;
import com.tfeo.backend.domain.home.common.exception.HomeNotExistException;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.home.model.entity.HomeImage;
import com.tfeo.backend.domain.home.model.entity.HostImage;
import com.tfeo.backend.domain.home.repository.HomeImageRepository;
import com.tfeo.backend.domain.home.repository.HomeRepository;
import com.tfeo.backend.domain.home.repository.HostImageRepository;
import com.tfeo.backend.domain.member.common.exception.ApplicationAlreadyExistException;
import com.tfeo.backend.domain.member.common.exception.ApplicationNotExistException;
import com.tfeo.backend.domain.member.common.exception.MemberHomeNotExistException;
import com.tfeo.backend.domain.member.common.exception.MemberNotExistException;
import com.tfeo.backend.domain.member.common.exception.VerificationNotExistException;
import com.tfeo.backend.domain.member.common.exception.VerificationWrongException;
import com.tfeo.backend.domain.member.model.dto.AppliedHomeContractResponseDto;
import com.tfeo.backend.domain.member.model.dto.AppliedHomeHomeResponseDto;
import com.tfeo.backend.domain.member.model.dto.AppliedHomeResponseDto;
import com.tfeo.backend.domain.member.model.dto.MemberHomeApplicationRequestDto;
import com.tfeo.backend.domain.member.model.dto.MemberRequestDto;
import com.tfeo.backend.domain.member.model.dto.MemberResponseDto;
import com.tfeo.backend.domain.member.model.dto.MyHomeContractResponseDto;
import com.tfeo.backend.domain.member.model.dto.MyHomeHomeResponseDto;
import com.tfeo.backend.domain.member.model.dto.MyHomeResponseDto;
import com.tfeo.backend.domain.member.model.dto.SmsRequestDto;
import com.tfeo.backend.domain.member.model.dto.SmsVerifyDto;
import com.tfeo.backend.domain.member.model.entity.Member;
import com.tfeo.backend.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final HomeRepository homeRepository;
	private final ContractRepository contractRepository;
	private final HostImageRepository hostImageRepository;
	private final HomeImageRepository homeImageRepository;
	private final SmsUtils smsUtils;
	private final RedisUtils redisUtils;

	//회원 조회
	public MemberResponseDto findMember(Long memberNo) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		MemberResponseDto memberResponseDto = new MemberResponseDto(member);
		return memberResponseDto;
	}

	//회원 탈퇴
	@Transactional
	public void deleteMember(Long memberNo) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		memberRepository.delete(member);
	}

	//집 신청
	@Transactional
	public void addHomeApplication(Long homeNo, Long memberNo,
		MemberHomeApplicationRequestDto memberHomeApplicationRequestDto) {
		//Todo: memberNo auth로 받기
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Home home = homeRepository.findById(homeNo)
			.orElseThrow(() -> new HomeNotExistException(homeNo));
		// 이미 신청한 경우 제외해야 함 - 1학생 1신청만 가능
		Optional<Contract> optionalContract = contractRepository.findByMember(member);
		if (optionalContract.isPresent())
			throw new ApplicationAlreadyExistException(memberNo);
		Contract newContract = Contract.builder()
			.home(home)
			.member(member)
			.progress(ContractProgressType.APPLIED)
			.startAt(memberHomeApplicationRequestDto.getStartAt())
			.expiredAt(memberHomeApplicationRequestDto.getExpiredAt())
			.studentSign(false).hostSign(false)
			.build();
		contractRepository.save(newContract);
	}

	// 집 신청 취소
	@Transactional
	public void deleteApplication(Long homeNo, Long memberNo) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Home home = homeRepository.findById(homeNo)
			.orElseThrow(() -> new HomeNotExistException(homeNo));
		Contract contract = contractRepository.findByHomeAndMember(home, member)
			.orElseThrow(() -> new ApplicationNotExistException(homeNo, memberNo));
		contractRepository.delete(contract);
	}

	// 내 집 찾기
	public MyHomeResponseDto findMyHomeDetails(Long memberNo) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		Contract contract = contractRepository.findByMemberAndProgress(member, ContractProgressType.DONE)
			.orElseThrow(() -> new MemberHomeNotExistException(memberNo));
		Home home = contract.getHome();
		List<String> homeImageList = homeImageRepository.findAllByHome(home)
			.stream()
			.map(HomeImage::getHomeImageUrl)
			.collect(Collectors.toList());
		List<String> hostImageList = hostImageRepository.findAllByHome(home)
			.stream()
			.map(HostImage::getHostImageUrl)
			.collect(Collectors.toList());
		MyHomeContractResponseDto myHomeContractResponseDto = new MyHomeContractResponseDto(contract);
		MyHomeHomeResponseDto myHomeHomeResponseDto = new MyHomeHomeResponseDto(home, homeImageList, hostImageList);
		MyHomeResponseDto myHomeResponseDto = MyHomeResponseDto.builder()
			.home(myHomeHomeResponseDto).contract(myHomeContractResponseDto).build();
		return myHomeResponseDto;
	}

	// 신청 내역 보기
	public List<AppliedHomeResponseDto> findAppliedHomeList(Long memberNo) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		List<Contract> contractList = contractRepository.findAllByMemberAndProgressNot(
			member, ContractProgressType.DONE);
		List<AppliedHomeResponseDto> appliedHomeResponseDtoList = new ArrayList<>();
		for (Contract contract : contractList) {
			AppliedHomeContractResponseDto appliedHomeContractResponseDto = new AppliedHomeContractResponseDto(
				contract);
			Home home = contract.getHome();
			List<String> homeImageList = homeImageRepository.findAllByHome(home)
				.stream()
				.map(HomeImage::getHomeImageUrl)
				.collect(Collectors.toList());
			List<String> hostImageList = hostImageRepository.findAllByHome(home)
				.stream()
				.map(HostImage::getHostImageUrl)
				.collect(Collectors.toList());
			AppliedHomeHomeResponseDto appliedHomeHomeResponseDto = new AppliedHomeHomeResponseDto(home, hostImageList,
				homeImageList);
			AppliedHomeResponseDto appliedHomeResponseDto = AppliedHomeResponseDto.builder()
				.appliedHomeHomeResponseDto(appliedHomeHomeResponseDto)
				.appliedHomeContractResponseDto(appliedHomeContractResponseDto)
				.build();
			appliedHomeResponseDtoList.add(appliedHomeResponseDto);
		}
		return appliedHomeResponseDtoList;
	}

	//회원 정보 수정
	public void modifyMember(Long memberNo, MemberRequestDto memberRequestDto) {
		Member member = memberRepository.findByMemberNo(memberNo)
			.orElseThrow(() -> new MemberNotExistException(memberNo));
		//Todo: 구현 해야 한다.
	}

	public SingleMessageSentResponse requestSms(SmsRequestDto smsRequestDto) {
		String phone = smsRequestDto.getPhone();
		String verificationCode = getVerificationCode();
		log.info("PHONE: {}, VERIFICATION_CODE: {}", phone, verificationCode);
		String text = "인증번호는 [" + verificationCode + "]입니다.";
		String redisKey = "verification::" + phone;
		redisUtils.setData(redisKey, verificationCode, 300L); // 인증번호 5분 유효
		return smsUtils.sendOne(phone, text, null);
	}

	public boolean verifySms(SmsVerifyDto smsVerifyDto) {
		String phone = smsVerifyDto.getPhone();
		String verificationCode = smsVerifyDto.getVerificationCode();
		String storedVerificationCode = redisUtils.getData("verification::" + phone);
		if (storedVerificationCode == null)
			throw new VerificationNotExistException();
		if (!storedVerificationCode.equals(verificationCode))
			throw new VerificationWrongException();
		redisUtils.deleteData("verification::" + phone);
		return true;
	}

	private String getVerificationCode() {
		Random random = new Random();
		// 인증번호를 담을 StringBuilder 객체 생성
		StringBuilder codeBuilder = new StringBuilder();

		// 지정된 길이만큼 반복하여 난수를 생성하고 StringBuilder에 추가
		for (int i = 0; i < 6; i++) {
			// 0부터 9까지의 난수 생성하여 StringBuilder에 추가
			int randomNumber = random.nextInt(10); // 0부터 9까지의 난수 생성
			codeBuilder.append(randomNumber);
		}

		// 생성된 인증번호 반환
		return codeBuilder.toString();
	}
}
