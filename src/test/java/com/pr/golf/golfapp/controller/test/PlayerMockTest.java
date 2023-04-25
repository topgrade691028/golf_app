package com.pr.golf.golfapp.controller.test;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.assertj.core.util.Lists;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.pr.golf.golfapp.controller.PlayerController;
import com.pr.golf.golfapp.model.Player;
import com.pr.golf.golfapp.repository.PlayerRepository;

@WebMvcTest(PlayerController.class)
public class PlayerMockTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PlayerRepository service;

    @Test
    public void greetingShouldReturnMessageFromService() throws Exception {
        Player player = Player.builder().id(1l).name("Player 1").build();
        List<Player> players = Lists.newArrayList(player);
        when(service.save(players)).thenReturn(players);
        this.mockMvc.perform(post("/players")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("Player 1")));
    }
}