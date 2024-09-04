// src/components/Sidebar.jsx
import React, {useEffect, useRef, useState} from 'react';
import '../css/Sidebar.scss';
import { FaHome, FaUser, FaTasks, FaSignOutAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(() => {
        const saved = localStorage.getItem('sidebarOpen');
        return saved === 'true'; // Corrigido para comparar com string 'true'
    });

    const toggleSidebar = () => {
        setIsOpen(prevState => {
            if (prevState === true) {
                return prevState;
            }
            const newState = !prevState;
            localStorage.setItem('sidebarOpen', newState); // Salva o estado no localStorage
            return newState;
        });
    };
    const sidebarRef = useRef(null);

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : 'close'}`}>
            <div className="nav-links">
                <div className="top-items">
                    <li className="icon-link" onClick={toggleSidebar}>
                        <FaHome color="#fff"/>
                        <Link to="/">
                            <span className={`link_name ${isOpen ? 'show' : 'hide'}`}>Home</span>
                        </Link>
                    </li>
                    <li className="icon-link" onClick={toggleSidebar}>
                        <FaUser color="#fff"/>
                        <Link to="/conta">
                            <span className={`link_name ${isOpen ? 'show' : 'hide'}`}>Conta</span>
                        </Link>
                    </li>
                    <li className="icon-link" onClick={toggleSidebar}>

                        <FaTasks color="#fff"/>
                        <Link to="/tarefa">
                            <span className={`link_name ${isOpen ? 'show' : 'hide'}`}>Tarefas</span>
                        </Link>
                    </li>
                </div>
                <div className="bottom-item">
                    <li className="icon-link" onClick={toggleSidebar}>

                        <FaSignOutAlt color="#fff"/>
                        <Link to="/login">
                            <span className={`link_name ${isOpen ? 'show' : 'hide'}`}>Logout</span>
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
