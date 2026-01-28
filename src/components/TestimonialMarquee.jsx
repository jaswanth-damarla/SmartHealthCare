import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/mockData';

const TestimonialCard = ({ testimonial }) => (
  <div className="w-[400px] shrink-0 mx-4">
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-colors h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-1 mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-[#FFD93D]" fill="#FFD93D" />
          ))}
        </div>
        <p className="text-white/90 mb-8 italic text-lg leading-relaxed font-display">
          "{testimonial.content}"
        </p>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-white/30"
        />
        <div>
          <div className="font-bold text-white text-lg font-['Sora']">{testimonial.name}</div>
          <div className="text-sm text-white/60 font-medium">{testimonial.role}</div>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden mask-gradient-x">
      <motion.div
        className="flex py-10"
        animate={{
          x: ["0%", "-100%"],
        }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ width: "max-content" }} // Ensures the container is wide enough
      >
        {/* Render testimonials multiple times to ensure seamless loop on wide screens */}
        {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialMarquee;