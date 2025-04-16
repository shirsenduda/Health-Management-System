import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminContext";
import {
  UserRound,
  CalendarCheck,
  Stethoscope,
  Ban,
  Clock,
  CheckCircle,
} from "lucide-react";

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  const stats = [
    {
      title: "Total Doctors",
      count: dashData.doctors || 0,
      icon: <Stethoscope className="text-blue-500" size={28} />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Patients",
      count: dashData.patients || 0,
      icon: <UserRound className="text-green-500" size={28} />,
      bg: "bg-green-100",
    },
    {
      title: "Appointments",
      count: dashData.appointments || 0,
      icon: <CalendarCheck className="text-purple-500" size={28} />,
      bg: "bg-purple-100",
    },
    {
      title: "Cancelled",
      count: dashData.cancelledAppointments || 0,
      icon: <Ban className="text-red-500" size={28} />,
      bg: "bg-red-100",
    },
    {
      title: "Payments Success",
      count: dashData.paymentComplete || 0,
      icon: <CheckCircle className="text-emerald-500" size={28} />,
      bg: "bg-emerald-100",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl shadow-sm ${item.bg} flex items-center justify-between`}
          >
            <div>
              <p className="text-gray-600">{item.title}</p>
              <h3 className="text-2xl font-bold">{item.count}</h3>
            </div>
            {item.icon}
          </div>
        ))}
      </div>

      {/* Latest Appointments */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clock className="text-gray-600" size={20} />
          Latest Appointments
        </h3>

        <div className="bg-white p-4 rounded-xl shadow-lg max-h-[400px] overflow-y-auto border border-gray-200">
          {dashData?.latestAppointments?.length > 0 ? (
            <table className="min-w-full table-auto text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Doctor</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {dashData.latestAppointments.map((appt, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">{index + 1}</td>

                    {/* Patient Name & Image */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={appt?.userData?.image || "/placeholder-user.png"}
                          alt="patient"
                          className="w-8 h-8 rounded-full object-cover border"
                        />
                        <span>{appt?.userData?.name || "N/A"}</span>
                      </div>
                    </td>

                    {/* Doctor Name & Image */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            appt?.docData?.image || "/placeholder-doctor.png"
                          }
                          alt="doctor"
                          className="w-8 h-8 rounded-full object-cover border"
                        />
                        <span>{appt?.docData?.name || "N/A"}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3">{appt.slotDate}</td>
                    <td className="px-4 py-3">{appt.slotTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-sm text-center">
              No recent appointments.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
