import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { X, MessageCircle } from "lucide-react";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, loading, changeAvailability } =
    useContext(AdminContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const doctorsPerPage = 4;

  useEffect(() => {
    if (aToken && doctors.length === 0) {
      getAllDoctors();
    }
  }, [aToken, doctors]);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? doctor.speciality === filter : true)
  );

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const openDoctorProfile = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeDoctorProfile = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 max-h-[80vh] w-full">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">
        All Doctors
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded-lg w-full sm:w-1/2 md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded-lg w-full sm:w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Specialties</option>
          {[...new Set(doctors.map((doc) => doc.speciality))].map(
            (speciality) => (
              <option key={speciality} value={speciality}>
                {speciality}
              </option>
            )
          )}
        </select>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {loading ? (
          <div className="text-center">Loading doctors...</div>
        ) : currentDoctors.length > 0 ? (
          currentDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2"
            >
              <div className="flex items-center gap-4">
                <img
                  src={doctor.image || "https://via.placeholder.com/100"}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover cursor-pointer"
                  onClick={() => openDoctorProfile(doctor)}
                />
                <div>
                  <h3 className="font-semibold">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.speciality}</p>
                </div>
              </div>
              <p>Experience: {doctor.experience}</p>
              <p>Fees: ${doctor.fees}</p>
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={doctor.available}
                    onChange={() => changeAvailability(doctor._id)}
                    className="cursor-pointer"
                  />
                  <span>Available</span>
                </label>
                <button className="flex items-center gap-1 text-blue-600 hover:underline text-sm">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No doctors available</div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block bg-white shadow-lg rounded-lg overflow-x-auto w-full max-h-[calc(100vh-4rem)]">
        <div className="overflow-y-auto max-h-[300px]">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Specialty</th>
                <th className="p-3">Experience</th>
                <th className="p-3">Fees</th>
                <th className="p-3">Available</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    Loading doctors...
                  </td>
                </tr>
              ) : currentDoctors.length > 0 ? (
                currentDoctors.map((doctor) => (
                  <tr key={doctor._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">
                      <img
                        src={doctor.image || "https://via.placeholder.com/100"}
                        alt={doctor.name}
                        className="w-12 h-12 rounded-full object-cover cursor-pointer"
                        onClick={() => openDoctorProfile(doctor)}
                      />
                    </td>
                    <td className="p-3">{doctor.name}</td>
                    <td className="p-3">{doctor.speciality}</td>
                    <td className="p-3">{doctor.experience}</td>
                    <td className="p-3">${doctor.fees}</td>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={doctor.available}
                        onChange={() => changeAvailability(doctor._id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="p-3">
                      <button
                        title="Message Doctor"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline text-sm focus:outline-none"
                        // onClick={() => console.log('Open chat with doctor')}
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="hidden md:inline">Message</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No doctors available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Inside Table */}
        <tfoot>
          <tr>
            <td colSpan="7">
              <div className="flex justify-center mt-4">
                {[
                  ...Array(Math.ceil(filteredDoctors.length / doctorsPerPage)),
                ].map((_, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 m-1 border rounded-lg transition ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </td>
          </tr>
        </tfoot>
      </div>

      {/* Mini Doctor Profile Popup */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative">
            <button
              onClick={closeDoctorProfile}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center">
              <img
                src={selectedDoctor.image || "https://via.placeholder.com/100"}
                alt="Doctor"
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
              <h3 className="text-lg font-semibold">{selectedDoctor.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {selectedDoctor.speciality}
              </p>
              <p className="text-sm text-gray-600">
                Experience: {selectedDoctor.experience} years
              </p>
              <p className="text-sm text-gray-600">
                Fees: ${selectedDoctor.fees}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {selectedDoctor.available ? "Available" : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
