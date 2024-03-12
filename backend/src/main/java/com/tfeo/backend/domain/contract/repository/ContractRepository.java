package com.tfeo.backend.domain.contract.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tfeo.backend.domain.contract.model.entity.Contract;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
	Optional<Contract> findById(Long contractNo);

	@Query("select c from Contract c where c.member.memberNo = :memberNo and c.expiredAt >= NOW()")
	Optional<Contract> findByMember(@Param("memberNo") Long memberNo);
}
