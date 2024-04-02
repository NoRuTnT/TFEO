package com.tfeo.backend.domain.member.model.entity;

import static javax.persistence.CascadeType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Month;
import java.util.List;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.tfeo.backend.common.model.entity.MemberPersonality;
import com.tfeo.backend.common.model.type.Address;
import com.tfeo.backend.common.model.type.CertificateStatusType;
import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.common.model.type.SocialType;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.member.model.dto.MemberRequestDto;
import com.tfeo.backend.domain.member.model.dto.SurveyMemberRequestDto;
import com.tfeo.backend.domain.review.model.entity.Review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "member")
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberNo;

	private String socialId;

	@Enumerated(value = EnumType.STRING)
	private SocialType socialType;

	private String name;

	private String phone;

	private String email;

	private String registerNo;

	private String college;

	private Double lat; // 대학 위도

	private Double lng; // 대학 경도

	@Embedded
	private Address address;

	private String profileUrl;

	@Enumerated(value = EnumType.STRING)
	private GenderType gender;

	@Enumerated(value = EnumType.STRING)
	private Role role;

	private String certificate;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "member_personality_no")
	private MemberPersonality memberPersonality;

	@Enumerated(value = EnumType.STRING)
	private CertificateStatusType certificateStatus;

	private LocalDate certificateRegisterDate;

	private LocalDate certificateExpirationDate;

	private LocalTime sleepAt;

	private LocalTime wakeAt;

	private LocalTime returnAt;

	@OneToMany(mappedBy = "member", cascade = ALL)
	private List<Wish> wishes;

	@OneToMany(mappedBy = "member", cascade = ALL)
	private List<Contract> contracts;

	@OneToMany(mappedBy = "member", cascade = ALL)
	private List<Review> reviews;

	public void updateMemberPersonality(MemberPersonality memberPersonality) {
		this.memberPersonality = memberPersonality;
	}

	public void updateMemberSurvey(SurveyMemberRequestDto surveyMemberRequestDto) {
		this.college = surveyMemberRequestDto.getCollege();
		this.college = surveyMemberRequestDto.getCollege();
		this.lat = surveyMemberRequestDto.getLat();
		this.lng = surveyMemberRequestDto.getLng();
		this.gender = surveyMemberRequestDto.getGender();
	}

	public void updateMemberInfo(MemberRequestDto memberRequestDto, String profileUrl, String certificate) {
		this.name = memberRequestDto.getName();
		this.address = Address.builder().si(memberRequestDto.getAddress().getSi())
			.sgg(memberRequestDto.getAddress().getSgg())
			.emd(memberRequestDto.getAddress().getEmd())
			.ro(memberRequestDto.getAddress().getRo())
			.detail(memberRequestDto.getAddress().getDetail())
			.build();
		this.email = memberRequestDto.getEmail();
		this.phone = memberRequestDto.getPhone();
		this.profileUrl = profileUrl;
		this.certificate = certificate;
		this.registerNo = memberRequestDto.getRegisterNo();
	}

	public void updateMemberCertificateStatus(CertificateStatusType certificateStatusType) {
		this.certificateStatus = certificateStatusType;
		if (certificateStatusType.equals(CertificateStatusType.CERTIFICATED)) {
			this.certificateRegisterDate = LocalDate.now();
			// 8월 31일과 2월 28일 날짜 생성
			LocalDate august31 = (LocalDate.now().getMonth().compareTo(Month.AUGUST) > 0) ?
				LocalDate.of(LocalDate.now().getYear() + 1, 8, 31) : LocalDate.of(LocalDate.now().getYear(), 8, 31);
			LocalDate february28 = (LocalDate.now().getMonth().compareTo(Month.FEBRUARY) > 0) ?
				LocalDate.of(LocalDate.now().getYear() + 1, 8, 31) : LocalDate.of(LocalDate.now().getYear(), 2, 28);

			// 현재 날짜 이후의 날짜와의 차이 계산
			long daysUntilAugust31 = LocalDate.now().until(august31).getDays();
			long daysUntilFebruary28 = LocalDate.now().until(february28).getDays();
			// 더 가까운 날짜에 적용
			this.certificateExpirationDate = (daysUntilAugust31 < daysUntilFebruary28) ? august31 : february28;
		}
	}
}
