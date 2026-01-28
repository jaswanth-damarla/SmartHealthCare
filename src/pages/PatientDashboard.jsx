import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import AppointmentCard from '@/components/AppointmentCard';
import RescheduleModal from '@/components/RescheduleModal';
import { useToast } from '@/components/ui/use-toast';

const PatientDashboard = () => {
  const { appointments, doctors, cancelAppointment, rescheduleAppointment } = useApp();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [rescheduleData, setRescheduleData] = useState(null);

  const userAppointments = appointments.filter(a => a.userId === currentUser.id);

  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    return {
      upcoming: userAppointments
        .filter(a => new Date(a.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date)),
      past: userAppointments
        .filter(a => new Date(a.date) < now)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    };
  }, [userAppointments]);

  const nextAppointment = upcoming[0];
  const nextAppointmentDate = nextAppointment ? new Date(nextAppointment.date) : null;
  const daysUntilNext = nextAppointmentDate
    ? Math.ceil((nextAppointmentDate - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  const handleCancel = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointment(appointmentId);
      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been successfully cancelled.",
      });
    }
  };

  const handleReschedule = (appointment) => {
    const doctor = doctors.find(d => d.id === appointment.doctorId);
    setRescheduleData({ appointment, doctor });
  };

  const handleRescheduleConfirm = (appointmentId, newDate, newTime) => {
    rescheduleAppointment(appointmentId, newDate, newTime);
    toast({
      title: "Appointment Rescheduled",
      description: "Your appointment has been successfully rescheduled.",
    });
    setRescheduleData(null);
  };

  return (
    <>
      <Helmet>
        <title>My Dashboard | HealthCare+</title>
        <meta name="description" content="Manage your appointments and view your healthcare dashboard." />
      </Helmet>

      <div className="min-h-screen bg-[#F8F9FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-black text-[#0F4C75] mb-4 tracking-tight">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-xl text-gray-600">
              Manage your appointments and track your health journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 perspective-1000">
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-[#0F4C75] to-[#3282B8] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full transition-transform group-hover:scale-110" />
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Calendar className="w-8 h-8" />
                </div>
                <TrendingUp className="w-6 h-6 opacity-50" />
              </div>
              <p className="text-5xl font-black mb-2 relative z-10">{upcoming.length}</p>
              <p className="text-white/80 font-medium relative z-10">Upcoming Appointments</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full transition-transform group-hover:scale-110" />
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Clock className="w-8 h-8" />
                </div>
                <TrendingUp className="w-6 h-6 opacity-50" />
              </div>
              <p className="text-5xl font-black mb-2 relative z-10">
                {daysUntilNext !== null ? daysUntilNext : '-'}
              </p>
              <p className="text-white/80 font-medium relative z-10">
                {daysUntilNext === 0 ? 'Today' : daysUntilNext === 1 ? 'Tomorrow' : 'Days until next'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-[#FFD93D] to-[#FFED99] text-[#0F4C75] rounded-3xl p-8 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-bl-full transition-transform group-hover:scale-110" />
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="p-3 bg-white/40 rounded-xl">
                  <Calendar className="w-8 h-8" />
                </div>
                <TrendingUp className="w-6 h-6 opacity-50" />
              </div>
              <p className="text-5xl font-black mb-2 relative z-10">{userAppointments.length}</p>
              <p className="opacity-80 font-bold relative z-10">Total Appointments</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-[#0F4C75] mb-8 flex items-center gap-3">
              <span className="w-2 h-10 bg-[#FF6B6B] rounded-full"></span>
              Upcoming Appointments
            </h2>
            {upcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcoming.map((appointment) => {
                  const doctor = doctors.find(d => d.id === appointment.doctorId);
                  return (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      doctor={doctor}
                      onCancel={handleCancel}
                      onReschedule={handleReschedule}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] shadow-sm p-16 text-center border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-gray-300" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">No upcoming appointments</p>
                <p className="text-gray-500 mb-8">Book your next appointment to get started with your health journey</p>
              </div>
            )}
          </motion.div>

          {past.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-[#0F4C75] mb-8 flex items-center gap-3">
                <span className="w-2 h-10 bg-gray-300 rounded-full"></span>
                Past Appointments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {past.map((appointment) => {
                  const doctor = doctors.find(d => d.id === appointment.doctorId);
                  return (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      doctor={doctor}
                      onCancel={handleCancel}
                      onReschedule={handleReschedule}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {rescheduleData && (
          <RescheduleModal
            appointment={rescheduleData.appointment}
            doctor={rescheduleData.doctor}
            onClose={() => setRescheduleData(null)}
            onReschedule={handleRescheduleConfirm}
          />
        )}
      </div>
    </>
  );
};

export default PatientDashboard;