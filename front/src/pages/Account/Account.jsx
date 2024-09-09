import React, { useState, useEffect } from 'react';
import { getStoredUser, updateUser, deleteUser } from '../../services/APIService';
import './Account.scss';

const Account = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ username: '' });

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await getStoredUser();
            setUser(storedUser);
            setEditedUser({ username: storedUser.username });
        };
        fetchUser();
    }, []);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(editedUser);
            setUser(editedUser);
            setIsEditing(false);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert('Erro ao atualizar usuário. \nMotivo do erro: Ainda não foi implementado o editor de user.');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser();
            alert('Conta deletada com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            alert('Erro ao deletar conta. \nMotivo do erro: Ainda não foi implementado o delete user.');
        }
    };

    if (!user) {
        return <p>Você deve estar logado para verificar sua conta!!!</p>;
    }

    return (
        <div className="account-container">
            <h1>Minha Conta</h1>
            <div className="account-info">
                <p><strong>Nome de usuário:</strong> {user.username}</p>
                {user.email && <p><strong>Email:</strong> {user.email}</p>}
            </div>

            <div className="account-actions">
                {!isEditing ? (
                    <>
                        <button className="edit-but" onClick={() => setIsEditing(true)}>Editar Perfil</button>
                        <button className="delete-button" onClick={handleDelete}>Deletar Conta</button>
                    </>
                ) : (
                    <form onSubmit={handleEditSubmit} className="edit-form">
                        <div className="form-group">
                            <label>Novo nome de usuário:</label>
                            <input
                                type="text"
                                name="username"
                                value={editedUser.username}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <button type="submit" className="save-button">Salvar</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancelar</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Account;
