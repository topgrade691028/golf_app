package com.pr.golf.golfapp.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.dto.GolfEventDTO;
import com.pr.golf.golfapp.dto.PlayerDTO;
import com.pr.golf.golfapp.dto.PlayerGroupDTO;
import com.pr.golf.golfapp.dto.PlayerGroupingDTO;
import com.pr.golf.golfapp.mapper.GolfEventMapper;
import com.pr.golf.golfapp.mapper.PlayerGroupingMapper;
import com.pr.golf.golfapp.mapper.PlayerMapper;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.model.GolfEventPlayer;
import com.pr.golf.golfapp.model.GolfEventPlayerId;
import com.pr.golf.golfapp.model.PlayerGrouping;
import com.pr.golf.golfapp.repository.GolfEventPlayerRepository;
import com.pr.golf.golfapp.repository.GolfEventRepository;
import com.pr.golf.golfapp.repository.PlayerGroupingRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class GolfEventService {

	private GolfEventRepository golfEventRepository;

	private GolfEventPlayerRepository golfEventPlayerRepository;
	
	private PlayerGroupingRepository playerGroupingRepository;
	
	private GolfEventMapper golfEventMapper;

	private PlayerMapper playerMapper;

	
	private PlayerGroupingMapper playerGroupingMapper;

	
	
    public GolfEventService(@Autowired GolfEventRepository golfEventRepository,
    						@Autowired GolfEventPlayerRepository golfEventPlayerRepository,
    						@Autowired GolfEventMapper golfEventMapper,
    						@Autowired PlayerMapper playerMapper,
    						@Autowired PlayerGroupingMapper playerGroupingMapper,
    						@Autowired PlayerGroupingRepository playerGroupingRepository) {
    	this.golfEventRepository = golfEventRepository;
    	this.golfEventMapper = golfEventMapper;
    	this.golfEventPlayerRepository = golfEventPlayerRepository;
    	this.playerMapper = playerMapper;
    	this.playerGroupingMapper = playerGroupingMapper;
    	this.playerGroupingRepository = playerGroupingRepository;
    }
    
    public Optional<GolfEventDTO> getGolfEventById(long eventId) {
    	return Optional.of(Optional.of(golfEventMapper.toDto(
    					Arrays.asList(golfEventRepository.findById(eventId).get()))).get().get(0));
    }
    
    public Optional<GolfEvent> getGolfEventByName(String name) {
    	return golfEventRepository.findByEventName(name);
    }

	public Optional<List<GolfEventDTO>> findByCompetitionId(Long competitionId) {
		// TODO Auto-generated method stub
		return Optional.of(golfEventMapper.toDto(golfEventRepository.findByCompetitionId(competitionId)));
	}

	public Optional<GolfEventDTO> findByEventName(String name) {
		// TODO Auto-generated method stub
		return Optional.of(golfEventMapper.toDto(Arrays.asList(golfEventRepository.findByEventName(name).get())).get(0));
	}

	public List<GolfEventDTO> searchGolfEvents(String searchText, String searchType) {
		// TODO Auto-generated method stub
		return golfEventMapper.toDto(golfEventRepository.searchGolfEvents(searchText, searchType));
	}

	public void deleteById(Long eventId) {
		// TODO Auto-generated method stub
		golfEventRepository.deleteById(eventId);
	}

	public Optional<GolfEventDTO> findById(Long id) {
		return Optional.of(golfEventMapper.toDto(Arrays.asList(golfEventRepository.findById(id).get())).get(0));
	}

	public GolfEventDTO save(GolfEventDTO newEventDTO) {
		// TODO Auto-generated method stub
		List<GolfEvent> golfEvents = golfEventMapper.toEntity(Arrays.asList(newEventDTO));
	    golfEventRepository.saveAll(golfEvents);
	    List<GolfEventPlayer> golfEventPlayers = golfEvents.stream()
	    	    .flatMap(golfEvent -> golfEvent.getPlayers().stream()
	    	        .map(player -> GolfEventPlayer.builder()
	    	        			.id(GolfEventPlayerId.builder()
	    	        					.eventId(golfEvent.getId())
	    	        					.playerId(player.getId())
	    	        					.build())
	    	        			//.event(golfEvent)
	    	        			//.player(player)
	    	        			.build())
	    	    )
	    	    .collect(Collectors.toList());

	    //golfEventPlayerRepository.saveAll(golfEventPlayers);
	    
		return newEventDTO;
	}

	public void removePlayerFromEvent(Long eventId, Long playerId) {
		golfEventPlayerRepository.deleteByEventIdAndPlayerId(eventId, playerId);
	}

	public List<PlayerDTO> getPlayersRegisteredForEvent(Long eventId) {
		
		List<Object[]> results = golfEventPlayerRepository.findPlayersRegisteredForEventByEventId(eventId);
		List<PlayerDTO> playerDTOs = new ArrayList<>(results.size());

		for (Object[] result : results) {
		    Long playerId = (Long) result[0];
		    String playerName = (String) result[1];
		    Integer handicap = (Integer) result[2];

		    PlayerDTO playerDto = PlayerDTO.builder()
		    						.id(playerId)
		    						.name(playerName)
		    						.handicap(handicap)
		    						.build();

		    playerDTOs.add(playerDto);
		}

		return playerDTOs;
	}

	public List<PlayerGroupingDTO> getPlayerDTOGroupsForEvent(Long eventId) {
		// TODO Auto-generated method stub
		return playerGroupingMapper.toDto(playerGroupingRepository.getPlayerGroupingsByEventId(eventId));
	}
	
	public List<PlayerGrouping> getPlayerGroupingsBySearchCriteria(String searchCriteria, String searchText) {
		// TODO Auto-generated method stub
		return playerGroupingRepository.getPlayerGroupingsBySearchCriteria(searchCriteria, searchText);
	}
	
	public List<PlayerGrouping> getPlayerGroupsForEvent(Long eventId) {
		// TODO Auto-generated method stub
		return playerGroupingRepository.getPlayerGroupingsByEventId(eventId);
	}
	
	public List<PlayerGrouping> getPlayersGroupByEventAndGroupNumber(Long eventId, int groupNumber) {
		// TODO Auto-generated method stub
		return playerGroupingRepository.getPlayersGroupByEventAndGroupNumber(eventId, groupNumber);
	}
	
	/*
	public List<PlayerGrouping> getPlayerDTOGroupsForEvent(Long eventId) {
	    List<Object[]> groupingsData = golfEventRepository.getPlayerGroupingsByEventId(eventId);
	    List<PlayerGrouping> groupings = new ArrayList<>();
	    for (Object[] data : groupingsData) {
	        Long groupingId = (Long) data[0];
	        Integer groupNumber = (Integer) data[2];

	        PlayerGrouping grouping = PlayerGrouping.builder()
	        					.groupingId(groupingId)
	        					.eventId(eventId)
	        					.groupNumber(groupNumber)
	        					.build();
	      groupings.add(grouping);
	    }
	    return groupings;
	}
	*/

	public void deleteGroupsByEventId(Long eventId) {
		// TODO Auto-generated method stub
		golfEventPlayerRepository.deleteByEventId(eventId);
	}

	public void saveAllPlayerGroups(List<PlayerGroupDTO> playerGroups,Long eventId) {
		// TODO Auto-generated method stub
		playerGroupingRepository.saveAllPlayerGroupings(playerGroups,eventId);
	}
	
	
	
	

}
