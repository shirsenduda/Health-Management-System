import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Context/AdminContext";
import {
  UserRound,
  CalendarCheck,
  Stethoscope,
  Ban,
  Clock,
  CheckCircle,
  Bell,
} from "lucide-react";
import { FaEdit } from "react-icons/fa";
import SendMessageCard from "../../Componets/SendMessageCard "; // Adjust path if needed

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="p-6 relative">
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
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clock className="text-gray-600" size={20} />
          Latest Appointments
          <Bell className="text-yellow-500 ml-2" size={18} />
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
                  <th className="px-4 py-3">Notification</th>
                </tr>
              </thead>
              <tbody>
                {dashData.latestAppointments.map((appt, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">{index + 1}</td>
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
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={appt?.docData?.image || "/placeholder-doctor.png"}
                          alt="doctor"
                          className="w-8 h-8 rounded-full object-cover border"
                        />
                        <span>{appt?.docData?.name || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{appt.slotDate}</td>
                    <td className="px-4 py-3">{appt.slotTime}</td>
                    <td className="px-4 py-3 cursor-pointer">
                      <FaEdit
                        className="text-gray-600 hover:text-blue-600 transition"
                        onClick={() => {
                          setSelectedUser(appt?.userData);
                          setIsModalOpen(true);
                        }}
                      />
                    </td>
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

      {/* Message Modal with SendMessageCard */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6">
            <h4 className="text-lg font-semibold mb-4">Send Message</h4>
            <p className="text-sm text-gray-600 mb-2">
              To: <span className="font-medium">{selectedUser?.name}</span>
            </p>

            <SendMessageCard
              selectedUserId={selectedUser._id}
              onMessageSent={() => {
                setIsModalOpen(false);
                setSelectedUser(null);
              }}
            />

            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
