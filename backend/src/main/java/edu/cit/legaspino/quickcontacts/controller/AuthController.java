package edu.cit.legaspino.quickcontacts.controller;

import edu.cit.legaspino.quickcontacts.model.User;
import edu.cit.legaspino.quickcontacts.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if(userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists!"));
        }
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Registration Successful!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        User user = userRepository.findByEmail(request.get("email")).orElse(null);
        if (user != null && encoder.matches(request.get("password"), user.getPassword())) {
            return ResponseEntity.ok(Map.of("username", user.getUsername()));
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }
}