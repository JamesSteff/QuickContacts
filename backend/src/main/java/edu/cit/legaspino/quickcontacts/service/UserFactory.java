package edu.cit.legaspino.quickcontacts.service;

import edu.cit.legaspino.quickcontacts.model.User;

/**
 * Factory Method Pattern implementation for User creation.
 */
public class UserFactory {

    public static User createUser(String username, String email, String password, String firstName) {
        User user = new User();
        
        
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setFirstName(firstName);
        
        return user;
    }
}