package com.healthcare.smart.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password; // Will be null for Social Login users

    private String provider; // "LOCAL", "GOOGLE", or "APPLE"
    
    private String providerId; // Unique ID from Google/Apple

    // Inside User.java
    private String picture;

    // Inside User.java
private boolean enabled = false; 
private String verificationCode;

// Getters and Setters (Lombok @Data handles this)

    // Add getter and setter
    public String getPicture() { return picture; }
    public void setPicture(String picture) { this.picture = picture; }
}