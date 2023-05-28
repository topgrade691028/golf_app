package com.pr.golf.golfapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pr.golf.golfapp.dto.PlayerGroupDTO;
import com.pr.golf.golfapp.model.PlayerGrouping;

@Repository
public interface PlayerGroupingRepository extends JpaRepository<PlayerGrouping, Long> {

	@Query(value="SELECT * FROM player_grouping WHERE event_id = :eventId", nativeQuery = true)
	List<PlayerGrouping> getPlayerGroupingsByEventId(@Param("eventId") Long eventId);
	
	@Query(value = "SELECT * FROM player_grouping pg " +
	        "JOIN golf_event ge ON ge.id = pg.event_id " +
	        "WHERE " +
	        "(:searchCriteria = 'eventId' AND ge.id = :searchText) " +
	        "OR (:searchCriteria = 'eventName' AND ge.name = :searchText) " +
	        "OR (:searchCriteria = 'groupingTitle' AND pg.group_number = :searchText)",
	        nativeQuery = true)
	List<PlayerGrouping> getPlayerGroupingsBySearchCriteria(
	        @Param("searchCriteria") String searchCriteria,
	        @Param("searchText") String searchText);

	@Query(value="SELECT * FROM player_grouping WHERE event_id = :eventId and group_number = :groupNumber", nativeQuery = true)
	List<PlayerGrouping> getPlayersGroupByEventAndGroupNumber(@Param("eventId") Long eventId, @Param("groupNumber") int groupNumber);
	
	@Modifying
	@Query(value = "INSERT INTO player_grouping (event_id, group_number, player_id) VALUES (:eventId, :groupNumber, :playerId)", nativeQuery = true)
	void savePlayerGrouping(@Param("eventId") Long eventId, @Param("groupNumber") int groupNumber,
	        @Param("playerId") Long playerId);

	default void saveAllPlayerGroupings(List<PlayerGroupDTO> playerGroups, long eventId) {
	    for (PlayerGroupDTO playerGroup : playerGroups) {
	        int groupNumber = playerGroup.getGroupNumber();
	        List<Long> playerIds = playerGroup.getPlayerIds();
	        for (Long playerId : playerIds) {
	            savePlayerGrouping(eventId, groupNumber, playerId);
	        }
	    }
	}

}
