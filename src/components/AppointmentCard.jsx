import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, X, Edit, CheckCircle2, Clock3, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AppointmentCard = ({ appointment, doctor, onCancel, onReschedule }) => {
  const appointmentDate = new Date(appointment.dateTime);
  const isPast = appointmentDate < new Date();

  const timeString = appointmentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // --- NEW: STATUS BADGE LOGIC ---
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return {
          bg: 'bg-green-50',
          text: 'text-green-600',
          border: 'border-green-200',
          icon: <CheckCircle2 className="w-3 h-3" />,
          label: 'Confirmed'
        };
      case 'pending':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-600',
          border: 'border-amber-200',
          icon: <Clock3 className="w-3 h-3" />,
          label: 'Pending'
        };
      case 'cancelled':
        return {
          bg: 'bg-red-50',
          text: 'text-red-600',
          border: 'border-red-200',
          icon: <AlertCircle className="w-3 h-3" />,
          label: 'Cancelled'
        };
      default:
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
          icon: <CheckCircle2 className="w-3 h-3" />,
          label: 'Scheduled'
        };
    }
  };

  const statusConfig = getStatusConfig(appointment.status || 'confirmed');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-4">
            {doctor && (
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md relative z-10"
                />
              </div>
            )}
            <div>
              <h3 className="text-lg font-black text-[#0F4C75] leading-tight">
                {doctor?.name || appointment.doctorName}
              </h3>
              <p className="text-[#FF6B6B] text-xs font-bold uppercase tracking-wider mt-1">
                {doctor?.specialty || appointment.department}
              </p>
            </div>
          </div>

          {/* DYNAMIC STATUS BADGE */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
            {statusConfig.icon}
            {statusConfig.label}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
            <Calendar className="w-4 h-4 text-[#0F4C75]" />
            <span className="text-sm font-bold text-gray-700">
              {appointmentDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
            <Clock className="w-4 h-4 text-[#0F4C75]" />
            <span className="text-sm font-bold text-gray-700">{timeString}</span>
          </div>
        </div>

        {appointment.notes && (
          <div className="bg-blue-50/30 border border-blue-100 rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-600 leading-relaxed italic">
              <span className="font-bold text-[#0F4C75] not-italic mr-1">Note:</span> 
              {appointment.notes}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          {!isPast && appointment.status?.toLowerCase() !== 'cancelled' ? (
            <div className="flex gap-2 w-full">
              <Button
                onClick={() => onReschedule(appointment)}
                variant="outline"
                className="flex-1 h-11 border-[#0F4C75] text-[#0F4C75] hover:bg-[#0F4C75] hover:text-white font-bold text-xs"
              >
                <Edit className="w-3.5 h-3.5 mr-2" />
                Reschedule
              </Button>
              <Button
                onClick={() => onCancel(appointment.id)}
                variant="outline"
                className="flex-1 h-11 border-red-200 text-red-500 hover:bg-red-500 hover:text-white font-bold text-xs"
              >
                <X className="w-3.5 h-3.5 mr-2" />
                Cancel
              </Button>
            </div>
          ) : (
            <div className="w-full text-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {isPast ? 'Session Completed' : 'Appointment Cancelled'}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AppointmentCard;