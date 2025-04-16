import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { X } from "lucide-react";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileType, setProfileType] = useState("");

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const filteredAppointments = appointments?.filter((item) => {
    const patient = item.userData?.name?.toLowerCase() || "";
    const doctor = item.docData?.name?.toLowerCase() || "";
    return (
      patient.includes(searchTerm.toLowerCase()) ||
      doctor.includes(searchTerm.toLowerCase())
    );
  });

  const openProfileCard = (profileData, type) => {
    setSelectedProfile(profileData);
    setProfileType(type);
  };

  const closeProfileCard = () => {
    setSelectedProfile(null);
    setProfileType("");
  };

  return (
    <div className="w-full p-6 bg-[#F8F9FD] max-h-[80vh]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">
          All Appointments ({filteredAppointments?.length || 0})
        </h2>
        <input
          type="text"
          placeholder="Search by patient or doctor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-80 text-sm"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <div className="max-h-[320px] overflow-y-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#F5F6FA] text-left text-gray-600 text-sm">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Fees</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments?.map((item, index) => (
                <tr key={item._id} className="border-t hover:bg-gray-50 text-sm">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={item.userData?.image || "/default-user.png"}
                      alt="patient"
                      className="w-8 h-8 rounded-full object-cover cursor-pointer"
                      onClick={() => openProfileCard(item.userData, "patient")}
                    />
                    <span>{item.userData?.name || "N/A"}</span>
                  </td>
                  <td className="px-4 py-3">
                    {calculateAge(item.userData?.dob) || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {item.slotDate}, {item.slotTime}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={item.docData?.image || "/default-doctor.png"}
                      alt="doctor"
                      className="w-8 h-8 rounded-full object-cover cursor-pointer"
                      onClick={() => openProfileCard(item.docData, "doctor")}
                    />
                    <span>{item.docData?.name || "N/A"}</span>
                  </td>
                  <td className="px-4 py-3">${item.amount || "0"}</td>
                  <td className="px-4 py-3">
                    {item.cancelled ? (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                        Cancelled
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                        Confirmed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {item.cancelled ? (
                      <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                        Cancel
                      </span>
                    ) : item.payment ? (
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                        Paid
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!item.cancelled && !item.payment && (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Cancel Appointment"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No appointments found.
          </div>
        )}
      </div>

      {/* Mini Profile Popup */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative">
            <button
              onClick={closeProfileCard}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center">
              <img
                src={selectedProfile?.image || "/default-user.png"}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
              <h3 className="text-lg font-semibold">
                {profileType === "doctor" ? "Dr. " : ""}
                {selectedProfile?.name || "N/A"}
              </h3>
              {selectedProfile?.email && (
                <p className="text-sm text-gray-600">{selectedProfile.email}</p>
              )}
              {selectedProfile?.dob && profileType === "patient" && (
                <p className="text-sm text-gray-600 mt-1">
                  Age: {calculateAge(selectedProfile.dob)}
                </p>
              )}
              {profileType === "doctor" &&
                selectedProfile?.specialization && (
                  <p className="text-sm text-gray-600 mt-1">
                    Specialty: {selectedProfile.specialization}
                  </p>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
