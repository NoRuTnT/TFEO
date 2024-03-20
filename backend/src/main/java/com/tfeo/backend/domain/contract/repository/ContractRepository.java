package com.tfeo.backend.domain.contract.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tfeo.backend.common.model.type.ContractProgressType;
import com.tfeo.backend.domain.contract.model.entity.Contract;
import com.tfeo.backend.domain.home.model.entity.Home;
import com.tfeo.backend.domain.member.model.entity.Member;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
	Optional<Contract> findByHomeAndMember(Home home, Member member);

	Optional<Contract> findByMemberAndProgress(Member member, ContractProgressType contractProgressType);

	List<Contract> findAllByMemberAndProgressNot(Member member,
		ContractProgressType contractProgressType);

	@Query("select c from Contract c where c.member.memberNo = :memberNo and c.expiredAt >= NOW()")
	Optional<Contract> findByMember(@Param("memberNo") Long memberNo);

	@Query("select c from Contract c where c.progress = :progress and c.home.homeNo = :homeNo and c.expiredAt >= NOW()")
	Optional<Contract> findByHomeNoProgress(@Param("progress") ContractProgressType progress, @Param("homeNo") Long homeNo);

}
