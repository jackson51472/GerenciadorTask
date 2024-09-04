import React from 'react';
import TaskList from './component/TaskList';
import './css/Tarefa.scss';

const Tarefas = () => {
    return (
        <div className="tarefas-container">
            <div className="tarefas-wrapper">
                <h2 className="tarefas-title">Gerenciar Tarefas</h2>
                <TaskList />
            </div>
        </div>
    );
};

export default Tarefas;
