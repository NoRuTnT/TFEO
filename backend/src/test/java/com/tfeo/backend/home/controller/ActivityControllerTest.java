// package com.tfeo.backend.home.controller;
//
// import static org.springframework.http.MediaType.*;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
// import java.util.ArrayList;
//
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.context.junit.jupiter.SpringExtension;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.transaction.annotation.Transactional;
// import org.springframework.web.context.WebApplicationContext;
//
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.tfeo.backend.common.model.type.ActivityApproveType;
// import com.tfeo.backend.common.model.type.Address;
// import com.tfeo.backend.common.model.type.CertificateStatusType;
// import com.tfeo.backend.common.model.type.ContractProgressType;
// import com.tfeo.backend.common.model.type.GenderType;
// import com.tfeo.backend.common.model.type.MemberRoleType;
// import com.tfeo.backend.common.model.type.SocialType;
// import com.tfeo.backend.domain.activity.model.dto.AddActivityRequestDto;
// import com.tfeo.backend.domain.activity.model.entity.Activity;
// import com.tfeo.backend.domain.activity.repository.ActivityRepository;
// import com.tfeo.backend.domain.contract.model.entity.Contract;
// import com.tfeo.backend.domain.contract.repository.ContractRepository;
// import com.tfeo.backend.domain.home.model.entity.Home;
// import com.tfeo.backend.domain.home.repository.HomeRepository;
// import com.tfeo.backend.domain.member.model.entity.Member;
// import com.tfeo.backend.domain.member.repository.MemberRepository;
//
// @ExtendWith(SpringExtension.class)
// @SpringBootTest
// @AutoConfigureMockMvc
// @Transactional
// public class ActivityControllerTest {
// 	@Autowired
// 	private ContractRepository contractRepository;
//
// 	@Autowired
// 	private ActivityRepository activityRepository;
//
// 	@Autowired
// 	private MemberRepository memberRepository;
//
// 	@Autowired
// 	private HomeRepository homeRepository;
//
// 	@Autowired
// 	private MockMvc mockMvc;
//
// 	@Autowired
// 	private WebApplicationContext context;
//
// 	@Autowired
// 	private ObjectMapper objectMapper;
//
// 	// private String accessToken =
//
// 	// @BeforeEach
// 	// public void setup() {
// 	// 	mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()) // 스프링 시큐리티와 함께 MockMvc 설정
// 	// 		.build();
// 	// }
//
// 	@Test
// 	@DisplayName("활동내역 등록 - 성공")
// 	void activityAdd_success() throws Exception {
// 		//given
// 		Address address = Address.builder()
// 			.si("si")
// 			.sgg("sgg")
// 			.emd("emd")
// 			.ro("ro")
// 			.detail("detail")
// 			.build();
// 		//코드수정으로 현재는 사용안함
// 		Member saveMember = Member.builder()
// 			.socialId("id")
// 			.socialType(SocialType.KAKAO)
// 			.name("name")
// 			.phone("01046402249")
// 			.email("test@naver.com")
// 			.registerNo("registernum")
// 			.college("싸피대학교")
// 			.address(address)
// 			.profileUrl("url")
// 			.gender(GenderType.F)
// 			.role(MemberRoleType.MEMBER)
// 			.certificate("url")
// 			.certificateStatus(CertificateStatusType.CERTIFICATED)
// 			.wishes(new ArrayList<>())
// 			.contracts(new ArrayList<>())
// 			.reviews(new ArrayList<>())
// 			.build();
// 		memberRepository.save(saveMember);
// 		//코드수정으로 현재는 사용안함
// 		Home saveHome = Home.builder()
// 			.hostName("hostname")
// 			.hostAge(70)
// 			.hostPhone("phonenum")
// 			.hostGender(GenderType.F)
// 			.guardianName("문준형")
// 			.guardianPhone("01046402249")
// 			.relation("자")
// 			.hostRegisterNo("hostreginum")
// 			.hostAccountNo("hostaccountnum")
// 			.hostBank("신한은행")
// 			.address(address)
// 			.rent(500000)
// 			.lat(37.5012647456244)
// 			.lng(127.03958123605)
// 			.nonregisterMember(false)
// 			.introduce("introduce")
// 			.wishes(new ArrayList<>())
// 			.contracts(new ArrayList<>())
// 			.reviews(new ArrayList<>())
// 			.homeImages(new ArrayList<>())
// 			.hostImages(new ArrayList<>())
// 			.build();
// 		homeRepository.save(saveHome);
//
// 		//코드수정으로 현재는 사용안함
// 		Contract saveContract = Contract.builder()
// 			.contractUrl("contractUrl")
// 			.progress(ContractProgressType.DONE)
// 			.member(saveMember)
// 			.home(saveHome)
// 			.activities(new ArrayList<>())
// 			.build();
// 		contractRepository.save(saveContract);
//
// 		Activity saveActivity = Activity.builder()
// 			.week("week")
// 			.activityImageUrl("url")
// 			.activityText("text")
// 			.approve(ActivityApproveType.NONE)
// 			.contract(saveContract)
// 			.build();
// 		activityRepository.save(saveActivity);
//
// 		//when
// 		AddActivityRequestDto addActivityRequestDto = new AddActivityRequestDto("imageUrl", "text");
// 		mockMvc.perform(put("/api/activity/")
// 				.contentType(APPLICATION_JSON)
// 				.content(objectMapper.writeValueAsString(addActivityRequestDto)))
// 			.andExpect(status().isOk())
// 			.andDo(print());
//
// 		//then 생성이아닌 수정으로 변경
// 		// Activity saveActivity = activityRepository.findAll().get(0);
// 		// Assertions.assertThat(saveActivity.getActivityImageUrl())
// 		// 	.isEqualTo(addActivityRequestDto.getActivityImageUrl());
// 		// Assertions.assertThat(saveActivity.getActivityText()).isEqualTo(addActivityRequestDto.getActivityText());
//
// 	}
// }
