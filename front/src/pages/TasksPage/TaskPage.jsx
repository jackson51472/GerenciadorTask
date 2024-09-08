import React, { useEffect, useState } from 'react';
import { getTasks } from '../../services/APIService';  // Importe a função getTasks
import TasksNavbar from './TaskNavBar/TasksNavbar';  // Importa o componente TasksNavbar
import TaskItem from './TaskItem/TaskItem'; // Certifique-se de que o caminho está correto
import './TaskPage.scss';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('ALL'); // Estado para o filtro

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks(); // Use a função do apiService
            const sortedTasks = response.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));
            const updatedTasks = sortedTasks.map(task => ({
                ...task,
                status: mapStatus(task.status),
            }));
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
    };

    const mapStatus = (status) => {
        switch (status) {
            case 'TO_DO':
                return 'Listar para começar';
            case 'IN_PROGRESS':
                return 'Em progresso';
            case 'DONE':
                return 'Terminado';
            default:
                return status;
        }
    };

    // Filtrar as tarefas com base no status selecionado
    const filteredTasks = filter === 'ALL' ? tasks : tasks.filter(task => task.status === mapStatus(filter));

    return (
        <div className="tasks-page">
            <TasksNavbar />
            <div className="task-list-container">
                <h1>Lista de Tarefas</h1>

                {/* Componente de filtro */}
                <div className="task-filter">
                    <label htmlFor="status-filter">Filtrar por status:</label>
                    <select
                        id="status-filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="ALL">Todos</option>
                        <option value="TO_DO">Listar para começar</option>
                        <option value="IN_PROGRESS">Em progresso</option>
                        <option value="DONE">Terminado</option>
                    </select>
                </div>

                <div className="task-list">
                    {filteredTasks.length === 0 ? (
                        <p>Nenhuma tarefa encontrada.</p>
                    ) : (
                        <ul>
                            {filteredTasks.map((task) => (
                                <TaskItem key={task.id} task={task} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskPage;
