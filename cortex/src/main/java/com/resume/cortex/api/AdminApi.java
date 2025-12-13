package com.resume.cortex.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resume.cortex.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminApi {

    private final UserService service;

    public AdminApi(UserService service) {
        this.service = service;
    }

    @GetMapping("")
    public ResponseEntity<?> getUsers() {
        try {
            return ResponseEntity.ok(service.findAllUsers());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while fetching users.");
        }
    }
}
