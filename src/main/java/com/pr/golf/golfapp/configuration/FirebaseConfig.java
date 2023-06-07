package com.pr.golf.golfapp.configuration;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;

@Configuration
public class FirebaseConfig {

  @Bean
  public FirebaseAuth firebaseAuth(@Autowired WebSecurity webSecurity) throws IOException {
    FileInputStream serviceAccount = new FileInputStream("D:/irish/serviceAccount.json");

    FirebaseOptions options = new FirebaseOptions.Builder()
      .setCredentials(GoogleCredentials.fromStream(serviceAccount))
      .build();

    FirebaseApp.initializeApp(options);

    return FirebaseAuth.getInstance();
  }

  //@Bean
  //public FirebaseAuthenticationFilter firebaseAuthenticationFilter(FirebaseAuth firebaseAuth) {
  //  return new FirebaseAuthenticationFilter(firebaseAuth);
 // }

}
