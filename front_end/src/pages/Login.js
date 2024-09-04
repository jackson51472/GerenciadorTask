// src/components/Login.jsx
import React, { useState } from 'react';
import './css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulação de login, você pode adicionar sua lógica aqui.
        alert(`Login realizado com o e-mail: ${email}`);
    };

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <h2 className="login-title">Bem-vindo de volta!</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Entrar</button>
                    <div className="login-options">
                        <a href="#forgot-password">Esqueceu a senha?</a>
                        <a href="#signup">Criar conta</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
