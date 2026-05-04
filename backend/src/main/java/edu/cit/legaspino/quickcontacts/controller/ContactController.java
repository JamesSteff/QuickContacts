package edu.cit.legaspino.quickcontacts.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.services.people.v1.model.Person;

import edu.cit.legaspino.quickcontacts.model.Contact;
import edu.cit.legaspino.quickcontacts.repository.ContactRepository;
import edu.cit.legaspino.quickcontacts.service.GoogleContactsService; 

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") 
public class ContactController {

    @Autowired
    private GoogleContactsService googleContactsService;

    @Autowired
    private ContactRepository contactRepository; 

    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        return ResponseEntity.ok(contactRepository.findAll());
    }

    @GetMapping("/sync")
    public ResponseEntity<?> syncContacts(@RegisteredOAuth2AuthorizedClient("google") OAuth2AuthorizedClient authorizedClient) {
        
        if (authorizedClient == null) {
            return ResponseEntity.status(401).body("Error: Client authorization failed. Please log in again.");
        }

        try {
            String token = authorizedClient.getAccessToken().getTokenValue();
            List<Person> contacts = googleContactsService.getGoogleContacts(token);
            
            if (contacts != null) {
                for (Person person : contacts) {
                    String email = "";
                    if (person.getEmailAddresses() != null && !person.getEmailAddresses().isEmpty()) {
                        email = person.getEmailAddresses().get(0).getValue();
                    }

                    
                    Optional<Contact> existingContact = Optional.empty();
                    if (!email.isEmpty()) {
                        existingContact = contactRepository.findByEmail(email);
                    }

                    if (existingContact.isPresent()) {
                        
                        Contact toUpdate = existingContact.get();
                        if (person.getNames() != null && !person.getNames().isEmpty()) {
                            toUpdate.setFullName(person.getNames().get(0).getDisplayName());
                        }
                        if (person.getPhoneNumbers() != null && !person.getPhoneNumbers().isEmpty()) {
                            toUpdate.setPhoneNumber(person.getPhoneNumbers().get(0).getValue());
                        }
                        contactRepository.save(toUpdate);
                    } else {
                        // INSERT: Kung bag-o pa nga contact
                        Contact newContact = new Contact();
                        if (person.getNames() != null && !person.getNames().isEmpty()) {
                            newContact.setFullName(person.getNames().get(0).getDisplayName());
                        } else {
                            newContact.setFullName(email.isEmpty() ? "Unknown Google Contact" : email);
                        }
                        newContact.setEmail(email);
                        if (person.getPhoneNumbers() != null && !person.getPhoneNumbers().isEmpty()) {
                            newContact.setPhoneNumber(person.getPhoneNumbers().get(0).getValue());
                        }
                        contactRepository.save(newContact);
                    }
                }
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(URI.create("http://localhost:3000/dashboard"));
            return new ResponseEntity<>(headers, HttpStatus.SEE_OTHER);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching contacts: " + e.getMessage());
        }
    }
}