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

	Optional<Contract> findByHomeAndMemberAndProgress(Home home, Member member, ContractProgressType progress);

	Optional<Contract> findByMember(Member member);

	Optional<Contract> findByMemberAndProgress(Member member, ContractProgressType contractProgressType);

	List<Contract> findAllByMemberAndProgressNot(Member member,
		ContractProgressType contractProgressType);

	@Query("SELECT c FROM Contract c LEFT JOIN FETCH c.home h LEFT JOIN FETCH c.member m WHERE c.progress = :contractProgressType AND c.expiredAt >= NOW()")
	List<Contract> findAllByProgress(ContractProgressType contractProgressType);

	@Query("select c from Contract c where c.progress = :progress and c.member.memberNo = :memberNo and c.expiredAt >= NOW()")
	Optional<Contract> findByMember(@Param("progress") ContractProgressType progress, @Param("memberNo") Long memberNo);

	@Query("select c from Contract c LEFT JOIN FETCH c.member WHERE c.home.homeNo = :homeNo and c.expiredAt >= NOW()")
	Optional<Contract> findByHomeNo(Long homeNo);

	@Query("select c from Contract c where c.member.memberNo = :memberNo and c.expiredAt >= NOW()")
	Optional<List<Contract>> findAllByMemberNo(@Param("memberNo") Long memberNo);
}
