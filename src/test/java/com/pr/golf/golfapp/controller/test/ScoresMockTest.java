package com.pr.golf.golfapp.controller.test;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.assertj.core.util.Lists;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.pr.golf.golfapp.controller.ScoreController;
import com.pr.golf.golfapp.model.Player;
import com.pr.golf.golfapp.model.Score;
import com.pr.golf.golfapp.repository.ScoreRepository;


@WebMvcTest({ScoreController.class})
public class ScoresMockTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ScoreRepository service;

    @Test
    public void greetingShouldReturnMessageFromService() throws Exception {
        Score score = Score.builder().id(1l).player(Player.builder().id(1l).build()).build();
        when(service.saveAll(Lists.newArrayList(score))).thenReturn(Lists.newArrayList(Score.builder().build()));
        this.mockMvc.perform(post("/scores")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("Player 1")));
    }
}