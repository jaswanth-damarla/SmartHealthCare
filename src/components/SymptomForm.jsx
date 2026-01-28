import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronDown, Activity, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

const CustomSelect = ({ label, value, onChange, options, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      <label className="block text-sm font-bold text-[#0F4C75] mb-3 ml-1">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full p-4 bg-white border-2 rounded-xl flex items-center justify-between transition-all duration-300 ${
            isOpen 
              ? 'border-[#0F4C75] shadow-lg ring-4 ring-[#0F4C75]/10' 
              : 'border-gray-200 hover:border-[#0F4C75]/50 hover:shadow-md'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isOpen ? 'bg-[#0F4C75] text-white' : 'bg-blue-50 text-[#0F4C75]'}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-gray-900">{selectedOption?.label}</span>
              <span className="text-xs text-gray-500 font-medium">{selectedOption?.description}</span>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0F4C75]' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full p-4 text-left flex items-center gap-3 transition-colors ${
                    value === option.value
                      ? 'bg-blue-50 text-[#0F4C75]'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    value === option.value ? 'border-[#0F4C75]' : 'border-gray-300'
                  }`}>
                    {value === option.value && <div className="w-2 h-2 rounded-full bg-[#0F4C75]" />}
                  </div>
                  <div>
                    <span className={`block font-bold ${value === option.value ? 'text-[#0F4C75]' : 'text-gray-900'}`}>
                      {option.label}
                    </span>
                    <span className="text-xs text-gray-500">{option.description}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
};

const SymptomForm = ({ onSubmit }) => {
  const { symptoms } = useApp();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severity, setSeverity] = useState('moderate');
  const [duration, setDuration] = useState('1-3 days');

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSymptoms.length > 0) {
      onSubmit({ selectedSymptoms, severity, duration });
    }
  };

  const severityOptions = [
    { value: 'mild', label: 'Mild', description: 'Noticeable but not interfering with daily life' },
    { value: 'moderate', label: 'Moderate', description: 'Interfering with daily activities' },
    { value: 'severe', label: 'Severe', description: 'Intense or incapacitating pain/discomfort' }
  ];

  const durationOptions = [
    { value: 'less than 1 day', label: 'Less than 24 hours', description: 'Just started recently' },
    { value: '1-3 days', label: '1-3 days', description: 'Persisting for a few days' },
    { value: '4-7 days', label: '4-7 days', description: 'Persisting for up to a week' },
    { value: 'more than 1 week', label: 'More than 1 week', description: 'Long-term or chronic' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 perspective-1000">
      <div>
        <h3 className="text-2xl font-bold text-[#0F4C75] mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F4C75]/10 text-[#0F4C75] text-sm">1</span>
          Select your symptoms
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {symptoms.map((symptom, index) => {
            const isSelected = selectedSymptoms.includes(symptom.id);
            return (
              <motion.button
                key={symptom.id}
                type="button"
                onClick={() => toggleSymptom(symptom.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 shadow-sm ${
                  isSelected
                    ? 'border-[#0F4C75] bg-gradient-to-r from-[#0F4C75] to-[#3282B8] text-white shadow-lg'
                    : 'border-gray-100 bg-white hover:border-[#0F4C75]/30 text-gray-700 hover:shadow-md'
                }`}
              >
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 shrink-0 opacity-50" />
                )}
                <span className="font-semibold text-sm text-left">{symptom.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
        <CustomSelect 
          label="Severity Level"
          value={severity}
          onChange={setSeverity}
          options={severityOptions}
          icon={Activity}
        />

        <CustomSelect 
          label="Duration"
          value={duration}
          onChange={setDuration}
          options={durationOptions}
          icon={Clock}
        />
      </div>

      <div className="pt-8">
        <Button
          type="submit"
          disabled={selectedSymptoms.length === 0}
          variant="premium-accent"
          className="w-full h-16 text-xl font-bold shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-1"
        >
          Analyze Symptoms
        </Button>
      </div>
    </form>
  );
};

export default SymptomForm;