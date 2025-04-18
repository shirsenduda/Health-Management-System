/* eslint-disable no-undef */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Doctor Token (stored in localStorage)
  const [doctorToken, setDoctorToken] = useState(() => {
    return localStorage.getItem("dToken") || "";
  });

  // ✅ Appointments state
  const [appointments, setAppointments] = useState([]);

  // ✅ Update localStorage when doctorToken changes
  useEffect(() => {
    if (doctorToken) {
      localStorage.setItem("dToken", doctorToken);
    } else {
      localStorage.removeItem("dToken");
    }
  }, [doctorToken]);

  // ✅ Fetch appointments for logged-in doctor
  const getAppointments = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
        },
      });

      if (res.data.success) {
        setAppointments(res.data.appointments);
      } else {
        console.error("Failed to fetch appointments:", res.data.message);
      }
    } catch (error) {
      console.error("getAppointments error:", error.message);
    }
  };

  const value = {
    doctorToken,
    setDoctorToken,
    backendUrl,
    appointments,
    getAppointments,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
