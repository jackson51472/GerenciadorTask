import React from 'react';
import './css/Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Bem-vindo ao Gerenciador de Tarefas</h1>
                <p className="home-description">
                    Organize suas tarefas de forma simples e eficiente. Gerencie suas tarefas diárias e alcance seus objetivos com facilidade.
                </p>
                <div className="home-buttons">
                    <Link to="/tarefa" className="home-button">Ver Tarefas</Link>
                    <Link to="/conta" className="home-button">Configurações da Conta</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
