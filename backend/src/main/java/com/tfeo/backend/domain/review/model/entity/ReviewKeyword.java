package com.tfeo.backend.domain.review.model.entity;

import static lombok.AccessLevel.*;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.tfeo.backend.domain.review.model.dto.ReviewKeywordDto;

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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewKeywordNo;

	private Boolean kindElderly;

	private Boolean cleanHouse;

	private Boolean spaciousRoom;

	private Boolean manyNearbyAmenities;

	private Boolean matchesStatedOptions;

	private Boolean affordableRent;

	private Boolean nearSchool;

	private Boolean convenientTransportation;

	private Boolean easyAccessToHome;

	private Boolean goodSecurity;

	private Boolean respectfulElderly;


	public void setAllKeywordValues(ReviewKeywordDto keywordValues) {
		this.kindElderly = keywordValues.isKindElderly();
		this.cleanHouse = keywordValues.isCleanHouse();
		this.spaciousRoom = keywordValues.isSpaciousRoom();
		this.manyNearbyAmenities = keywordValues.isManyNearbyAmenities();
		this.matchesStatedOptions = keywordValues.isMatchesStatedOptions();
		this.affordableRent = keywordValues.isAffordableRent();
		this.nearSchool = keywordValues.isNearSchool();
		this.convenientTransportation = keywordValues.isConvenientTransportation();
		this.easyAccessToHome = keywordValues.isEasyAccessToHome();
		this.goodSecurity = keywordValues.isGoodSecurity();
		this.respectfulElderly = keywordValues.isRespectfulElderly();
	}
}
