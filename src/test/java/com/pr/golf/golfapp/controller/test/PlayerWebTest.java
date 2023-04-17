package com.pr.golf.golfapp.controller.test;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.pr.golf.golfapp.controller.PlayerController;
import com.pr.golf.golfapp.model.Player;

import reactor.core.publisher.Flux;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PlayerWebTest {

    @LocalServerPort
    private int port;

    @Autowired
    private PlayerController playerController;

    @Test
    public void testPlayerCreation() {
       UriComponents uri = UriComponentsBuilder.newInstance()
                        .port(port)
                        .host("127.0.0.1").port(port).build();

       System.out.print("here");
        Flux<Player> returnedPlayer =  WebTestClient
                .bindToController(playerController)
                .build()
                .post()
                .uri(uri.toString()+"/players")
                .bodyValue(Player.builder().name("Player 1").build())
                .exchange()
                .expectStatus().isCreated()
                .expectHeader().valueEquals("Content-Type", "application/json")
                .expectAll(jsonBodySpec -> {
                        jsonBodySpec.expectBody().jsonPath("name").isEqualTo("Player 1");
                    }, responseSpec -> {
                    responseSpec.expectBody(List.class).value(playerList -> {
                    	((Player)playerList.get(0)).getId().equals("Player 1");
                    });
                }).returnResult(Player.class).getResponseBody();

        System.out.println("Got here");
        System.out.println(returnedPlayer.blockFirst().getName());

        Assertions.assertTrue(returnedPlayer.blockFirst().getName().equals("Player 1"));

    }
}
