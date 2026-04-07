package edu.cit.legaspino.quickcontacts;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import edu.cit.legaspino.quickcontacts.model.User;
import edu.cit.legaspino.quickcontacts.service.UserFactory;

@SpringBootApplication
public class QuickcontactsApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuickcontactsApplication.class, args);
    }

    @Bean
    CommandLineRunner init() {
        return args -> {
            
            User demoUser = UserFactory.createUser(
                "stefan_dev", 
                "stefan@example.com", 
                "securePassword123", 
                "James Stefan"
            );
            
            System.out.println("\n-------------------------------------------");
            System.out.println("DESIGN PATTERN LOG: Factory Method Pattern");
            System.out.println("Successfully created User: " + demoUser.getUsername());
            System.out.println("-------------------------------------------\n");
        };
    }
}