import React, { useState } from 'react';
import './css/Conta.scss';

const Conta = () => {
    const [formData, setFormData] = useState({
        nome: 'example',
        email: 'example@example.com',
        senha: '',
        novaSenha: '',
        confirmarNovaSenha: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados atualizados:', formData);
    };

    return (
        <div className="configuracoes-conta-container">
            <div className="configuracoes-conta-wrapper">
                <h2 className="configuracoes-conta-title">Configurações da Conta</h2>
                <form className="configuracoes-conta-form" onSubmit={handleSubmit}>
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
                        <label htmlFor="senha">Senha Atual</label>
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
                        <label htmlFor="novaSenha">Nova Senha</label>
                        <input
                            type="password"
                            id="novaSenha"
                            name="novaSenha"
                            value={formData.novaSenha}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmarNovaSenha">Confirmar Nova Senha</label>
                        <input
                            type="password"
                            id="confirmarNovaSenha"
                            name="confirmarNovaSenha"
                            value={formData.confirmarNovaSenha}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="configuracoes-conta-button">Salvar Alterações</button>
                </form>
            </div>
        </div>
    );
};

export default Conta;
