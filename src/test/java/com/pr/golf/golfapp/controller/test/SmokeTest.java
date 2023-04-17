package com.pr.golf.golfapp.controller.test;

import static org.assertj.core.api.Assertions.assertThat;

import com.pr.golf.golfapp.controller.PlayerController;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SmokeTest {

    @Autowired
    private PlayerController playerController;

    @Test
    public void contextLoads() throws Exception {
        Assertions.assertThat(playerController).isNotNull();
    }
}