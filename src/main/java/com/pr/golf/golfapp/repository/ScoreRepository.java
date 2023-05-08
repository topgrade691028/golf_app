package com.pr.golf.golfapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.Score;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long>{

	@Query(value = "SELECT s.*  FROM score s WHERE event_id = :eventId", 
			  nativeQuery = true)
    public Optional<List<Score>> findByEventId(@Param("eventId")Long eventId);

	@Query(value = "SELECT s.*  FROM score s WHERE event_id = :eventId "
																+ " and player_id = :playerId ", 
			  nativeQuery = true)
	public Optional<List<Score>> findByEventIdAndPlayerId(@Param("eventId")Long eventId,
															@Param("playerId")Long playerId);
}
