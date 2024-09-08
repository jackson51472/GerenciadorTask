import React, { useState } from 'react';
import { loginUser } from '../../services/APIService'; // Importe a função loginUser
import './Login.scss';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await loginUser(username, password);

            // Recarrega a página e redireciona para a página de perfil
            window.location.reload();
            window.location.href = '/perfil'; // Redireciona para a página de perfil

        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Erro ao fazer login. Tente novamente.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <label>Nome de Usuário:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    <div className="button-container">
                        <button type="submit">Entrar</button>
                        <a href="/register" className="register-button">Criar uma conta</a> {/* Botão estilizado */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
