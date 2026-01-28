import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Zap, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TestimonialMarquee from '@/components/TestimonialMarquee';
import AnimatedHealthcareBackground from '@/components/AnimatedHealthcareBackground';

const HomePage = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Recommendations',
      description: 'Get instant specialist suggestions based on your symptoms'
    },
    {
      icon: Clock,
      title: 'Instant Booking',
      description: 'Book appointments in seconds with real-time availability'
    },
    {
      icon: Shield,
      title: '24/7 Access',
      description: 'Access healthcare services anytime, anywhere'
    },
    {
      icon: Star,
      title: 'Top Specialists',
      description: 'Connect with highly-rated healthcare professionals'
    }
  ];

  return (
    <>
      <Helmet>
        <title>HealthCare+ | AI-Powered Healthcare Booking Platform</title>
        <meta name="description" content="Book appointments with top specialists instantly. Get AI-powered doctor recommendations based on your symptoms. 24/7 healthcare access." />
      </Helmet>

      <div className="min-h-screen font-['Inter'] relative">
        <AnimatedHealthcareBackground />
        
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Subtle overlay to ensure text readability over the background */}
          <div className="absolute inset-0 bg-white/30 z-0 backdrop-blur-[1px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-5xl mx-auto perspective-1000 flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateX: 90 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-[#0F4C75]/10 hover:shadow-xl transition-all hover:scale-105 cursor-default mx-auto"
              >
                <Heart className="w-5 h-5 text-[#FF6B6B] animate-pulse" fill="#FF6B6B" />
                <span className="text-sm font-bold text-[#0F4C75] tracking-wide uppercase font-['Sora']">
                  Your Health, Our Priority
                </span>
              </motion.div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-[#0F4C75] mb-8 leading-tight tracking-tight drop-shadow-sm font-['Sora']">
                Healthcare Made
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#FF6B6B] bg-300% animate-gradient pb-3">
                  Simple & Smart
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto font-medium font-['Inter'] bg-white/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
                Book appointments with top specialists in seconds. Get AI-powered recommendations and manage your health journey effortlessly.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
                <Link to="/symptom-checker">
                  <Button variant="premium-accent" size="lg" className="text-lg px-10 py-8 shadow-xl hover:shadow-2xl rounded-2xl font-['Sora'] font-bold tracking-wide transform hover:-translate-y-1 transition-transform">
                    Check Your Symptoms
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
                <Link to="/doctors">
                  <Button variant="outline" size="lg" className="text-lg px-10 py-8 border-2 border-[#0F4C75] text-[#0F4C75] hover:bg-[#0F4C75] hover:text-white shadow-lg rounded-2xl font-['Sora'] font-bold tracking-wide transform hover:-translate-y-1 transition-transform bg-white/80">
                    Find Doctors
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-32 bg-white relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-20"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F4C75] mb-6 font-['Sora']">
                Why Choose HealthCare+?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                Experience the future of healthcare booking with our cutting-edge features designed for your comfort
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, rotateY: 15 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                    className="group bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center h-full"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#0F4C75]/5 to-[#FF6B6B]/5 rounded-bl-full transition-transform group-hover:scale-150 duration-500" />
                    
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0F4C75] to-[#3282B8] flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20 group-hover:rotate-6 transition-transform">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F4C75] mb-4 group-hover:text-[#3282B8] transition-colors font-['Sora']">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-32 bg-[#0F4C75] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 max-w-7xl mx-auto px-4"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-['Sora']">
                What Our Patients Say
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
                Join thousands of satisfied patients who have transformed their healthcare experience
              </p>
            </motion.div>

            <div className="w-full">
              <TestimonialMarquee />
            </div>
          </div>
        </section>

        <section className="py-32 bg-gradient-to-br from-white to-[#F8F9FA] relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-16 shadow-2xl border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#0F4C75]"></div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-[#0F4C75] mb-8 font-['Sora']">
                Ready to Take Control?
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                Start your healthcare journey today with our AI-powered symptom checker and find the right specialist for you. Your health deserves the best care.
              </p>
              <Link to="/symptom-checker">
                <Button variant="premium-primary" size="lg" className="text-xl px-16 py-9 shadow-2xl hover:scale-105 transition-transform rounded-2xl font-bold font-['Sora']">
                  Get Started Now
                  <ArrowRight className="w-7 h-7 ml-3" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;