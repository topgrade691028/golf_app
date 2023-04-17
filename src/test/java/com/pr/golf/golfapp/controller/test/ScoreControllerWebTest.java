package com.pr.golf.golfapp.controller.test;

import com.pr.golf.golfapp.GolfAppApplication;
import com.pr.golf.golfapp.controller.ScoreController;
import com.pr.golf.golfapp.model.Score;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Flux;

@SpringBootTest(classes = GolfAppApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ScoreControllerWebTest {

    @LocalServerPort
    private int port;

    @Autowired
    private ScoreController scoreController;

    @Test
    public void testPlayerCreation() {
       UriComponents uri = UriComponentsBuilder.newInstance()
                        .port(port)
                        .host("127.0.0.1").port(port).build();

       System.out.print("here");
        Flux<Score> returnedScore =  WebTestClient
                .bindToController(scoreController)
                .build()
                .post()
                .uri(uri.toString()+"/scores")
                .bodyValue(Score.builder().id(1l).build())
                .exchange()
                .expectStatus().isCreated()
                .expectHeader().valueEquals("Content-Type", "application/json")
                .expectAll(jsonBodySpec -> {
                        jsonBodySpec.expectBody().jsonPath("name").isEqualTo("Score 1");
                    }, responseSpec -> {
                    responseSpec.expectBody(Score.class).value(score -> {
                        Assertions.assertTrue(score.getId() == 1l);
                    });
                }).returnResult(Score.class).getResponseBody();

        System.out.println("Got here");
        System.out.println(returnedScore.blockFirst().getId());

        Assertions.assertTrue(returnedScore.blockFirst().getId() == (1l));

    }
}
