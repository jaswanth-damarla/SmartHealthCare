export const specialties = [
    {
      id: 1,
      name: "General Practice",
      description: "Primary healthcare for common illnesses and check-ups",
      icon: "Stethoscope"
    },
    {
      id: 2,
      name: "Cardiology",
      description: "Heart and cardiovascular system specialists",
      icon: "Heart"
    },
    {
      id: 3,
      name: "Dermatology",
      description: "Skin, hair, and nail conditions",
      icon: "Sparkles"
    },
    {
      id: 4,
      name: "Orthopedics",
      description: "Bone, joint, and muscle specialists",
      icon: "Bone"
    },
    {
      id: 5,
      name: "Pediatrics",
      description: "Healthcare for infants, children, and adolescents",
      icon: "Baby"
    },
    {
      id: 6,
      name: "Neurology",
      description: "Brain and nervous system specialists",
      icon: "Brain"
    },
    {
      id: 7,
      name: "Psychiatry",
      description: "Mental health and behavioral disorders",
      icon: "HeartPulse"
    },
    {
      id: 8,
      name: "Ophthalmology",
      description: "Eye care and vision specialists",
      icon: "Eye"
    }
  ];
  
  export const symptoms = [
    { id: 1, name: "Fever", specialties: [1, 2, 5] },
    { id: 2, name: "Headache", specialties: [1, 6] },
    { id: 3, name: "Chest Pain", specialties: [2] },
    { id: 4, name: "Skin Rash", specialties: [3] },
    { id: 5, name: "Joint Pain", specialties: [4] },
    { id: 6, name: "Cough", specialties: [1, 5] },
    { id: 7, name: "Stomach Pain", specialties: [1] },
    { id: 8, name: "Dizziness", specialties: [1, 6] },
    { id: 9, name: "Anxiety", specialties: [7] },
    { id: 10, name: "Vision Problems", specialties: [8] },
    { id: 11, name: "Back Pain", specialties: [4] },
    { id: 12, name: "Fatigue", specialties: [1, 2] }
  ];
  
  export const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      specialty: "Cardiology",
      specialtyId: 2,
      rating: 4.9,
      experience: 15,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
      bio: "Board-certified cardiologist specializing in preventive heart care",
      availableSlots: [
        { day: "Monday", times: ["09:00", "10:00", "14:00", "15:00"] },
        { day: "Tuesday", times: ["09:00", "11:00", "14:00"] },
        { day: "Wednesday", times: ["10:00", "11:00", "15:00", "16:00"] },
        { day: "Thursday", times: ["09:00", "14:00", "15:00"] },
        { day: "Friday", times: ["09:00", "10:00", "11:00"] }
      ]
    },
    {
      id: 2,
      name: "Dr. James Chen",
      specialty: "General Practice",
      specialtyId: 1,
      rating: 4.8,
      experience: 12,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
      bio: "Family medicine specialist with a holistic approach to healthcare",
      availableSlots: [
        { day: "Monday", times: ["08:00", "09:00", "13:00", "16:00"] },
        { day: "Tuesday", times: ["08:00", "10:00", "13:00", "14:00"] },
        { day: "Wednesday", times: ["09:00", "13:00", "15:00"] },
        { day: "Thursday", times: ["08:00", "09:00", "13:00", "16:00"] },
        { day: "Friday", times: ["08:00", "09:00", "10:00", "13:00"] }
      ]
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      specialtyId: 3,
      rating: 4.9,
      experience: 10,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
      bio: "Expert in medical and cosmetic dermatology",
      availableSlots: [
        { day: "Monday", times: ["10:00", "11:00", "15:00"] },
        { day: "Tuesday", times: ["09:00", "10:00", "14:00", "15:00"] },
        { day: "Wednesday", times: ["10:00", "14:00", "16:00"] },
        { day: "Thursday", times: ["09:00", "10:00", "15:00"] },
        { day: "Friday", times: ["10:00", "11:00", "14:00"] }
      ]
    },
    {
      id: 4,
      name: "Dr. Michael Thompson",
      specialty: "Orthopedics",
      specialtyId: 4,
      rating: 4.7,
      experience: 18,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop",
      bio: "Sports medicine and joint replacement specialist",
      availableSlots: [
        { day: "Monday", times: ["09:00", "13:00", "14:00"] },
        { day: "Tuesday", times: ["09:00", "10:00", "13:00"] },
        { day: "Wednesday", times: ["09:00", "14:00", "15:00"] },
        { day: "Thursday", times: ["10:00", "13:00", "14:00"] },
        { day: "Friday", times: ["09:00", "10:00", "13:00"] }
      ]
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      specialty: "Pediatrics",
      specialtyId: 5,
      rating: 5.0,
      experience: 14,
      image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=300&h=300&fit=crop",
      bio: "Compassionate care for children of all ages",
      availableSlots: [
        { day: "Monday", times: ["08:00", "09:00", "10:00", "14:00", "15:00"] },
        { day: "Tuesday", times: ["08:00", "09:00", "14:00", "15:00"] },
        { day: "Wednesday", times: ["08:00", "10:00", "14:00", "16:00"] },
        { day: "Thursday", times: ["08:00", "09:00", "10:00", "14:00"] },
        { day: "Friday", times: ["08:00", "09:00", "14:00", "15:00"] }
      ]
    },
    {
      id: 6,
      name: "Dr. David Kumar",
      specialty: "Neurology",
      specialtyId: 6,
      rating: 4.8,
      experience: 16,
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop",
      bio: "Specialist in headaches, seizures, and neurological disorders",
      availableSlots: [
        { day: "Monday", times: ["10:00", "11:00", "15:00"] },
        { day: "Tuesday", times: ["10:00", "14:00", "15:00"] },
        { day: "Wednesday", times: ["09:00", "11:00", "15:00"] },
        { day: "Thursday", times: ["10:00", "11:00", "14:00"] },
        { day: "Friday", times: ["10:00", "11:00", "15:00"] }
      ]
    },
    {
      id: 7,
      name: "Dr. Rachel Green",
      specialty: "Psychiatry",
      specialtyId: 7,
      rating: 4.9,
      experience: 11,
      image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=300&h=300&fit=crop",
      bio: "Mental health specialist focusing on anxiety and depression",
      availableSlots: [
        { day: "Monday", times: ["13:00", "14:00", "15:00", "16:00"] },
        { day: "Tuesday", times: ["13:00", "14:00", "15:00"] },
        { day: "Wednesday", times: ["13:00", "15:00", "16:00"] },
        { day: "Thursday", times: ["13:00", "14:00", "16:00"] },
        { day: "Friday", times: ["13:00", "14:00", "15:00"] }
      ]
    },
    {
      id: 8,
      name: "Dr. Robert Lee",
      specialty: "Ophthalmology",
      specialtyId: 8,
      rating: 4.8,
      experience: 13,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop",
      bio: "Expert in vision correction and eye disease treatment",
      availableSlots: [
        { day: "Monday", times: ["09:00", "10:00", "14:00"] },
        { day: "Tuesday", times: ["09:00", "11:00", "14:00", "15:00"] },
        { day: "Wednesday", times: ["10:00", "11:00", "14:00"] },
        { day: "Thursday", times: ["09:00", "10:00", "14:00", "15:00"] },
        { day: "Friday", times: ["09:00", "10:00", "11:00", "14:00"] }
      ]
    }
  ];
  
  export const testimonials = [
    {
      id: 1,
      name: "Jennifer Martinez",
      role: "Patient",
      content: "The symptom checker helped me find the right specialist immediately. Booking was seamless!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Mark Johnson",
      role: "Patient",
      content: "I love how easy it is to see available time slots and book appointments. No more phone calls!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Sarah Williams",
      role: "Patient",
      content: "The doctors are excellent and the platform makes managing appointments effortless.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
    }
  ];