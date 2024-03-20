package com.tfeo.backend.domain.contract.model.dto;

import java.util.List;

import com.tfeo.backend.domain.contract.model.entity.Contract;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class ContractsResponse {
	List<Contract> contracts;
}
