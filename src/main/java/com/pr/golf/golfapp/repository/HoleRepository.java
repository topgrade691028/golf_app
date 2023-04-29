package com.pr.golf.golfapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.Hole;

@Repository
public interface HoleRepository extends JpaRepository<Hole, Long>{

	/*
	 * @Query(value =
	 * "INSERT INTO Hole (hole_number, par) VALUES (:holeNumber, :par)", nativeQuery
	 * = true) void insertHole(@Param("holeNumber") int holeNumber, @Param("par")
	 * int par);
	 */
}
