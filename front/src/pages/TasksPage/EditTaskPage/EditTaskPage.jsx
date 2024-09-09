import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, updateTask } from '../../../services/APIService';
import './EditTaskPage.scss';

const EditTaskPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({ title: '', description: '', status: '', expirationDate: '' });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const fetchedTask = await getTaskById(id);
                setTask(fetchedTask);
            } catch (error) {
                console.error('Erro ao buscar tarefa:', error);
            }
        };
        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTask(id, task);
            navigate('/tasks');
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
        }
    };

    return (
        <div className="edit-task-page">
            <h1>Editar Tarefa</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Descrição:
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Status:
                    <select
                        name="status"
                        value={task.status}
                        onChange={handleChange}
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
                        value={task.expirationDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default EditTaskPage;
