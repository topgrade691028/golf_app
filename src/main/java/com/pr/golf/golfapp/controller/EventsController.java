package com.pr.golf.golfapp.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pr.golf.golfapp.model.Event;
import com.pr.golf.golfapp.model.GolfEvent;
import com.pr.golf.golfapp.repository.EventRepository;

@RestController
@RequestMapping("/events")
public class EventsController {

    private EventRepository eventRepository;

	public EventsController(@Autowired EventRepository eventRepository ) {
		this.eventRepository = eventRepository;
	}

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    
    @GetMapping("/competition/{id}")
    public List<Event> getEvents(@PathVariable Long competitionId) {
        return eventRepository.findByCompetitionId(competitionId).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody GolfEvent event) throws URISyntaxException {
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.created(new URI("/events/" + savedEvent.getId())).body(savedEvent);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateEvent(@PathVariable Long id, @RequestBody GolfEvent event) {
        Event currentEvent = eventRepository.findById(id).orElseThrow(RuntimeException::new);
        Event newEvent = GolfEvent.builder()
        						.name(event.getName())
        						.venue(event.getVenue())
        						.date(event.getDate())
        						.build();
        currentEvent = eventRepository.save(currentEvent);

        return ResponseEntity.ok(currentEvent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
