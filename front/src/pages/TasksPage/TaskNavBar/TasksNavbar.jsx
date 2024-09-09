import React from 'react';
import { Link } from 'react-router-dom';
import './TasksNavbar.scss';

const TasksNavbar = () => {
    return (
        <div className="tasks-navbar">
            <Link to="/tarefa">Minhas Tarefas</Link>
            <Link to="/adicionar-tarefa">Adicionar</Link>
        </div>
    );
};

export default TasksNavbar;
