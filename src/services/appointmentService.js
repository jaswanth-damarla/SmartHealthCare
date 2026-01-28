export const appointmentService = {
    createAppointment: async (appointmentData) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        appointment: appointmentData
      };
    },
  
    getAppointments: async (userId) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      return appointments.filter(a => a.userId === userId);
    },
  
    cancelAppointment: async (appointmentId) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
  
    rescheduleAppointment: async (appointmentId, newDate, newTime) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    }
  };