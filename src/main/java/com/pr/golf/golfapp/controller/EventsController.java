package com.pr.golf.golfapp.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pr.golf.golfapp.authorize.UserRoleAuthorizationChecker;
import com.pr.golf.golfapp.dto.GolfCourseDTO;
import com.pr.golf.golfapp.dto.GolfEventDTO;
import com.pr.golf.golfapp.dto.GroupPairingsRequest;
import com.pr.golf.golfapp.dto.PlayerDTO;
import com.pr.golf.golfapp.dto.PlayerGroupingDTO;
import com.pr.golf.golfapp.enums.GolfEventType;
import com.pr.golf.golfapp.service.GolfCourseService;
import com.pr.golf.golfapp.service.GolfEventService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/events")
@PreAuthorize("hasRole('MANAGER')")
public class EventsController {

    private GolfEventService golfEventService;
    
    private GolfCourseService golfCourseService;
    
    @Autowired
    private UserRoleAuthorizationChecker userRoleAuthorizationChecker;

	public EventsController(@Autowired GolfEventService golfEventService, 
								@Autowired GolfCourseService golfCourseService,
									@Autowired UserRoleAuthorizationChecker userRoleAuthorizationChecker) {
		this.golfEventService = golfEventService;
		this.golfCourseService = golfCourseService;
		this.userRoleAuthorizationChecker = userRoleAuthorizationChecker;
	}

    @GetMapping("/{id}")
    public GolfEventDTO getEvent(@PathVariable Long id) {
        return golfEventService.getGolfEventById(id).orElseThrow(RuntimeException::new);
    }
    
    @GetMapping("/competition/{competitionId}")
    public List<GolfEventDTO> getEventsByCompetitionId(@PathVariable Long competitionId) {
    	log.info("Retrieving events by " + competitionId);
        return golfEventService.findByCompetitionId(competitionId).orElseThrow(RuntimeException::new);
    }

    
    @GetMapping("/getPlayersForEvent/{eventId}")
    public List<PlayerDTO> getPlayersForEvent(@PathVariable Long eventId) {
    	System.out.print("Getting Players Registerd for event " + eventId);
    	return golfEventService.getPlayersRegisteredForEvent(eventId);
    }

    @GetMapping("/getplayergroups/{eventId}")
    public List<PlayerGroupingDTO> getPlayerGroupsForEvent(@PathVariable("eventId") Long eventId) {
    	System.out.print("Getting Player Groupings for event " + eventId);
    	return golfEventService.getPlayerDTOGroupsForEvent(eventId);
    }
    
    @GetMapping("/searchEvent/{name}")
    public GolfEventDTO getEventsByName(@PathVariable String name) {
        return golfEventService.findByEventName(name).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/search")
    public ResponseEntity<List<GolfEventDTO>> searchGolfEvents(@RequestParam String searchText, @RequestParam String searchType) {
        List<GolfEventDTO> golfEvents = golfEventService.searchGolfEvents(searchText, searchType);
        return ResponseEntity.ok(golfEvents);
    }
    
    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteGolfEvent(@PathVariable Long eventId) {
    	golfEventService.deleteById(eventId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deletePlayerFromEvent/{eventId}/{playerId}")
    public ResponseEntity<Void> deleteGolfEvent(@PathVariable Long eventId,@PathVariable Long playerId) {
    	golfEventService.removePlayerFromEvent(eventId, playerId);
        return ResponseEntity.noContent().build();
    }
  
    @GetMapping("/types")
   // @PreAuthorize("@userRoleAuthorizationChecker.hasManagerOrAdminRole(request.getHeader('Authorization'))")
    @PreAuthorize("#UserRoleAuthorizationChecker.test(request.getHeader('Authorization'))")  
    public List<GolfEventType> getGolfEventTypes(HttpServletRequest request){
        return Arrays.asList(GolfEventType.values());
    }
    
    @GetMapping("/courses")
    public List<GolfCourseDTO> getGolfCourses(){
    	
      return golfCourseService.findAllGolfCourses();
    }
    
    @PostMapping("/create")
    public ResponseEntity<GolfEventDTO> createEvent(@RequestBody GolfEventDTO event) throws URISyntaxException {
        GolfEventDTO savedEvent = golfEventService.save(event);
        return ResponseEntity.created(new URI("/events/" + savedEvent.getId())).body(savedEvent);
    }

    @PostMapping("/savegroupsforevent")
    public ResponseEntity<String> saveGroupsForEvent(@RequestBody GroupPairingsRequest request) {
        try {
          Long eventId = request.getEventId();

          // Delete existing group pairings for the event
          golfEventService.deleteGroupsByEventId(eventId);

          // Insert new group pairings
          golfEventService.saveAllPlayerGroups(request.getPlayerGroups(), eventId);

          return ResponseEntity.ok("Groups saved successfully");
        } catch (Exception e) {
          e.printStackTrace();
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving groups");
        }
      }
    
    @PutMapping("/updateEvent/{id}")
    public ResponseEntity updateEvent(@PathVariable Long id, @RequestBody GolfEventDTO event) {
        GolfEventDTO currentEvent = golfEventService.findById(id).orElseThrow(RuntimeException::new);
        GolfEventDTO eventDTO = GolfEventDTO.builder()
        						.id(currentEvent.getId())
        						.name(event.getName())
        						.venue(event.getVenue())
        						.date(event.getDate())
        						.competition(event.getCompetition())
        						.scores(event.getScores())
        						.players(event.getPlayers())
        						.build();
       golfEventService.save(eventDTO);

        return ResponseEntity.ok(event);
    }

}
