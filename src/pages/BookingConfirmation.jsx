import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

const BookingConfirmation = () => {
  const { doctorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { doctors, createAppointment } = useApp();
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    patientName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  const doctor = doctors.find(d => d.id === parseInt(doctorId));
  const { date, time } = location.state || {};

  if (!doctor || !date || !time) {
    navigate('/doctors');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const appointment = createAppointment({
        ...formData,
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        date,
        time,
        userId: currentUser.id
      });

      const reference = `HC-${Date.now().toString().slice(-8)}`;
      setBookingReference(reference);
      setBookingComplete(true);

      toast({
        title: "Appointment Booked!",
        description: "Your appointment has been confirmed successfully.",
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingComplete) {
    return (
      <>
        <Helmet>
          <title>Booking Confirmed | HealthCare+</title>
          <meta name="description" content="Your appointment has been successfully booked." />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-blue-50 to-[#F8F9FA] py-16 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl w-full mx-auto px-4 perspective-1000"
          >
            <div className="bg-white rounded-[2rem] shadow-2xl p-0 border border-gray-100 relative overflow-hidden transform-style-3d hover:rotate-x-2 transition-transform duration-500">
              <div className="bg-[#0F4C75] p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                  Appointment Confirmed
                </h1>
                <p className="text-blue-100">Your health journey continues</p>
              </div>

              <div className="p-10">
                <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Reference ID</p>
                    <p className="text-2xl font-mono font-bold text-[#0F4C75]">{bookingReference}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Status</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold">
                      <ShieldCheck className="w-4 h-4 mr-1" />
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 rounded-xl text-[#0F4C75]">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Doctor</p>
                        <p className="font-bold text-gray-900 text-lg">{doctor.name}</p>
                        <p className="text-sm text-[#FF6B6B] font-semibold">{doctor.specialty}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 rounded-xl text-[#0F4C75]">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Location</p>
                        <p className="font-bold text-gray-900">Medical Center, Room 3B</p>
                        <p className="text-sm text-gray-500">123 Health Ave, NY</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 rounded-xl text-[#0F4C75]">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Date</p>
                        <p className="font-bold text-gray-900 text-lg">
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 rounded-xl text-[#0F4C75]">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Time</p>
                        <p className="font-bold text-gray-900 text-lg">{time}</p>
                        <p className="text-sm text-gray-500">Please arrive 10m early</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => navigate('/dashboard')}
                    variant="premium-primary"
                    className="flex-1 py-7 text-lg rounded-xl shadow-lg hover:shadow-xl"
                  >
                    View My Dashboard
                  </Button>
                  <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="flex-1 py-7 text-lg rounded-xl border-2"
                  >
                    Back Home
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                <p className="text-sm text-gray-500">A confirmation email has been sent to <span className="font-bold text-gray-900">{formData.email}</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book Appointment | HealthCare+</title>
        <meta name="description" content="Complete your appointment booking with our top specialists." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-blue-50 to-[#F8F9FA] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-black text-[#0F4C75] mb-4 tracking-tight">
              Confirm Your Appointment
            </h1>
            <p className="text-xl text-gray-600">
              Just a few more details to complete your booking
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-xl p-8 md:p-10 border border-gray-100">
                <h2 className="text-3xl font-bold text-[#0F4C75] mb-8 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#0F4C75]/10 flex items-center justify-center text-sm font-black">1</span>
                  Patient Information
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0F4C75] mb-2">
                      Full Name *
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C75] transition-colors" />
                      <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#0F4C75] focus:bg-white outline-none transition-all duration-300 font-medium"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F4C75] mb-2">
                      Email Address *
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C75] transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#0F4C75] focus:bg-white outline-none transition-all duration-300 font-medium"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F4C75] mb-2">
                      Phone Number *
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C75] transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#0F4C75] focus:bg-white outline-none transition-all duration-300 font-medium"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F4C75] mb-2">
                      Additional Notes (Optional)
                    </label>
                    <div className="relative group">
                      <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C75] transition-colors" />
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#0F4C75] focus:bg-white outline-none transition-all duration-300 font-medium resize-none"
                        placeholder="Any medical history or specific concerns..."
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="premium-accent"
                    className="w-full py-6 text-lg shadow-xl hover:shadow-2xl mt-4"
                  >
                    {isSubmitting ? (
                      <LoadingSpinner size="sm" message="" />
                    ) : (
                      'Confirm Booking'
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 sticky top-24">
                <h3 className="text-2xl font-bold text-[#0F4C75] mb-6">Summary</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-[#FFD93D] shadow-md"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{doctor.name}</p>
                      <p className="text-sm text-[#FF6B6B] font-semibold">{doctor.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs font-bold bg-blue-50 text-[#0F4C75] px-2 py-0.5 rounded-full">
                           ⭐ {doctor.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-6 space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                      <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#0F4C75]">
                         <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">Date</p>
                        <p className="font-bold text-gray-900">
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                      <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#0F4C75]">
                         <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">Time</p>
                        <p className="font-bold text-gray-900">{time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation;