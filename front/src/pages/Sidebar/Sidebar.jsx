import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoredUser } from '../../services/APIService';
import { FiLogIn, FiUser, FiHome, FiList, FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';  // Adicione os ícones de Home e Tarefas
import './Sidebar.scss';

const Sidebar = () => {
    const [user, setUser] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const storedUser = getStoredUser();
        setUser(storedUser);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isCollapsed ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </button>
            <ul>
                <li>
                    <Link to="/">
                        <FiHome className="icon" />
                        {!isCollapsed && "Home"}
                    </Link>
                </li>
                <li>
                    <Link to="/tarefas">
                        <FiList className="icon" />
                        {!isCollapsed && "Tarefas"}
                    </Link>
                </li>
                {!user ? (
                    <li>
                        <Link to="/login">
                            <FiLogIn className="icon" />
                            {!isCollapsed && "Login"}
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Link to="/perfil">
                            <FiUser className="icon" />
                            {!isCollapsed && "Conta"}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
