import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Heart, Sparkles, Bone, Baby, Brain, HeartPulse, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  Stethoscope,
  Heart,
  Sparkles,
  Bone,
  Baby,
  Brain,
  HeartPulse,
  Eye
};

const RecommendationResults = ({ recommendations }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-[#0F4C75] mb-8 relative inline-block">
        Recommended Specialists
        <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#FF6B6B] rounded-full"></span>
      </h3>
      
      {recommendations.map((specialty, index) => {
        const Icon = iconMap[specialty.icon] || Stethoscope;
        return (
          <motion.div
            key={specialty.id}
            initial={{ opacity: 0, x: -30, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-[#0F4C75]/20 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0F4C75]/5 to-[#FF6B6B]/5 rounded-bl-full -z-0 transition-transform group-hover:scale-150 duration-500" />
            
            <div className="flex items-start justify-between gap-6 relative z-10">
              <div className="flex items-start gap-6 flex-1">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F4C75] to-[#3282B8] flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/20 group-hover:rotate-6 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                     <h4 className="text-2xl font-bold text-[#0F4C75] mb-2 group-hover:text-[#3282B8] transition-colors">
                      {specialty.name}
                    </h4>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#0F4C75]/5 text-[#0F4C75] text-sm font-bold">
                       {Math.round(specialty.confidence)}% match
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {specialty.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${specialty.confidence}%` }}
                        transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#0F4C75] via-[#3282B8] to-[#FF6B6B] shadow-[0_0_10px_rgba(15,76,117,0.5)]"
                      />
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => navigate('/doctors', { state: { specialty: specialty.name } })}
                    variant="premium-primary"
                    className="gap-2"
                  >
                    Find {specialty.name} Doctors
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RecommendationResults;