import React, { useContext } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { DoctorContext } from '../Context/DoctorContext';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { ImProfile } from 'react-icons/im';
import { BiSolidMessage } from "react-icons/bi";
const SideBar = ({ isShrunk }) => {
  const { aToken } = useContext(AdminContext);
  const { doctorToken } = useContext(DoctorContext);

  const adminMenuItems = [
    {
      path: '/admin-dashboard',
      icon: '/assets/assets_admin/home_icon.svg',
      label: 'Dashboard',
    },
    {
      path: '/all-appointments',
      icon: '/assets/assets_admin/appointment_icon.svg',
      label: 'Appointments',
    },
    {
      path: '/add-doctor',
      icon: '/assets/assets_admin/add_icon.svg',
      label: 'Add Doctor',
    },
    {
      path: '/doctor-list',
      icon: '/assets/assets_admin/people_icon.svg',
      label: 'Doctors List',
    },
  ];

  const doctorMenuItems = [
    {
      path: '/doctor-dashboard',
      icon: '/assets/assets_admin/home_icon.svg',
      label: 'Dashboard',
    },
    {
      path: '/doctor-profile',
      icon: <ImProfile className="text-xl text-black-600" />,
      label: 'Profile',
    },
    {
      path: '/doctor-Appointment',
      icon: '/assets/assets_admin/appointment_icon.svg',
      label: 'Appointments',
    },
    {
      path: '/doctor-message',
      icon: <BiSolidMessage className="text-xl text-black-600" />,
      label: 'Messages',
    },
  ];

  const menuItems = aToken
    ? adminMenuItems
    : doctorToken
    ? doctorMenuItems
    : [];

  return (
    <aside
      className={`h-auto transition-all duration-300 bg-white shadow-md border-r border-gray-200 ${
        isShrunk ? 'w-20' : 'w-64'
      }`}
    >
      {(aToken || doctorToken) && (
        <ul className="space-y-2 p-4 pt-6">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition duration-200 ${
                  isActive ? 'bg-gray-200 font-semibold' : ''
                }`
              }
              data-tooltip-id={`tooltip-${index}`}
              data-tooltip-content={item.label}
              data-tooltip-place="right"
            >
              {/* Render icon: if string => image, else render as React icon */}
              {typeof item.icon === 'string' ? (
                <img src={item.icon} alt={item.label} className="h-6 w-6" />
              ) : (
                item.icon
              )}
              {!isShrunk && <span className="text-base">{item.label}</span>}
              {isShrunk && (
                <Tooltip id={`tooltip-${index}`} className="z-50 text-sm" />
              )}
            </NavLink>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default SideBar;
