import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CancelModal = ({ isOpen, onClose, onConfirm, appointment }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0F4C75]/20 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full p-10 border border-gray-100 overflow-hidden"
      >
        {/* Red Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-red-500" />
        
        <div className="text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          
          <h2 className="text-2xl font-black text-[#0F4C75] mb-3">Cancel Appointment?</h2>
          <p className="text-gray-500 font-medium mb-8">
            Are you sure you want to cancel your session with <span className="text-[#0F4C75] font-bold">{appointment?.doctorName}</span>? This action cannot be undone.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => {
                onConfirm(appointment.id);
                onClose();
              }}
              variant="destructive"
              className="w-full py-7 rounded-2xl text-lg font-bold shadow-lg shadow-red-200"
            >
              Yes, Cancel It
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full py-7 rounded-2xl text-gray-500 font-bold hover:bg-gray-50"
            >
              No, Keep Appointment
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CancelModal;