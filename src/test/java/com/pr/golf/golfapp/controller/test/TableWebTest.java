package com.pr.golf.golfapp.controller.test;

import com.pr.golf.golfapp.GolfAppApplication;
import com.pr.golf.golfapp.controller.TableController;
import com.pr.golf.golfapp.model.EventLeaderBoard;
import com.pr.golf.golfapp.model.Player;
import com.pr.golf.golfapp.model.Table;
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
public class TableWebTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TableController tableController;

    @Test
    public void testTableCreation() {
       UriComponents uri = UriComponentsBuilder.newInstance()
                        .port(port)
                        .host("127.0.0.1").port(port).build();

       System.out.print("here");
        Flux<EventLeaderBoard> returnedTable =  WebTestClient
                .bindToController(tableController)
                .build()
                .post()
                .uri(uri.toString()+"/tables")
                .bodyValue(Player.builder().name("Player 1").build())
                .exchange()
                .expectStatus().isCreated()
                .expectHeader().valueEquals("Content-Type", "application/json")
                .expectAll(jsonBodySpec -> {
                        jsonBodySpec.expectBody().jsonPath("name").isEqualTo("Table 1");
                    }, responseSpec -> {
                    responseSpec.expectBody(Table.class).value(table -> {
                        Assertions.assertTrue(table.getTableId() == 1l);
                    });
                }).returnResult(EventLeaderBoard.class).getResponseBody();

        System.out.println("Got here");
        System.out.println(returnedTable.blockFirst().getTableId());

        Assertions.assertTrue(returnedTable.blockFirst().getTableId() == (1l));

    }
}
