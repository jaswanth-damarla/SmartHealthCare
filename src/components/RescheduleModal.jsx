import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

const RescheduleModal = ({ appointment, doctor, onClose, onReschedule }) => {
  const { isSlotBooked } = useApp();
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleReschedule = () => {
    if (selectedDay && selectedTime) {
      const today = new Date();
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const targetDayIndex = daysOfWeek.indexOf(selectedDay);
      const currentDayIndex = today.getDay();
      
      let daysToAdd = targetDayIndex - currentDayIndex;
      if (daysToAdd <= 0) daysToAdd += 7;
      
      const appointmentDate = new Date(today);
      appointmentDate.setDate(today.getDate() + daysToAdd);

      onReschedule(appointment.id, appointmentDate.toISOString().split('T')[0], selectedTime);
      onClose();
    }
  };

  const selectedDaySlots = doctor?.availableSlots.find(slot => slot.day === selectedDay);

  const getAppointmentDate = (dayName) => {
    const today = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDayIndex = daysOfWeek.indexOf(dayName);
    const currentDayIndex = today.getDay();
    
    let daysToAdd = targetDayIndex - currentDayIndex;
    if (daysToAdd <= 0) daysToAdd += 7;
    
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() + daysToAdd);
    return appointmentDate.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
      >
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-8 flex justify-between items-center z-10">
          <div>
             <h2 className="text-2xl font-black text-[#0F4C75]">Reschedule Appointment</h2>
             <p className="text-gray-500 mt-1 text-sm">Select a new date and time for your visit</p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-all duration-300"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#0F4C75] mb-5 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#FF6B6B]" />
              Select New Day
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {doctor?.availableSlots.map((slot) => (
                <button
                  key={slot.day}
                  onClick={() => {
                    setSelectedDay(slot.day);
                    setSelectedTime('');
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedDay === slot.day
                      ? 'border-[#0F4C75] bg-[#0F4C75] text-white shadow-lg scale-105'
                      : 'border-gray-100 hover:border-[#0F4C75]/50 bg-white text-gray-700 hover:shadow-md'
                  }`}
                >
                  <div className="font-bold">{slot.day}</div>
                  <div className={`text-xs mt-1 font-medium ${selectedDay === slot.day ? 'text-white/80' : 'text-gray-400'}`}>
                    {slot.times.length} slots
                  </div>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {selectedDay && (
              <motion.div
                key="times"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-[#0F4C75] mb-5 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#FF6B6B]" />
                  Available Time Slots
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedDaySlots?.times.map((time) => {
                    const appointmentDate = getAppointmentDate(selectedDay);
                    const slotBooked = isSlotBooked(doctor.id, appointmentDate, time) &&
                      !(appointment.date === appointmentDate && appointment.time === time);
                    
                    return (
                      <button
                        key={time}
                        onClick={() => !slotBooked && setSelectedTime(time)}
                        disabled={slotBooked}
                        className={`p-3 rounded-lg border-2 transition-all font-semibold text-sm ${
                          slotBooked
                            ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                            : selectedTime === time
                            ? 'border-[#FF6B6B] bg-[#FF6B6B] text-white shadow-md transform scale-105'
                            : 'border-gray-100 hover:border-[#FF6B6B] bg-white text-gray-700 hover:shadow-md hover:text-[#FF6B6B]'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReschedule}
              disabled={!selectedTime}
              variant="premium-primary"
              className="flex-1 h-12 shadow-xl hover:shadow-2xl"
            >
              Confirm Reschedule
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RescheduleModal;