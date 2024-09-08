import React, { useState } from 'react';
import { createTask } from '../../../services/APIService'; // Verifique o caminho correto para o APIService
import TasksNavbar from "../TaskNavBar/TasksNavbar";
import './CriarTask.scss';

const CriarTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('TO_DO'); // Valor inicial
    const [expirationDate, setExpirationDate] = useState('');

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            console.log('Status selecionado:', status); // Verifique o valor do status aqui
            await createTask({
                title,
                description,
                status,
                expirationDate
            });
            setTitle('');
            setDescription('');
            setStatus('TO_DO');
            setExpirationDate('');
            alert('Tarefa adicionada com sucesso!');
        } catch (error) {
            const token = localStorage.getItem('token');
            console.log('Token armazenado:', token);

            if (error.response && error.response.status === 401) {
                alert('Você não está autorizado a adicionar tarefas. Verifique seu login.');
            } else {
                alert('Erro ao adicionar tarefa. Tente novamente.');
            }
        }
    };


    return (
        <div className="tasks-page">
            <TasksNavbar />
            <h1>Criar Tarefas</h1>
            <div className="task-form-container">
                <h2>Adicionar Nova Tarefa</h2>
                <form onSubmit={handleAddTask}>
                    <div className="form-group">
                        <label>Título:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descrição:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="TO_DO">A Fazer (TO_DO)</option>
                            <option value='IN_PROGRESS'>Em Progresso (IN_PROGRESS)</option>
                            <option value='DONE'>Concluída (DONE)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Data de Expiração:</label>
                        <input
                            type="datetime-local"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Adicionar Tarefa</button>
                </form>
            </div>
        </div>
    );
};

export default CriarTask;
