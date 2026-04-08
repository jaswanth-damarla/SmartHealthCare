package com.healthcare.smart.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "appointment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String patientName;
    private String doctorName;
    private String department;

    // This tells Spring Boot exactly how to parse the React date string
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateTime;

    // Inside Appointment.java
private String status = "Confirmed"; // Default to Confirmed for now

// Getter and Setter (or let Lombok handle it)
public String getStatus() { return status; }
public void setStatus(String status) { this.status = status; }
}