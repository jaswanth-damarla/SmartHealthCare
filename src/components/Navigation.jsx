import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'; 
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/symptom-checker', label: 'Symptom Checker' },
    { to: '/doctors', label: 'Find Doctors' },
    // Simplified: Only Dashboard link shown when logged in
    ...(isAuthenticated ? [{ to: '/dashboard', label: 'Dashboard' }] : [])
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/70 backdrop-blur-xl border-b border-[#0F4C75]/10 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group perspective-1000">
            <motion.div
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Heart className="w-9 h-9 text-[#FF6B6B] drop-shadow-md" fill="#FF6B6B" />
            </motion.div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#0F4C75] to-[#3282B8] drop-shadow-sm">
              HealthCare+
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-bold transition-all duration-300 relative group px-2 py-1 ${
                  isActive(link.to)
                    ? 'text-[#0F4C75]'
                    : 'text-gray-500 hover:text-[#0F4C75]'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] transform origin-left transition-transform duration-300 ${isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  onClick={() => setProfileOpen(!profileOpen)}
                  variant="premium-primary"
                  className="gap-3 px-3 py-2 rounded-full"
                >
                  {currentUser.picture ? (
                    <img 
                      src={currentUser.picture} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full border border-white/50 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <span className="max-w-[120px] truncate font-bold">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </Button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, rotateX: -10 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: 10, rotateX: 10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform origin-top-right z-50"
                    >
                      <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Account</p>
                        <p className="text-sm font-bold text-[#0F4C75] truncate">{currentUser.email}</p>
                      </div>
                      
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-5 py-4 hover:bg-blue-50/50 transition-colors text-gray-700 font-bold text-sm"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#0F4C75]" />
                        <span>Go to Dashboard</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 transition-colors text-red-600 font-bold text-sm border-t border-gray-100"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" className="text-[#0F4C75] font-bold hover:bg-[#0F4C75]/5">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="premium-accent">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0F4C75] hover:bg-[#0F4C75]/5 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-bold transition-all ${
                    isActive(link.to)
                      ? 'bg-[#0F4C75] text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-bold"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full font-bold">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="premium-accent" className="w-full font-bold">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;