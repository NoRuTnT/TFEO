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

	public void setAddress(Address address) {
		this.si = address.getSi();
		this.sgg = address.getSgg();
		this.emd = address.getEmd();
		this.ro = address.getRo();
		this.detail = address.getDetail();
	}
}
