package com.pr.golf.golfapp.utility;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonMapper<T> {

    private final Class<T> clazz;
    private final ObjectMapper objectMapper;

    public JsonMapper(Class<T> clazz) {
        this.clazz = clazz;
        this.objectMapper = new ObjectMapper();
    }
    
    public T getObject(String fileName) throws IOException {
        return objectMapper.readValue(new File(fileName + ".json"), clazz);
    }
    
    public List<T> getObjectList(File[] files) throws IOException {
        List<T> objectList = new ArrayList<>();
        for (File file : files) {
            T object = objectMapper.readValue(file, clazz);
            objectList.add(object);
        }
        System.out.print("calling ");
        return objectList;
    }
    
    public void postObjectList(String url, List<T> objectList) throws IOException {
        WebClient webClient = WebClient.create(url);

        webClient.post()
                .uri("")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(objectList))
                .retrieve()
                .bodyToMono(Void.class)
                .block();
    }
}
