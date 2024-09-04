// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './pages/component/Sidebar';
import Home from './pages/Home';
import Conta from './pages/Conta';
import Tarefa from './pages/Tarefa';
import Login from './pages/Login';  // Importa a página de login

const App = () => {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1, marginLeft: '32px' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/conta" element={<Conta />} />
                        <Route path="/tarefa" element={<Tarefa />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
