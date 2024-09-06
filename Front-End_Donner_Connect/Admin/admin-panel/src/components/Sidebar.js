// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink exact to="/admins" activeClassName="active">
                            Admins
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/donationcamps" activeClassName="active">
                            Donation Camps
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/users" activeClassName="active">
                            Users
                        </NavLink>
                    </li>
                    {/* Add more navigation links as needed */}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
