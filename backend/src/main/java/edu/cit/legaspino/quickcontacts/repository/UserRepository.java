package edu.cit.legaspino.quickcontacts.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.cit.legaspino.quickcontacts.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    
    Boolean existsByUsername(String username); 
    
    Boolean existsByEmail(String email);
}