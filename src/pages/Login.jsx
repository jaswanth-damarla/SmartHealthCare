import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import ForgotPasswordModal from '@/components/ForgotPasswordModal';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:8080/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user); 
        localStorage.setItem('user', JSON.stringify(user));
        toast({
          title: "Welcome back!",
          description: `You've successfully logged in as ${user.name}.`,
        });
        navigate(from);
      } else {
        const error = await response.json();
        toast({
          title: "Login Failed",
          description: error.message || "Invalid email or password.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Could not connect to the server.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const details = jwtDecode(credentialResponse.credential);
      
      const response = await fetch('http://127.0.0.1:8080/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: details.name,
          email: details.email,
          picture: details.picture,
          providerId: details.sub,
          provider: 'GOOGLE'
        }),
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast({
          title: "Google Login Success",
          description: `Welcome, ${user.name}!`,
        });
        navigate(from);
      }
    } catch (error) {
      toast({
        title: "Google Login Error",
        description: "Failed to authenticate with Google.",
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
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-blue-50 to-[#F8F9FA] dark:from-[#040D12] dark:via-[#04152d] dark:to-[#040D12] flex items-center justify-center py-12 px-4 transition-colors duration-500">
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
              className="inline-flex items-center gap-3 mb-6 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg border dark:border-gray-700"
            >
              <Heart className="w-8 h-8 text-[#FF6B6B]" fill="#FF6B6B" />
              <span className="text-2xl font-black text-[#0F4C75] dark:text-blue-400">HealthCare+</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-[#0F4C75] dark:text-white mb-3">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Login to manage your appointments</p>
          </div>

          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50 dark:border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0F4C75] to-[#FF6B6B]" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#0F4C75] dark:text-blue-300 mb-2">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C75]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 dark:text-white border-2 border-gray-100 dark:border-gray-700 rounded-xl focus:border-[#0F4C75] outline-none transition-all font-medium"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-[#0F4C75] dark:text-blue-300">Password</label>
                  <button 
                    type="button" 
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs font-bold text-[#FF6B6B] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0F4C75]" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 dark:text-white border-2 border-gray-100 dark:border-gray-700 rounded-xl focus:border-[#0F4C75] outline-none transition-all font-medium"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="premium-primary"
                className="w-full py-6 text-lg shadow-xl hover:shadow-2xl"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100 dark:border-gray-800"></span></div>
              <div className="relative flex justify-center text-sm uppercase"><span className="bg-white dark:bg-gray-900 px-2 text-gray-500 font-bold">Or continue with</span></div>
            </div>

            <div className="flex justify-center mb-6">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast({ title: "Google Login Failed", variant: "destructive" })}
                useOneTap
                theme="outline"
                shape="pill"
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#0F4C75] dark:text-blue-400 font-bold hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showForgotModal && (
          <ForgotPasswordModal isOpen={showForgotModal} onClose={() => setShowForgotModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;