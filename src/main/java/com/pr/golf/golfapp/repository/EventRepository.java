package com.pr.golf.golfapp.repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

	@Query(value = "SELECT e.*  FROM golf_event e WHERE competition_id = :competitionId", 
			  nativeQuery = true)
	public Optional<List<Event>> findByCompetitionId(Long competitionId);

}
