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
import com.pr.golf.golfapp.configuration.properties.FirebaseConfigProperties;

@Configuration
public class FirebaseConfig {

	 @Autowired
	    private FirebaseConfigProperties configProperties;
	
  @Bean
  public FirebaseAuth firebaseAuth() throws IOException {
    //FileInputStream serviceAccount = new FileInputStream("D:/irish/serviceAccount.json");
    FileInputStream serviceAccount = new FileInputStream(configProperties.getServiceAccountPath());

    
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
