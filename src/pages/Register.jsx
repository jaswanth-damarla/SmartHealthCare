import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Heart, ShieldCheck, Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState('signup');
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // --- PASSWORD STRENGTH LOGIC ---
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: '', color: 'bg-gray-200' };
    
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[@$!%*?&]/.test(pwd)) score++;

    switch (score) {
      case 1: return { score: 20, label: 'Very Weak', color: 'bg-red-500' };
      case 2: return { score: 40, label: 'Weak', color: 'bg-orange-500' };
      case 3: return { score: 60, label: 'Fair', color: 'bg-yellow-500' };
      case 4: return { score: 80, label: 'Good', color: 'bg-blue-500' };
      case 5: return { score: 100, label: 'Strong', color: 'bg-green-500' };
      default: return { score: 0, label: '', color: 'bg-gray-200' };
    }
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast({
        title: "Weak Password",
        description: "Must be 8+ characters with Uppercase, Lowercase, Number, and Special Character.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Registration Failed", description: "Passwords do not match", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://127.0.0.1:8080/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      if (response.ok) {
        setStep('verify');
        toast({ title: "OTP Sent!", description: `Verification code sent to ${formData.email}` });
      } else {
        const data = await response.json();
        toast({ title: "Signup Failed", description: data.message || "Error", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Connection Error", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet><title>{step === 'signup' ? 'Sign Up' : 'Verify'} | HealthCare+</title></Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-blue-50 to-[#F8F9FA] flex items-center justify-center py-12 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full perspective-1000">
          <div className="text-center mb-10">
            <motion.div whileHover={{ rotateY: 180 }} className="inline-flex items-center gap-3 mb-6 bg-white px-6 py-3 rounded-full shadow-lg">
              <Heart className="w-8 h-8 text-[#FF6B6B]" fill="#FF6B6B" />
              <span className="text-2xl font-black text-[#0F4C75]">HealthCare+</span>
            </motion.div>
            <h1 className="text-4xl font-black text-[#0F4C75] mb-3">
              {step === 'signup' ? 'Create Account' : 'Verify Email'}
            </h1>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${step === 'signup' ? 'from-[#FF6B6B] to-[#0F4C75]' : 'from-[#0F4C75] to-[#3282B8]'}`} />
            
            <AnimatePresence mode="wait">
              {step === 'signup' ? (
                <motion.form key="signup-form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-[#0F4C75] mb-2">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" name="name" required onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#0F4C75] transition-all" placeholder="John Doe" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F4C75] mb-2">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="email" name="email" required onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#0F4C75] transition-all" placeholder="your.email@example.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F4C75] mb-2">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type={showPassword ? "text" : "password"} name="password" required onChange={handleChange} className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#0F4C75] transition-all font-medium" placeholder="Create a password" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0F4C75]">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* STRENGTH METER UI */}
                    {formData.password && (
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Strength: {passwordStrength.label}</span>
                          <span className="text-[10px] font-black text-[#0F4C75]">{passwordStrength.score}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${passwordStrength.score}%` }} className={`h-full ${passwordStrength.color} transition-all duration-500`} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F4C75] mb-2">Confirm Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type={showPassword ? "text" : "password"} name="confirmPassword" required onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#0F4C75] transition-all font-medium" placeholder="Confirm your password" />
                    </div>
                  </div>

                  <Button type="submit" disabled={isSubmitting} variant="premium-accent" className="w-full py-6 text-lg shadow-xl mt-4">
                    {isSubmitting ? 'Sending OTP...' : 'Create Account'}
                  </Button>
                </motion.form>
              ) : (
                <motion.form key="verify-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleVerify} className="space-y-8 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4"><ShieldCheck className="w-8 h-8 text-[#0F4C75]" /></div>
                    <p className="text-gray-500 font-medium">We sent a code to <span className="text-[#0F4C75] font-bold">{formData.email}</span></p>
                  </div>
                  <input type="text" maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full text-center text-4xl font-black tracking-[0.5em] py-5 bg-gray-50 border-2 border-[#0F4C75]/20 rounded-2xl focus:border-[#0F4C75] outline-none" placeholder="000000" />
                  <Button type="submit" disabled={isSubmitting} variant="premium-primary" className="w-full py-6 text-lg">
                    {isSubmitting ? 'Verifying...' : 'Verify Account'}
                  </Button>
                  <button type="button" onClick={() => setStep('signup')} className="text-sm font-bold text-gray-400 hover:text-[#0F4C75]">Wrong email?</button>
                </motion.form>
              )}
            </AnimatePresence>
            {step === 'signup' && <div className="mt-8 text-center"><p className="text-gray-600">Already have an account? <Link to="/login" className="text-[#0F4C75] font-bold hover:underline">Login</Link></p></div>}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;