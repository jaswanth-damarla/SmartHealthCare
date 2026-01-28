import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  Pill, 
  Syringe, 
  Cross, 
  Thermometer, 
  FileHeart, 
  Brain, 
  Dna 
} from 'lucide-react';

const AnimatedHealthcareBackground = () => {
  // Configuration for background elements - Opacities increased for better visibility
  const elements = [
    {
      Icon: Heart,
      color: "text-red-400", // Darkened color slightly
      className: "top-[10%] left-[5%] w-24 h-24 md:w-32 md:h-32",
      animation: {
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.45, 0.3] // Increased from 0.15
      },
      duration: 4
    },
    {
      Icon: Activity,
      color: "text-blue-400",
      className: "top-[20%] right-[10%] w-32 h-32 md:w-48 md:h-48",
      animation: {
        y: [0, 30, 0],
        rotate: [0, 10, 0],
        opacity: [0.25, 0.4, 0.25] // Increased from 0.1
      },
      duration: 7
    },
    {
      Icon: Stethoscope,
      color: "text-slate-500",
      className: "bottom-[15%] left-[10%] w-28 h-28 md:w-40 md:h-40",
      animation: {
        rotate: [-5, 5, -5],
        scale: [1, 1.05, 1],
        opacity: [0.3, 0.45, 0.3]
      },
      duration: 6
    },
    {
      Icon: Dna,
      color: "text-indigo-400",
      className: "bottom-[20%] right-[5%] w-20 h-20 md:w-32 md:h-32",
      animation: {
        rotate: [0, 360],
        opacity: [0.25, 0.4, 0.25]
      },
      duration: 20
    },
    {
      Icon: Pill,
      color: "text-green-400",
      className: "top-[40%] left-[15%] w-16 h-16 md:w-24 md:h-24",
      animation: {
        y: [0, -40, 0],
        rotate: [0, -20, 0],
        opacity: [0.25, 0.4, 0.25]
      },
      duration: 8
    },
    {
      Icon: Syringe,
      color: "text-teal-400",
      className: "top-[60%] right-[20%] w-16 h-16 md:w-24 md:h-24",
      animation: {
        x: [0, 20, 0],
        rotate: [45, 30, 45],
        opacity: [0.25, 0.4, 0.25]
      },
      duration: 9
    },
    {
      Icon: Cross,
      color: "text-red-300",
      className: "top-[15%] left-[40%] w-12 h-12 md:w-20 md:h-20",
      animation: {
        scale: [1, 1.2, 1],
        opacity: [0.25, 0.4, 0.25]
      },
      duration: 5
    },
    {
      Icon: Brain,
      color: "text-purple-400",
      className: "bottom-[40%] left-[80%] w-20 h-20 md:w-28 md:h-28",
      animation: {
        y: [0, 20, 0],
        opacity: [0.25, 0.4, 0.25]
      },
      duration: 6.5
    },
     {
      Icon: Thermometer,
      color: "text-orange-400",
      className: "top-[80%] left-[30%] w-14 h-14 md:w-20 md:h-20",
      animation: {
        y: [0, -15, 0],
        opacity: [0.25, 0.4, 0.25]
      },
      duration: 5.5
    },
    {
      Icon: FileHeart,
      color: "text-blue-300",
      className: "top-[30%] right-[35%] w-16 h-16 md:w-24 md:h-24",
      animation: {
        rotate: [-10, 10, -10],
        opacity: [0.2, 0.35, 0.2]
      },
      duration: 7.5
    }
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-blue-50/40">
      {elements.map((item, index) => {
        const { Icon, color, className, animation, duration } = item;
        return (
          <motion.div
            key={index}
            className={`absolute ${color} ${className}`}
            initial={{ opacity: 0 }}
            animate={animation}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          >
            {/* Increased strokeWidth to 2 for better visibility */}
            <Icon className="w-full h-full drop-shadow-sm" strokeWidth={2} />
          </motion.div>
        );
      })}
      
      {/* Decorative Wave Line - Slightly darker */}
      <motion.svg 
        className="absolute top-1/2 left-0 w-full h-64 text-blue-300/30 -translate-y-1/2"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <motion.path 
          d="M0 10 Q 25 20 50 10 T 100 10" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.8"
          animate={{ d: ["M0 10 Q 25 20 50 10 T 100 10", "M0 10 Q 25 0 50 10 T 100 10", "M0 10 Q 25 20 50 10 T 100 10"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </motion.svg>
    </div>
  );
};

export default AnimatedHealthcareBackground;