package com.tfeo.backend.domain.review.model.entity;

import static lombok.AccessLevel.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
@Table(name="review_keyword")
public class ReviewKeyword {
	@Id
	@Column(name = "review_keyword_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewKeywordNo;

	@Column(name="kind_elderly")
	private Boolean kindElderly;

	@Column(name="clean_house")
	private Boolean cleanHouse;

	@Column(name="spacious_room")
	private Boolean spaciousRoom;

	@Column(name="many_nearby_amenities")
	private Boolean manyNearbyAmenities;

	@Column(name="matches_stated_options")
	private Boolean matchesStatedOptions;

	@Column(name="affordable_rent")
	private Boolean affordableRent;

	@Column(name="near_school")
	private Boolean nearSchool;

	@Column(name="convenient_transportation")
	private Boolean convenientTransportation;

	@Column(name="easy_access_to_home")
	private Boolean easyAccessToHome;

	@Column(name="good_security")
	private Boolean goodSecurity;

	@Column(name="respectful_elderly")
	private Boolean respectfulElderly;
}
