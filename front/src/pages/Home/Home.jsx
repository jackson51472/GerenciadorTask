import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Bem-vindo ao Gerenciador de Tarefas!</h1>
            </header>
            <main className="home-main">
                <p>Esta é a página inicial do seu aplicativo. Você pode acessar o perfil ou outras páginas através dos links abaixo.</p>
                <Link to="/perfil" className="home-link">Ir para o Perfil</Link>
            </main>
        </div>
    );
};

export default Home;
