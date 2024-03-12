package com.tfeo.backend.domain.contract.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfeo.backend.common.model.type.ContractProgressType;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.member.model.entity.Member;

public interface ContractRepository extends JpaRepository<Contract, Long> {
	Optional<Contract> findByHomeAndMember(Home home, Member member);

	Optional<Contract> findByMemberAndProgress(Member member, ContractProgressType contractProgressType);

	List<Contract> findAllByMemberAndProgressNot(Member member,
		ContractProgressType contractProgressType);
}
