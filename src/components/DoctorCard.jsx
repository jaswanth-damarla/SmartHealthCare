import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DoctorCard = ({ doctor, onViewAvailability }) => {
  const getNextAvailableSlot = () => {
    const today = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const dayName = daysOfWeek[checkDate.getDay()];
      
      const daySlots = doctor.availableSlots.find(slot => slot.day === dayName);
      if (daySlots && daySlots.times.length > 0) {
        return {
          day: dayName,
          time: daySlots.times[0],
          date: checkDate.toLocaleDateString()
        };
      }
    }
    return null;
  };

  const nextSlot = getNextAvailableSlot();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl overflow-hidden transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#0F4C75]/10 to-[#FF6B6B]/10 -z-10 group-hover:scale-110 transition-transform duration-500" />
      
      <div className="p-8">
        <div className="flex items-start gap-6 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F4C75] to-[#FF6B6B] rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md relative z-10"
            />
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md z-20">
               <Star className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D]" />
            </div>
          </div>
          
          <div className="flex-1 pt-2">
            <h3 className="text-xl font-bold text-[#0F4C75] mb-1 group-hover:text-[#FF6B6B] transition-colors">{doctor.name}</h3>
            <p className="text-[#3282B8] font-semibold text-sm mb-2">{doctor.specialty}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-bold text-gray-900">{doctor.rating}</span>
              <span>•</span>
              <span>{doctor.experience} years exp.</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">{doctor.bio}</p>

        {nextSlot && (
          <div className="bg-white/50 border border-gray-100 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-[#0F4C75]/10 rounded-lg">
                <Calendar className="w-4 h-4 text-[#0F4C75]" />
              </div>
              <span className="text-gray-700">
                <span className="font-semibold block text-[#0F4C75]">Next available</span>
                {nextSlot.day} at {nextSlot.time}
              </span>
            </div>
          </div>
        )}

        <Button
          onClick={() => onViewAvailability(doctor)}
          variant="premium-primary"
          className="w-full gap-2"
        >
          <Clock className="w-4 h-4" />
          View Availability
        </Button>
      </div>
    </motion.div>
  );
};

export default DoctorCard;