package com.tfeo.backend.domain.review.model.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReviewKeywordDto {
	boolean kindElderly;
	boolean cleanHouse;
	boolean spaciousRoom;
	boolean manyNearbyAmenities;
	boolean matchesStatedOptions;
	boolean affordableRent;
	boolean nearSchool;
	boolean convenientTransportation;
	boolean easyAccessToHome;
	boolean goodSecurity;
	boolean respectfulElderly;
}
