import React, { createContext, useContext, useState, useEffect } from 'react';
import { doctors as initialDoctors, specialties, symptoms } from '@/data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [bookedSlots, setBookedSlots] = useState({});

  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    const savedBookedSlots = localStorage.getItem('bookedSlots');
    
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
    if (savedBookedSlots) {
      setBookedSlots(JSON.parse(savedBookedSlots));
    }
  }, []);

  const createAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    const slotKey = `${appointmentData.doctorId}-${appointmentData.date}-${appointmentData.time}`;
    const updatedBookedSlots = { ...bookedSlots, [slotKey]: true };
    setBookedSlots(updatedBookedSlots);
    localStorage.setItem('bookedSlots', JSON.stringify(updatedBookedSlots));

    return newAppointment;
  };

  const cancelAppointment = (appointmentId) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
      const slotKey = `${appointment.doctorId}-${appointment.date}-${appointment.time}`;
      const updatedBookedSlots = { ...bookedSlots };
      delete updatedBookedSlots[slotKey];
      setBookedSlots(updatedBookedSlots);
      localStorage.setItem('bookedSlots', JSON.stringify(updatedBookedSlots));
    }

    const updatedAppointments = appointments.filter(a => a.id !== appointmentId);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const rescheduleAppointment = (appointmentId, newDate, newTime) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
      const oldSlotKey = `${appointment.doctorId}-${appointment.date}-${appointment.time}`;
      const newSlotKey = `${appointment.doctorId}-${newDate}-${newTime}`;
      
      const updatedBookedSlots = { ...bookedSlots };
      delete updatedBookedSlots[oldSlotKey];
      updatedBookedSlots[newSlotKey] = true;
      setBookedSlots(updatedBookedSlots);
      localStorage.setItem('bookedSlots', JSON.stringify(updatedBookedSlots));

      const updatedAppointments = appointments.map(a =>
        a.id === appointmentId
          ? { ...a, date: newDate, time: newTime }
          : a
      );
      setAppointments(updatedAppointments);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    }
  };

  const isSlotBooked = (doctorId, date, time) => {
    const slotKey = `${doctorId}-${date}-${time}`;
    return !!bookedSlots[slotKey];
  };

  const getRecommendedSpecialties = (selectedSymptoms) => {
    const specialtyScores = {};

    selectedSymptoms.forEach(symptomId => {
      const symptom = symptoms.find(s => s.id === symptomId);
      if (symptom) {
        symptom.specialties.forEach(specialtyId => {
          specialtyScores[specialtyId] = (specialtyScores[specialtyId] || 0) + 1;
        });
      }
    });

    const recommendations = Object.entries(specialtyScores)
      .map(([specialtyId, score]) => {
        const specialty = specialties.find(s => s.id === parseInt(specialtyId));
        return {
          ...specialty,
          confidence: Math.min((score / selectedSymptoms.length) * 100, 100)
        };
      })
      .sort((a, b) => b.confidence - a.confidence);

    return recommendations;
  };

  const value = {
    appointments,
    doctors,
    specialties,
    symptoms,
    createAppointment,
    cancelAppointment,
    rescheduleAppointment,
    isSlotBooked,
    getRecommendedSpecialties
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};