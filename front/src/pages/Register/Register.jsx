import React, { useState } from 'react';
import { createUser, loginUser } from '../../services/APIService';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import './Register.scss';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Inicialize useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await createUser({ username, password });
            const userData = await loginUser(username, password);
            setSuccess('Conta criada com sucesso e você está logado!');

            navigate('/perfil');
            window.location.reload();

        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Erro ao registrar usuário. Tente novamente.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <form className="register-form" onSubmit={handleRegister}>
                    <h2>Registrar</h2>
                    <div className="form-group">
                        <label>Nome de Usuário:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Registrar</button>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
