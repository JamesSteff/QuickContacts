package edu.cit.legaspino.quickcontacts.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.people.v1.PeopleService;
import com.google.api.services.people.v1.model.ListConnectionsResponse;
import com.google.api.services.people.v1.model.Person;

@Service
public class GoogleContactsService {

    public List<Person> getGoogleContacts(String accessToken) {
        try {
            final NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
            
            PeopleService service = new PeopleService.Builder(
                    httpTransport, 
                    GsonFactory.getDefaultInstance(), 
                    null) 
                    .setApplicationName("QuickContacts")
                    .build();

            ListConnectionsResponse response = service.people().connections()
                    .list("people/me")
                    .setPersonFields("names,emailAddresses,phoneNumbers")
                    .setAccessToken(accessToken) 
                    .execute();

            List<Person> connections = response.getConnections();
            return (connections != null) ? connections : Collections.emptyList();
            
        } catch (GeneralSecurityException | IOException e) {
            System.err.println("Error fetching Google Contacts: " + e.getMessage());
            return Collections.emptyList();
        }
    }
}