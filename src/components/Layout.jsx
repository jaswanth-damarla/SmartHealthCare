import React from 'react';
import Navigation from './Navigation';
import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-[#040D12] transition-colors duration-500">
      <Navigation />
      
      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Aesthetic Footer */}
      <footer className="no-print bg-[#0B2447] dark:bg-[#071624] text-white relative overflow-hidden">
        {/* Abstract Background Glow for Depth */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-0" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF6B6B]/5 rounded-full blur-[100px] -z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-xl shadow-lg">
                  <Heart className="w-6 h-6 text-[#FF6B6B]" fill="#FF6B6B" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">SmartHealth+</span>
              </div>
              <p className="text-blue-100/70 text-sm leading-relaxed font-medium">
                Pioneering the future of digital healthcare with AI-driven insights and instant specialist access. Your health, our priority.
              </p>
              <div className="flex gap-4">
                 <div className="p-2 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-all"><Twitter className="w-4 h-4 text-blue-300" /></div>
                 <div className="p-2 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-all"><Instagram className="w-4 h-4 text-pink-300" /></div>
                 <div className="p-2 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-all"><Linkedin className="w-4 h-4 text-blue-400" /></div>
              </div>
            </div>

            {/* Navigation Section */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Explore</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/" className="text-blue-100/60 hover:text-[#FF6B6B] transition-all flex items-center gap-2"><span>&rsaquo;</span> Home</Link></li>
                <li><Link to="/symptom-checker" className="text-blue-100/60 hover:text-[#FF6B6B] transition-all flex items-center gap-2"><span>&rsaquo;</span> AI Symptom Checker</Link></li>
                <li><Link to="/doctors" className="text-blue-100/60 hover:text-[#FF6B6B] transition-all flex items-center gap-2"><span>&rsaquo;</span> Find Specialists</Link></li>
                <li><Link to="/dashboard" className="text-blue-100/60 hover:text-[#FF6B6B] transition-all flex items-center gap-2"><span>&rsaquo;</span> Patient Portal</Link></li>
              </ul>
            </div>

            {/* Specialties Section */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Services</h3>
              <div className="flex flex-wrap gap-2">
                {['Cardiology', 'Neurology', 'Dental', 'Pediatrics', 'Derma', 'Surgery'].map((item) => (
                  <span key={item} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-blue-100/80 hover:bg-white/10 cursor-default transition-all">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Get in Touch</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-start gap-3 group">
                  <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/40 transition-all"><Phone className="w-4 h-4 text-blue-300" /></div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 uppercase font-black">Emergency</span>
                    <span className="text-blue-100">+1 (555) 123-4567</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="p-2 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/40 transition-all"><Mail className="w-4 h-4 text-pink-300" /></div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 uppercase font-black">Email Support</span>
                    <span className="text-blue-100">care@smarthealth.com</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="p-2 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/40 transition-all"><MapPin className="w-4 h-4 text-yellow-300" /></div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 uppercase font-black">Location</span>
                    <span className="text-blue-100">123 Medical Center Dr, CU</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/30">
            <p>&copy; 2026 SmartHealth+ . AI-Powered Healthcare.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-all">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-all">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;