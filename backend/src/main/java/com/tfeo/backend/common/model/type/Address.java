package com.tfeo.backend.common.model.type;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {
	private String si;
	private String sgg;
	private String emd;
	private String ro;
	private String detail;
}
