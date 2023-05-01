package com.pr.golf.golfapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.GolfEvent;

@Repository
public interface GolfEventRepository extends JpaRepository<GolfEvent, Long> {

	@Query(value = "SELECT e.*  FROM golf_event e WHERE competition_id = :competitionId", 
			  nativeQuery = true)
	public Optional<List<GolfEvent>> findByCompetitionId(Long competitionId);

	@Query(value = "SELECT e.*  FROM golf_event e WHERE name = :name", 
			  nativeQuery = true)
	public Optional<GolfEvent> findByEventName(@Param("name") String name);

}
