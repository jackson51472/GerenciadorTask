import React, { useState, useEffect } from 'react';
import { getStoredUser } from '../../services/APIService';
import './Account.scss';

const Account = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = getStoredUser();
        setUser(storedUser);
    }, []);

    if (!user) {
        return <p>Carregando...</p>; // Exibe um indicador de carregamento até que o usuário seja carregado
    }

    return (
        <div className="account-container">
            <h1>Minha Conta</h1>
            <div className="account-info">
                <p><strong>Nome de usuário:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email ? user.email : 'Não fornecido'}</p>
                {/* Adicione outros campos de usuário conforme necessário */}
            </div>

            <div className="account-actions">
                <button className="edit-button">Editar Perfil</button>
                <button className="change-password-button">Alterar Senha</button>
            </div>
        </div>
    );
};

export default Account;
