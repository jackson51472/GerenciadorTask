import React, { useState } from 'react';
import { createTask } from '../../../services/APIService';
import './CriarTask.scss';
import { useNavigate } from 'react-router-dom';
import TasksNavbar from "../TaskNavBar/TasksNavbar";

const CriarTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('TO_DO');
    const [expirationDate, setExpirationDate] = useState('');
    const navigate = useNavigate();

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            console.log('Status selecionado:', status);
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
            navigate('/tasks');
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
        <div className="edit-task-page">
            <TasksNavbar />
            <h1>Criar Tarefa</h1>
            <div className="task-form-container">
                <form onSubmit={handleAddTask}>
                    <label>
                        Título:
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Descrição:
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Status:
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="TO_DO">Listar para começar</option>
                            <option value="IN_PROGRESS">Em progresso</option>
                            <option value="DONE">Terminado</option>
                        </select>
                    </label>
                    <label>
                        Data de Expiração:
                        <input
                            type="datetime-local"
                            name="expirationDate"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default CriarTask;
