package com.tfeo.backend.domain.home.model.entity;

import static javax.persistence.CascadeType.*;
import static lombok.AccessLevel.*;

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
import javax.validation.constraints.Null;

import com.tfeo.backend.common.model.type.Address;
import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.common.model.type.Role;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.home.model.dto.HomeDto;
import com.tfeo.backend.domain.member.model.entity.Wish;
import com.tfeo.backend.domain.review.model.entity.Review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "home")
public class Home {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long homeNo;

	private String hostName;

	@Null
	private Integer hostAge;

	private String hostPhone;

	@Enumerated(value = EnumType.STRING)
	private GenderType hostGender;

	private String guardianName;

	private String guardianPhone;

	private String relation;

	private String hostRegisterNo;

	private String hostAccountNo;

	private String hostBank;

	@Embedded
	private Address address;

	@Null
	private Integer rent;

	@Null
	private Double lat;

	@Null
	private Double lng;

	@Enumerated(value = EnumType.STRING)
	private Role registerMemberRole;

	private String introduce;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "host_personality_no")
	private HostPersonality hostPersonality;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "home_option_no")
	private HomeOption homeOption;

	@OneToMany(mappedBy = "home", cascade = ALL)
	private List<Wish> wishes;

	@OneToMany(mappedBy = "home", cascade = ALL)
	private List<Contract> contracts;

	@OneToMany(mappedBy = "home", cascade = ALL)
	private List<Review> reviews;

	@OneToMany(mappedBy = "home", cascade = ALL)
	private List<HomeImage> homeImages;

	@OneToMany(mappedBy = "home", cascade = ALL)
	private List<HostImage> hostImages;

	public void setRegisterMemberRole(Role registerMemberRole) {
		this.registerMemberRole = registerMemberRole;
	}

	public void update(HomeDto homeDto, HomeOption homeOption, HostPersonality hostPersonality) {
		this.hostName = homeDto.getHostName();

		this.hostAge = homeDto.getHostAge();

		this.hostPhone = homeDto.getHostPhone();

		this.hostGender = homeDto.getHostGender();

		this.guardianName = homeDto.getGuardianName();

		this.guardianPhone = homeDto.getGuardianPhone();

		this.relation = homeDto.getRelation();

		this.hostRegisterNo = homeDto.getHostRegisterNo();

		this.hostAccountNo = homeDto.getHostAccountNo();

		this.hostBank = homeDto.getHostBank();

		this.address.setAddress(homeDto.getAddress());

		this.rent = homeDto.getRent();

		this.lat = homeDto.getLat();

		this.lng = homeDto.getLng();

		this.introduce = homeDto.getIntroduce();

		this.hostPersonality = hostPersonality;

		this.homeOption = homeOption;
	}
}
