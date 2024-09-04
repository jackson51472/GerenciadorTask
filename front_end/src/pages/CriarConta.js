import React, { useState } from 'react';
import '../css/CriarConta.css';

const CriarConta = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar dados do formulário
        console.log('Dados do formulário:', formData);
    };

    return (
        <div className="criar-conta-container">
            <div className="criar-conta-wrapper">
                <h2 className="criar-conta-title">Criar Conta</h2>
                <form className="criar-conta-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmacaoSenha">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmacaoSenha"
                            name="confirmacaoSenha"
                            value={formData.confirmacaoSenha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="criar-conta-button">Criar Conta</button>
                </form>
            </div>
        </div>
    );
};

export default CriarConta;
