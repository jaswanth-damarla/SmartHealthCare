import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, X, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AppointmentCard = ({ appointment, doctor, onCancel, onReschedule }) => {
  const appointmentDate = new Date(appointment.date);
  const isPast = appointmentDate < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="p-8">
        <div className="flex items-start gap-5 mb-6">
          {doctor && (
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-sm opacity-30" />
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md relative z-10"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#0F4C75] mb-1">
              {doctor?.name || 'Doctor'}
            </h3>
            <p className="text-[#FF6B6B] text-sm font-semibold">
              {doctor?.specialty || appointment.specialty}
            </p>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${
            isPast
              ? 'bg-gray-100 text-gray-500 border border-gray-200'
              : 'bg-green-50 text-green-600 border border-green-200'
          }`}>
            {isPast ? 'Completed' : 'Upcoming'}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <Calendar className="w-5 h-5 text-[#0F4C75]" />
            <span className="text-sm font-medium text-gray-700">
              {appointmentDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <Clock className="w-5 h-5 text-[#0F4C75]" />
            <span className="text-sm font-medium text-gray-700">{appointment.time}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <User className="w-5 h-5 text-[#0F4C75]" />
            <span className="text-sm font-medium text-gray-700">{appointment.patientName}</span>
          </div>
        </div>

        {appointment.notes && (
          <div className="bg-[#FFF9F0] border border-[#FFD93D]/30 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-[#F4C430] block mb-1">Notes:</span> {appointment.notes}
            </p>
          </div>
        )}

        {!isPast && (
          <div className="flex gap-3">
            <Button
              onClick={() => onReschedule(appointment)}
              variant="outline"
              className="flex-1 border-[#0F4C75] text-[#0F4C75] hover:bg-[#0F4C75] hover:text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Reschedule
            </Button>
            <Button
              onClick={() => onCancel(appointment.id)}
              variant="outline"
              className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AppointmentCard;