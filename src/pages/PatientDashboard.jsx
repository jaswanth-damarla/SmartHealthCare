import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, TrendingUp, Sparkles, LayoutDashboard, Ticket } from 'lucide-react'; 
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import AppointmentCard from '@/components/AppointmentCard';
import RescheduleModal from '@/components/RescheduleModal';
import CancelModal from '@/components/CancelModal'; 
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

// --- AI INSIGHT LOGIC ENGINE ---
const getMedicalInsight = (appointment) => {
  if (!appointment) return null;
  const department = appointment.department?.toLowerCase() || "";
  const appointmentDate = new Date(appointment.dateTime);
  const hour = appointmentDate.getHours();

  const insights = {
    cardiology: { tip: "Wear loose-fitting clothing.", reason: "Ensures easy access for ECG leads and BP monitoring.", color: "text-red-400" },
    dentist: { tip: "Avoid caffeine for 4 hours.", reason: "Caffeine can increase sensitivity during local anesthesia.", color: "text-blue-300" },
    dermatology: { tip: "Remove all makeup/lotions.", reason: "Clear skin allows accurate examination of pigments.", color: "text-orange-300" },
    neurology: { tip: "Note down headache triggers.", reason: "A symptom diary provides patterns imaging might miss.", color: "text-purple-400" },
    general: { tip: "Arrive on an empty stomach.", reason: "Most checkups include blood work requiring 8-12 hours fasting.", color: "text-yellow-400" }
  };

  const selected = insights[department] || insights.general;
  let timeContext = hour < 11 ? "Since it's a morning slot, drink plenty of water." : hour >= 17 ? "Evening slot: Note your energy levels today." : "";
  return { ...selected, timeContext };
};

