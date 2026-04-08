import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [step, setStep] = useState('email'); // 'email', 'reset'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({ email: '', code: '', newPassword: '' });

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://127.0.0.1:8080/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      if (res.ok) {
        setStep('reset');
        toast({ title: "Code Sent", description: "Check your email for the reset code." });
      } else {
        toast({ title: "Error", description: "Email not found", variant: "destructive" });
      }
    } finally { setIsSubmitting(false); }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://127.0.0.1:8080/api/v1/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast({ title: "Success!", description: "Password updated. You can now login." });
        onClose();
      } else {
        toast({ title: "Reset Failed", description: "Invalid code or error.", variant: "destructive" });
      }
    } finally { setIsSubmitting(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-[#0F4C75]/40 backdrop-blur-md" onClick={onClose} />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl max-w-md w-full p-10 overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"><X /></button>
        
        <h2 className="text-2xl font-black text-[#0F4C75] dark:text-blue-400 mb-6">
          {step === 'email' ? 'Forgot Password?' : 'Reset Password'}
        </h2>

        <form onSubmit={step === 'email' ? handleRequestOTP : handleReset} className="space-y-5">
          {step === 'email' ? (
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="email" required placeholder="Enter your email" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-xl outline-none border-2 border-transparent focus:border-[#0F4C75]"
                onChange={(e) => setData({...data, email: e.target.value})}
              />
            </div>
          ) : (
            <>
              <input type="text" maxLength="6" placeholder="6-digit code" className="w-full text-center text-2xl font-bold py-4 bg-gray-50 rounded-xl" onChange={(e) => setData({...data, code: e.target.value})} />
              <input type="password" placeholder="New Strong Password" required className="w-full px-4 py-4 bg-gray-50 rounded-xl" onChange={(e) => setData({...data, newPassword: e.target.value})} />
            </>
          )}
          <Button type="submit" disabled={isSubmitting} className="w-full py-6 bg-[#0F4C75]">{isSubmitting ? 'Processing...' : 'Continue'}</Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordModal;