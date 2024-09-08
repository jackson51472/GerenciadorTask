import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/APIService';
import './RightUser.scss';
import { FiUser, FiLogOut } from 'react-icons/fi';

const RightUser = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        window.location.reload();
    };

    return (
        <div className="right-user">
            <FiUser className="user-icon" />
            {user ? (
                <>
                    <span className="username">{user.username}</span>
                    <button className="logout-button" onClick={handleLogout}>
                        <FiLogOut className="logout-icon" />
                        Sair
                    </button>
                </>
            ) : (
                <span className="not-logged-in">Não logado</span>
            )}
        </div>
    );
};

export default RightUser;