const PatientDashboard = () => {
  const [dbAppointments, setDbAppointments] = useState([]);
  const { doctors } = useApp();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [rescheduleData, setRescheduleData] = useState(null);
  const [cancelData, setCancelData] = useState(null); 

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/v1/appointments');
      const data = await response.json();
      setDbAppointments(data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    return {
      upcoming: dbAppointments.filter(a => new Date(a.dateTime) >= now).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)),
      past: dbAppointments.filter(a => new Date(a.dateTime) < now).sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
    };
  }, [dbAppointments]);

  const nextAppointment = upcoming[0];
  const aiInsight = useMemo(() => getMedicalInsight(nextAppointment), [nextAppointment]);

  const nextAppointmentDate = nextAppointment ? new Date(nextAppointment.dateTime) : null;
  const daysUntilNext = nextAppointmentDate ? Math.ceil((nextAppointmentDate - new Date()) / (1000 * 60 * 60 * 24)) : null;

  // --- PRINT TICKET HANDLER ---
  const handlePrintTicket = () => {
    if (!nextAppointment) {
      toast({ title: "No Appointments", description: "You don't have an upcoming visit to print.", variant: "destructive" });
      return;
    }
    window.print();
  };

  // --- CANCEL/RESCHEDULE HANDLERS ---
  const handleCancelRequest = (appointment) => {
    setCancelData(appointment);
  };

  const handleConfirmCancel = async (appointmentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/v1/appointments/${appointmentId}`, { method: 'DELETE' });
      if (response.ok) {
        toast({ title: "Appointment Cancelled", description: "Successfully removed." });
        fetchAppointments();
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const handleReschedule = (appointment) => {
    const doctor = doctors.find(d => d.name === appointment.doctorName);
    setRescheduleData({ appointment, doctor });
  };

  const handleRescheduleConfirm = async (appointmentId, newDate, newTime) => {
    try {
      const formattedDateTime = `${newDate.toISOString().split('T')[0]}T${newTime}:00`;
      const response = await fetch(`http://127.0.0.1:8080/api/v1/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateTime: formattedDateTime }),
      });
      if (response.ok) {
        toast({ title: "Success", description: "Rescheduled successfully!" });
        setRescheduleData(null);
        fetchAppointments();
      }
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  // --- GENERATE QR DATA STRING ---
  const qrDataString = useMemo(() => {
    if (!nextAppointment || !currentUser) return '';
    return encodeURIComponent(
      `SmartHealth+ Ticket | Patient: ${currentUser.name} | Doctor: ${nextAppointment.doctorName} | Date: ${new Date(nextAppointment.dateTime).toLocaleDateString()} | ID: ${nextAppointment.id}`
    );
  }, [nextAppointment, currentUser]);

  return (
    <>
      <Helmet>
        <title>My Dashboard | HealthCare+</title>
        <style>
          {`
            @media print {
              /* HIDE ALL WEB ELEMENTS */
              nav, footer, button, .no-print, .theme-toggle, .ai-insight-section {
                display: none !important;
              }
              body { background: white !important; }
              
              /* TICKET STYLING */
              .ticket-container {
                display: block !important;
                width: 400px;
                margin: 50px auto;
                border: 2px solid #0F4C75;
                border-radius: 20px;
                padding: 30px;
                font-family: sans-serif;
                color: #0F4C75;
                background: white;
              }
              .ticket-header {
                text-align: center;
                border-bottom: 2px dashed #ddd;
                padding-bottom: 20px;
                margin-bottom: 25px;
              }
              .ticket-body div {
                margin-bottom: 18px;
              }
              .label { font-size: 9pt; font-weight: bold; color: #888; text-transform: uppercase; letter-spacing: 1px;}
              .value { font-size: 14pt; font-weight: 800; display: block; margin-top: 3px; }
              
              /* CENTERED QR CODE */
              .qr-container {
                text-align: center;
                margin: 30px 0;
                border-top: 1px solid #eee;
                padding-top: 20px;
              }
              .ticket-qr { width: 140px; height: 140px; }
            }
          `}
        </style>
      </Helmet>

      <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#040D12] py-16 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER (With Download Button) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 no-print">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl md:text-6xl font-black text-[#0F4C75] dark:text-blue-400 mb-2 tracking-tight">
                Dashboard
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Welcome back, {currentUser?.name?.split(' ')[0]}</p>
            </motion.div>
            
            <Button 
              onClick={handlePrintTicket}
              disabled={!nextAppointment}
              className="bg-[#0F4C75] hover:bg-[#0F4C75]/90 text-white font-bold px-8 py-7 rounded-2xl shadow-2xl flex gap-3 transition-all transform hover:scale-105"
            >
              <Ticket className="w-6 h-6" />
              Download Appointment Ticket
            </Button>
          </div>

          {/* HIDDEN TICKET FOR PRINTING (visible only in window.print()) */}
          {nextAppointment && (
            <div className="hidden ticket-container">
              <div className="ticket-header">
                {/* Heading replaced here */}
                <h2 style={{fontSize: '22pt', fontWeight: '900', color: '#FF6B6B'}}>SmartHealth+</h2>
                <p style={{fontSize: '10pt', color: '#888'}}>Official Consultation Ticket</p>
              </div>
              <div className="ticket-body">
                <div>
                  <span className="label">Patient</span>
                  <span className="value">{currentUser?.name}</span>
                </div>
                <div>
                  <span className="label">Doctor / Specialization</span>
                  <span className="value">{nextAppointment.doctorName} ({nextAppointment.department})</span>
                </div>
                <div>
                  <span className="label">Date</span>
                  <span className="value">{new Date(nextAppointment.dateTime).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div>
                  <span className="label">Time Slot</span>
                  <span className="value">{new Date(nextAppointment.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                
                {/* Center Valid QR Code */}
                <div className="qr-container">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrDataString}`} 
                    alt="Appointment QR Code" 
                    className="ticket-qr"
                  />
                  <p style={{fontSize: '8pt', color: '#888', marginTop: '10px'}}>Present this code at the reception desk.</p>
                </div>
              </div>
            </div>
          )}

          {/* STAT CARDS (no-print) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 no-print">
            <div className="bg-gradient-to-br from-[#0F4C75] to-[#3282B8] text-white rounded-3xl p-8 shadow-xl">
               <p className="text-5xl font-black">{upcoming.length}</p>
               <p className="text-white/80 font-medium">Upcoming Visits</p>
            </div>
            <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] text-white rounded-3xl p-8 shadow-xl">
               <p className="text-5xl font-black">{daysUntilNext ?? '0'}</p>
               <p className="text-white/80 font-medium">Days until next</p>
            </div>
            <div className="bg-gradient-to-br from-[#FFD93D] to-[#FFED99] text-[#0F4C75] rounded-3xl p-8 shadow-xl">
               <p className="text-5xl font-black">{dbAppointments.length}</p>
               <p className="opacity-80 font-bold">Total Sessions</p>
            </div>
          </div>

          {/* AI INSIGHT (no-print) */}
          {nextAppointment && aiInsight && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="no-print bg-[#0B2447] dark:bg-[#071624] text-white p-8 rounded-[2rem] mb-16 shadow-2xl border border-blue-400/20 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>

              <div className="relative z-10">
                <h3 className="font-black flex items-center gap-3 text-2xl mb-6">
                  <Sparkles className={`w-8 h-8 ${aiInsight.color} animate-pulse`} /> AI Prep Insight
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Recommended Prep</p>
                    <p className="text-2xl font-bold leading-tight">{aiInsight.tip}</p>
                    {aiInsight.timeContext && <div className="inline-flex px-4 py-1.5 bg-blue-500/20 rounded-full text-sm font-semibold border border-blue-400/30">💡 {aiInsight.timeContext}</div>}
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2">The Medical Reason</p>
                    <p className="text-lg opacity-80 leading-relaxed italic">"{aiInsight.reason}"</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* UPCOMING VISITS (no-print) */}
          <div className="mb-16 no-print">
            <h2 className="text-4xl font-bold text-[#0F4C75] dark:text-blue-300 mb-8 flex items-center gap-3">
              <span className="w-2 h-10 bg-[#FF6B6B] rounded-full"></span>
              Consultation Queue
            </h2>
            {upcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcoming.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    doctor={doctors.find(d => d.name === appointment.doctorName)}
                    onCancel={() => handleCancelRequest(appointment)}
                    onReschedule={handleReschedule}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 text-gray-400">
                <LayoutDashboard className="w-16 h-16 mx-auto mb-4" />
                <p className="text-2xl font-bold dark:text-gray-500">No pending visits!</p>
              </div>
            )}
          </div>

          {/* MEDICAL HISTORY (no-print) */}
          {past.length > 0 && (
             <div className="no-print">
               <h2 className="text-4xl font-bold text-[#0F4C75] dark:text-blue-300 mb-8 flex items-center gap-3">
                 <span className="w-2 h-10 bg-gray-300 rounded-full"></span>
                 Medical History
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
                {past.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} doctor={doctors.find(d => d.name === appointment.doctorName)} />
                ))}
               </div>
             </div>
          )}
        </div>

        {/* MODALS */}
        <AnimatePresence>
          {cancelData && (
            <CancelModal
              isOpen={!!cancelData}
              appointment={cancelData}
              onClose={() => setCancelData(null)}
              onConfirm={handleConfirmCancel}
            />
          )}
        </AnimatePresence>

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