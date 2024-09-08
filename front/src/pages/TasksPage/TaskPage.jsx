
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TasksNavbar from './TaskNavBar/TasksNavbar';  // Importa o componente TasksNavbar
import './TaskPage.scss';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
    };

    return (
        <div className="tasks-page">
            <TasksNavbar />
            <div className="task-list-container">
                <h1>Lista de Tarefas</h1>
                <div className="task-list">
                    {tasks.length === 0 ? (
                        <p>Nenhuma tarefa encontrada.</p>
                    ) : (
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id} className="task-item">
                                    <h2>{task.title}</h2>
                                    <p><strong>Descrição:</strong> {task.description}</p>
                                    <p><strong>Status:</strong> {task.status}</p>
                                    <p><strong>Data de Expiração:</strong> {new Date(task.expirationDate).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskPage;
