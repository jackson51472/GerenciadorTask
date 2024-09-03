// src/components/Sidebar.jsx
import React, { useState } from 'react';
import '../css/Sidebar.scss';
import { FaHome, FaUser, FaTasks, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'close'}`}>
            <div className="nav-links">
                <div className="top-items">
                    <li className="icon-link" onClick={toggleSidebar}>
                        <FaHome color="#fff" />
                        <span className={`link_name ${isOpen ? 'show' : 'hide'}`}>Home</span>
                    </li>
                    <li className="icon-link" onClick={toggleSidebar}>
                        <FaUser color="#fff" />
                        <span className={`link_name ${isOpen ? 'show' : 'hide'}`}>Conta</span>
                    </li>
                    <li className="icon-link" onClick={toggleSidebar}>
                        <FaTasks color="#fff" />
                        <span className={`link_name ${isOpen ? 'show' : 'hide'}`}>Tarefas</span>
                    </li>
                </div>
                <div className="bottom-item">
                    <li className="icon-link" onClick={toggleSidebar}>
                        <FaSignOutAlt color="#fff" />
                        <span className={`link_name ${isOpen ? 'show' : 'hide'}`}>Logout</span>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
