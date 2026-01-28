import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const from = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(formData.email, formData.password);
    
    if (result.success) {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate(from);
    } else {
      toast({
        title: "Login Failed",
        description: result.error,
        variant: "destructive"
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>Login | HealthCare+</title>
        <meta name="description" content="Login to your HealthCare+ account to manage appointments and access healthcare services." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-blue-50 to-[#F8F9FA] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="max-w-md w-full perspective-1000"
        >
          <div className="text-center mb-10">
            <motion.div 
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 mb-6 bg-white px-6 py-3 rounded-full shadow-lg"
            >
              <Heart className="w-8 h-8 text-[#FF6B6B]" fill="#FF6B6B" />
              <span className="text-2xl font-black text-[#0F4C75]">HealthCare+</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-[#0F4C75] mb-3">Welcome Back</h1>
            <p className="text-gray-500 font-medium">Login to manage your appointments</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0F4C75] to-[#FF6B6B]" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#0F4C75] mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C75] transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#0F4C75] focus:bg-white outline-none transition-all duration-300 font-medium"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0F4C75] mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C75] transition-colors" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#0F4C75] focus:bg-white outline-none transition-all duration-300 font-medium"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="premium-primary"
                className="w-full py-6 text-lg shadow-xl hover:shadow-2xl"
              >
                Login
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#0F4C75] font-bold hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/20">
            <p>Demo credentials: Use any email/password you create during registration</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;