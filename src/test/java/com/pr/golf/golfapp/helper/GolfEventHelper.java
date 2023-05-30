package com.pr.golf.golfapp.helper;


import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.pr.golf.golfapp.controller.EventsController;
import com.pr.golf.golfapp.model.Event;
import com.pr.golf.golfapp.model.GolfEvent;


public class GolfEventHelper {
	
	
	public static List<Event> addEvents(List<Event> eventsList, EventsController eventsController, int port) {
	     UriComponents uri = UriComponentsBuilder.newInstance()
                   .port(port)
                   .host("127.0.0.1").port(port).build();

		 eventsList.forEach( event -> {
			
			List<Event> events =  (List<Event>) WebTestClient
	                .bindToController(eventsController)
	                .build().mutate().responseTimeout(Duration.of(36000l, ChronoUnit.MILLIS)).build()
	                .post()
	                .uri(uri.toString()+ "/events")
	                .bodyValue(event)
	                .exchange()
	                .expectStatus().isCreated()
	                .expectHeader().valueEquals("Content-Type", "application/json")
	                .expectAll(jsonBodySpec -> {
	                   // jsonBodySpec.expectBody().jsonPath("id").isEqualTo(1l);
	                }, responseSpec -> {
	                    responseSpec.expectBodyList(GolfEvent.class)
	                    .consumeWith(result -> {
	                        List<GolfEvent> responseBody = result.getResponseBody();
							System.out.println("Expected responseBody "+ responseBody);
	                      });
	                    
	                }).expectBodyList(Event.class).returnResult().getResponseBody();
		});
		 return eventsList;
	}

}
