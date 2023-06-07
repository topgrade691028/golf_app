package com.pr.golf.golfapp.controller.test;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.pr.golf.golfapp.controller.PlayerController;

@SpringBootTest
public class SmokeTest {

    @Autowired
    private PlayerController playerController;

    @Test
    public void contextLoads() throws Exception {
        Assertions.assertThat(playerController).isNotNull();
    }
}