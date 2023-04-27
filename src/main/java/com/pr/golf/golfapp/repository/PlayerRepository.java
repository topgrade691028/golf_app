package com.pr.golf.golfapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long>{

	@Query(value = "SELECT p.*  FROM player p WHERE event_id = :eventId", 
			  nativeQuery = true)
	Optional<List<Player>> findPlayersByEventId(Long eventId);

}
