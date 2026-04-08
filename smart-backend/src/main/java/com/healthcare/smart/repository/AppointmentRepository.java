package com.healthcare.smart.repository;

import com.healthcare.smart.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // This allows Spring to automatically check the MySQL table for duplicates
    boolean existsByDoctorNameAndDateTime(String doctorName, LocalDateTime dateTime);
}