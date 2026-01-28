import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import DoctorCard from '@/components/DoctorCard';
import AvailabilityModal from '@/components/AvailabilityModal';
import { useApp } from '@/context/AppContext';

const DoctorDirectory = () => {
  const { doctors, specialties } = useApp();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if (location.state?.specialty) {
      setSelectedSpecialty(location.state.specialty);
    }
  }, [location.state]);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <>
      <Helmet>
        <title>Find Doctors | HealthCare+</title>
        <meta name="description" content="Browse our directory of top-rated healthcare specialists. View real-time availability and book appointments instantly." />
      </Helmet>

      <div className="min-h-screen bg-[#F8F9FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-black text-[#0F4C75] mb-6 tracking-tight">
              Find Your Specialist
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse top-rated doctors and book appointments instantly with real-time availability
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100 relative z-20"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-[#0F4C75] transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#0F4C75] focus:ring-4 focus:ring-[#0F4C75]/10 outline-none text-lg text-gray-900 transition-all placeholder:text-gray-400"
                />
              </div>
              <div className="relative group md:w-80">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-[#0F4C75] transition-colors" />
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full pl-14 pr-10 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#0F4C75] focus:ring-4 focus:ring-[#0F4C75]/10 outline-none appearance-none bg-white text-lg text-gray-900 transition-all cursor-pointer font-medium"
                >
                  <option value="all">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty.id} value={specialty.name}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                  ▼
                </div>
              </div>
            </div>
          </motion.div>

          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 30, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  className="h-full"
                >
                  <DoctorCard
                    doctor={doctor}
                    onViewAvailability={setSelectedDoctor}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-gray-200"
            >
              <p className="text-xl text-gray-500 font-medium">
                No doctors found matching your criteria
              </p>
            </motion.div>
          )}
        </div>

        {selectedDoctor && (
          <AvailabilityModal
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
        )}
      </div>
    </>
  );
};

export default DoctorDirectory;