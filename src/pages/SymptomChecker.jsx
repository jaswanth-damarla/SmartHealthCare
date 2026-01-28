import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, ArrowLeft } from 'lucide-react';
import SymptomForm from '@/components/SymptomForm';
import RecommendationResults from '@/components/RecommendationResults';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

const SymptomChecker = () => {
  const { getRecommendedSpecialties } = useApp();
  const [step, setStep] = useState(1);
  const [recommendations, setRecommendations] = useState([]);

  const handleSymptomSubmit = (data) => {
    const results = getRecommendedSpecialties(data.selectedSymptoms);
    setRecommendations(results);
    setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    setRecommendations([]);
  };

  return (
    <>
      <Helmet>
        <title>Symptom Checker | HealthCare+</title>
        <meta name="description" content="Use our AI-powered symptom checker to get instant specialist recommendations based on your symptoms." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-blue-50 to-[#F8F9FA] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0F4C75] to-[#FF6B6B] mb-8 shadow-xl transform rotate-3 hover:rotate-6 transition-transform duration-500">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[#0F4C75] mb-6 tracking-tight">
              AI Symptom Checker
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get personalized specialist recommendations based on your symptoms using our advanced AI analysis
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -50, rotateY: 20 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: 50, rotateY: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 md:p-12 border border-white/50 perspective-1000"
              >
                <SymptomForm onSubmit={handleSymptomSubmit} />
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 50, rotateY: -20 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -50, rotateY: 20 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  className="mb-8 text-[#0F4C75] hover:bg-white/50 gap-2 pl-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Check Different Symptoms
                </Button>
                
                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 md:p-12 border border-white/50">
                  {recommendations.length > 0 ? (
                    <RecommendationResults recommendations={recommendations} />
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Stethoscope className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">No Matches Found</h3>
                      <p className="text-gray-600 text-lg">
                        We couldn't find specific recommendations. Please consult with a general practitioner.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default SymptomChecker;