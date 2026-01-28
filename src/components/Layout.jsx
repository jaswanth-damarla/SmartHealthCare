import React from 'react';
import Navigation from './Navigation';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navigation />
      <main className="flex-1">{children}</main>
      <footer className="bg-[#0F4C75] text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-[#FF6B6B]" fill="#FF6B6B" />
                <span className="text-xl font-bold">HealthCare+</span>
              </div>
              <p className="text-white/80 text-sm">
                Your trusted partner in healthcare. Book appointments with top specialists instantly.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/symptom-checker" className="hover:text-white transition-colors">Symptom Checker</Link></li>
                <li><Link to="/doctors" className="hover:text-white transition-colors">Find Doctors</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">My Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Specialties</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Cardiology</li>
                <li>Dermatology</li>
                <li>Pediatrics</li>
                <li>Neurology</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@healthcare.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Medical Center Dr</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2026 HealthCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;