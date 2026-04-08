package com.healthcare.smart.controller;

import com.healthcare.smart.model.User;
import com.healthcare.smart.repository.UserRepository;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists!"));
        }
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        String otp = String.format("%06d", new Random().nextInt(999999));
        user.setProvider("LOCAL");
        user.setEnabled(false); 
        user.setVerificationCode(otp);
        userRepository.save(user);
        sendEmail(user.getEmail(), otp, "Verify your Account");
        return ResponseEntity.ok(Map.of("message", "OTP sent to your email."));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");
        return userRepository.findByEmail(email)
            .map(user -> {
                if (user.getVerificationCode() != null && user.getVerificationCode().equals(code)) {
                    user.setEnabled(true);
                    user.setVerificationCode(null); 
                    userRepository.save(user);
                    return ResponseEntity.ok(Map.of("message", "Verification successful!", "user", user));
                }
                return ResponseEntity.status(400).body(Map.of("message", "Invalid code."));
            })
            .orElse(ResponseEntity.status(404).body(Map.of("message", "User not found.")));
    }

    // --- NEW: FORGOT PASSWORD ENDPOINT ---
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        return userRepository.findByEmail(email).map(user -> {
            String otp = String.format("%06d", new Random().nextInt(999999));
            user.setVerificationCode(otp);
            userRepository.save(user);
            sendEmail(user.getEmail(), otp, "Password Reset Code");
            return ResponseEntity.ok(Map.of("message", "Reset code sent to your email."));
        }).orElse(ResponseEntity.status(404).body(Map.of("message", "Email not found.")));
    }

    // --- NEW: RESET PASSWORD ENDPOINT ---
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");
        String newPassword = request.get("newPassword");

        return userRepository.findByEmail(email).map(user -> {
            if (user.getVerificationCode() != null && user.getVerificationCode().equals(code)) {
                user.setPassword(passwordEncoder.encode(newPassword));
                user.setVerificationCode(null);
                userRepository.save(user);
                return ResponseEntity.ok(Map.of("message", "Password updated successfully!"));
            }
            return ResponseEntity.status(400).body(Map.of("message", "Invalid reset code."));
        }).orElse(ResponseEntity.status(404).body(Map.of("message", "User not found.")));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String rawPassword = credentials.get("password");
        return userRepository.findByEmail(email)
            .map(user -> {
                if (user.getPassword() != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
                    if (!user.isEnabled()) {
                        return ResponseEntity.status(403).body(Map.of("message", "Please verify your email first."));
                    }
                    return ResponseEntity.ok(user);
                }
                return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
            })
            .orElse(ResponseEntity.status(401).body(Map.of("message", "Invalid credentials")));
    }

    private void sendEmail(String to, String otp, String subject) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(new InternetAddress("jaswanth.damarla1@gmail.com", "Smart HealthCare Support"));
            helper.setTo(to);
            helper.setSubject(subject);

            String htmlContent = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;'>" +
                    "<h2 style='color: #0F4C75;'>HealthCare+ Security</h2>" +
                    "<p style='color: #555;'>Your requested code is below:</p>" +
                    "<div style='background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;'>" +
                    "<span style='font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #FF6B6B;'>" + otp + "</span>" +
                    "</div>" +
                    "</div>";
            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (Exception e) { e.printStackTrace(); }
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody User googleUser) {
        return userRepository.findByEmail(googleUser.getEmail())
            .map(existingUser -> {
                existingUser.setProvider("GOOGLE");
                existingUser.setProviderId(googleUser.getProviderId());
                existingUser.setEnabled(true); 
                if (googleUser.getPicture() != null) existingUser.setPicture(googleUser.getPicture());
                return ResponseEntity.ok(userRepository.save(existingUser));
            })
            .orElseGet(() -> {
                googleUser.setProvider("GOOGLE");
                googleUser.setEnabled(true);
                return ResponseEntity.ok(userRepository.save(googleUser));
            });
    }
}