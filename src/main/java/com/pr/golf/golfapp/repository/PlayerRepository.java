package com.pr.golf.golfapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.model.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

	@Query(value = "SELECT p.*  FROM player p WHERE event_id = :eventId", nativeQuery = true)
	Optional<List<Player>> findPlayersByEventId(Long eventId);

	@Query(value = "SELECT p.* FROM Player p JOIN golf_event_player g ON p.id = g.player_id WHERE g.event_id = :eventId", nativeQuery = true)
	List<Player> findByGolfEventId(@Param("eventId") Long eventId);

	@Query(value = "SELECT * FROM player p INNER JOIN golf_event_player gp ON p.id = gp.player_id WHERE gp.event_id = :eventId", nativeQuery = true)
	List<Player> findByGolfEvents_Id(@Param("eventId") Long eventId);

	@Query(value = "SELECT * FROM player WHERE id IN :playerIds", nativeQuery = true)
	List<Player> findPlayersByIds(List<Long> playerIds);

}
