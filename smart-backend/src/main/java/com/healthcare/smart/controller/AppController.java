package com.healthcare.smart.controller;

import com.healthcare.smart.model.Appointment;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class AppController {

    @PostMapping("/book")
    public ResponseEntity<?> book(@RequestBody Appointment app) {
        // --- XSS PROTECTION: Sanitize the Notes field ---
        if (app.getNotes() != null) {
            // Removes any <script>, <iframe> or HTML tags to prevent XSS attacks
            String cleanNotes = Jsoup.clean(app.getNotes(), Safelist.none());
            app.setNotes(cleanNotes);
        }

        // Logic for saving would go here
        return ResponseEntity.ok(Map.of(
            "message", "Booking received safely for " + app.getPatientName(),
            "status", "success"
        ));
    }
}