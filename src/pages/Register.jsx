import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    const result = register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      toast({
        title: "Account Created!",
        description: "Welcome to HealthCare+",
      });
      navigate('/');
    } else {
      toast({
        title: "Registration Failed",
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
        <title>Sign Up | HealthCare+</title>
        <meta name="description" content="Create your HealthCare+ account to start booking appointments with top specialists." />
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
            <h1 className="text-4xl md:text-5xl font-black text-[#0F4C75] mb-3">Create Account</h1>
            <p className="text-gray-500 font-medium">Join us for better healthcare access</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF6B6B] to-[#0F4C75]" />
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#0F4C75] mb-2">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C75] transition-colors" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#0F4C75] focus:bg-white outline-none transition-all duration-300 font-medium"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0F4C75] mb-2">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C75] transition-colors" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#0F4C75] focus:bg-white outline-none transition-all duration-300 font-medium"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="premium-accent"
                className="w-full py-6 text-lg shadow-xl hover:shadow-2xl mt-4"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#0F4C75] font-bold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;