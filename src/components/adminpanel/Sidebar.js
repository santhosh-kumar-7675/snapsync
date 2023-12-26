import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <ul>
        <li className={location.pathname === '/admin/home' ? 'active' : ''}>
          <NavLink to="/admin/home" style={{color:'inherit'}}>Home</NavLink>
        </li>
        <li className={location.pathname === '/admin/users' ? 'active' : ''}>
          <NavLink to="/admin/users" style={{color:'inherit'}}>Users</NavLink>
        </li>
        <li className={location.pathname === '/admin/posts' ? 'active' : ''}>
          <NavLink to="/admin/posts" style={{color:'inherit'}}>Posts</NavLink>
        </li>
        <li className={location.pathname === '/admin/approval' ? 'active' : ''}>
          <NavLink to="/admin/approval" style={{color:'inherit'}}>Approval</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
