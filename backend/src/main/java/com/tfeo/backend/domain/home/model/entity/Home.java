package com.tfeo.backend.domain.home.model.entity;

import static javax.persistence.CascadeType.*;
import static lombok.AccessLevel.*;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
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
import com.tfeo.backend.common.model.type.GenderType;
import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.contract.model.entity.Contract;
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
	@Column(name = "home_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long homeNo;

	@Column(name = "host_name")
	private String hostName;

	@Column(name = "host_age")
	private int hostAge;

	@Column(name = "host_phone")
	private String hostPhone;

	@Column(name = "home_gender")
	private GenderType hostGender;

	@Column(name = "guardian_name")
	private String guardianName;

	@Column(name = "guardian_phone")
	private String guardianPhone;

	private String relation;

	@Column(name = "host_register_no")
	private String hostRegisterNo;

	@Column(name = "host_account_no")
	private String hostAccountNo;

	@Column(name = "host_bank")
	private String hostBank;

	private Address address;

	private int rent;

	private Double lat;

	private Double lng;

	@Column(name = "register_member_role")
	private MemberRoleType registerMemberRole;

	private String introduce;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="member_personality_no")
	private MemberPersonality memberPersonality;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="host_personality_no")
	private HostPersonality hostPersonality;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="home_option_no")
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

}
