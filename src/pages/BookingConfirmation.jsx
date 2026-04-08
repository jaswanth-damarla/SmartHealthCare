import React, { useState, useEffect, useMemo } from 'react';
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
  const { doctors } = useApp();
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
  const [existingAppointments, setExistingAppointments] = useState([]);

  const doctor = doctors.find(d => d.id === parseInt(doctorId));
  const { date, time } = location.state || {};

  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8080/api/v1/appointments');
        if (res.ok) setExistingAppointments(await res.json());
      } catch (e) { console.error(e); }
    };
    fetchExisting();
  }, []);

  const isSlotTaken = useMemo(() => {
    if (!date || !time || !doctor) return false;
    const selectedFullDateTime = `${new Date(date).toISOString().split('T')[0]}T${time}:00`;
    return existingAppointments.some(app => 
      app.doctorName === doctor.name && app.dateTime === selectedFullDateTime
    );
  }, [existingAppointments, date, time, doctor]);

  if (!doctor || !date || !time) {
    navigate('/doctors');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        patientName: formData.patientName,
        doctorName: doctor.name,
        department: doctor.specialty,
        dateTime: `${new Date(date).toISOString().split('T')[0]}T${time}:00`,
        notes: formData.notes
      };

      const response = await fetch('http://127.0.0.1:8080/api/v1/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Slot taken or server error');

      setBookingReference(`HC-${Date.now().toString().slice(-8)}`);
      setBookingComplete(true);
      toast({ title: "Success!", description: "Appointment confirmed." });
    } catch (error) {
      toast({ title: "Booking Restricted", description: "Slot is already booked.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-blue-50 to-[#F8F9FA] py-16 flex items-center justify-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-2xl w-full mx-auto px-4 perspective-1000">
          <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 relative overflow-hidden transform-style-3d transition-transform duration-500">
            <div className="bg-[#0F4C75] p-10 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Appointment Confirmed</h1>
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
                    <ShieldCheck className="w-4 h-4 mr-1" /> Confirmed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-[#0F4C75]"><User className="w-6 h-6" /></div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1">Doctor</p>
                      <p className="font-bold text-gray-900 text-lg">{doctor.name}</p>
                      <p className="text-sm text-[#FF6B6B] font-semibold">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-[#0F4C75]"><MapPin className="w-6 h-6" /></div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1">Location</p>
                      <p className="font-bold text-gray-900">Medical Center, Room 3B</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-[#0F4C75]"><Calendar className="w-6 h-6" /></div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1">Date</p>
                      <p className="font-bold text-gray-900 text-lg">{new Date(date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-[#0F4C75]"><Clock className="w-6 h-6" /></div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase mb-1">Time</p>
                      <p className="font-bold text-gray-900 text-lg">{time}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => navigate('/dashboard')} variant="premium-primary" className="flex-1 py-7 text-lg rounded-xl shadow-lg">View My Dashboard</Button>
                <Button onClick={() => navigate('/')} variant="outline" className="flex-1 py-7 text-lg rounded-xl border-2">Back Home</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-blue-50 to-[#F8F9FA] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-xl p-10 border border-gray-100">
              <h2 className="text-3xl font-bold text-[#0F4C75] mb-8">Patient Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#0F4C75] mb-2">Full Name *</label>
                  <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} required className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0F4C75] mb-2">Email Address *</label>
                  <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0F4C75] mb-2">Phone Number *</label>
                  <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0F4C75] mb-2">Additional Notes (Optional)</label>
                  <div className="relative"><FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows="4" className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl" placeholder="Any medical history or specific concerns..." />
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting || isSlotTaken} variant={isSlotTaken ? "outline" : "premium-accent"} className={`w-full py-6 text-lg shadow-xl ${isSlotTaken ? 'opacity-50 border-red-200' : ''}`}>
                  {isSubmitting ? <LoadingSpinner size="sm" message="" /> : isSlotTaken ? 'Slot Already Booked' : 'Confirm Booking'}
                </Button>
              </div>
            </form>
          </div>
          {/* Summary Sidebar stays here... */}
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;