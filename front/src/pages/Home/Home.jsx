import React from 'react';
import './Home.scss';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Bem-vindo ao Gerenciador de Tarefas!</h1>
            </header>
            <div className="warning-box">
                <p>Leia antes de começar a usar</p>
            </div>
            <main className="home-main">
                <div className="home-sections">
                    <section className="home-section">
                        <h2>O que é o projeto?</h2>
                        <p>Este é um projeto de estudo desenvolvido para gerenciar tarefas de forma eficiente e organizada.
                            Com ele, você pode criar, visualizar, editar e deletar tarefas conforme sua necessidade, ajudando
                            a entender melhor a aplicação prática de conceitos aprendidos.</p>
                    </section>
                    <section className="home-section">
                        <h2>Como criar um usuário?</h2>
                        <p>Para criar um usuário, acesse a página de login após isso clique em criar conta e preencha os
                            campos necessários com suas informações pessoais. Após o cadastro, você poderá fazer login e
                            começar a utilizar o gerenciador de tarefas.</p>
                    </section>
                    <section className="home-section">
                        <h2>Como criar e verificar tarefas?</h2>
                        <p>Depois de criar sua conta e fazer login, você pode ir até a página de tarefas para criar novas
                            atividades. Basta clicar no botão "Adicionar", preencher os detalhes e salvar. Além disso,
                            você pode visualizar todas as suas tarefas na lista e marcá-las como concluídas ou editá-las.</p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Home;
