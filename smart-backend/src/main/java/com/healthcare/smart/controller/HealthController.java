package com.healthcare.smart.controller;

import com.healthcare.smart.model.Appointment;
import com.healthcare.smart.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*") 
public class HealthController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping("/status")
    public Map<String, String> getStatus() {
        return Map.of("status", "Online", "database", "Connected");
    }

    // 1. Fetch all appointments
    @GetMapping("/appointments")
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // 2. Book an appointment with Conflict Check
    @PostMapping("/appointments/book")
    public ResponseEntity<?> book(@RequestBody Appointment appointment) {
        boolean isTaken = appointmentRepository.existsByDoctorNameAndDateTime(
            appointment.getDoctorName(), 
            appointment.getDateTime()
        );

        if (isTaken) {
            return ResponseEntity.badRequest().body(Map.of("message", "This slot is already booked!"));
        }

        return ResponseEntity.ok(appointmentRepository.save(appointment));
    }

    // 3. Reschedule an appointment (Update)
    @PutMapping("/appointments/{id}")
    public ResponseEntity<?> reschedule(@PathVariable Long id, @RequestBody Map<String, String> updates) {
        return appointmentRepository.findById(id).map(app -> {
            try {
                // Using a formatter ensures we can handle different ISO formats from React
                String newDateTimeStr = updates.get("dateTime");
                if (newDateTimeStr != null) {
                    app.setDateTime(LocalDateTime.parse(newDateTimeStr));
                    appointmentRepository.save(app);
                    return ResponseEntity.ok(Map.of("message", "Rescheduled successfully"));
                }
                return ResponseEntity.badRequest().body(Map.of("message", "Date time is missing"));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid date format"));
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4. Cancel an appointment (Delete)
    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id) {
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Appointment cancelled successfully"));
        }
        return ResponseEntity.notFound().build();
    }
}