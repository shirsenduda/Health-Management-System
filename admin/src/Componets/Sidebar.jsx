import React, { useContext } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const SideBar = ({ isShrunk }) => {
  const { aToken } = useContext(AdminContext);

  const menuItems = [
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

  return (
    <aside
      className={`h-auto transition-all duration-300 bg-white shadow-md border-r border-gray-200 ${
        isShrunk ? 'w-20' : 'w-64'
      }`}
    >
      {aToken && (
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
              <img src={item.icon} alt={item.label} className="h-6 w-6" />
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
