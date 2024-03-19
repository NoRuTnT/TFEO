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


	public void setAllKeywordValues(List<Boolean> keywordValues) {
		if (keywordValues.size() != 11) {
			throw new IllegalArgumentException("Invalid number of keyword values");
		}

		this.kindElderly = keywordValues.get(0);
		this.cleanHouse = keywordValues.get(1);
		this.spaciousRoom = keywordValues.get(2);
		this.manyNearbyAmenities = keywordValues.get(3);
		this.matchesStatedOptions = keywordValues.get(4);
		this.affordableRent = keywordValues.get(5);
		this.nearSchool = keywordValues.get(6);
		this.convenientTransportation = keywordValues.get(7);
		this.easyAccessToHome = keywordValues.get(8);
		this.goodSecurity = keywordValues.get(9);
		this.respectfulElderly = keywordValues.get(10);
	}
}
