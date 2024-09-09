import React, { useEffect, useState } from 'react';
import { getTasks } from '../../services/APIService';
import TasksNavbar from './TaskNavBar/TasksNavbar';
import TaskItem from './TaskItem/TaskItem';
import './TaskPage.scss';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredTasks = tasks
        .filter(task => filter === 'ALL' || task.status === mapStatus(filter))
        .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="tasks-page">
            <TasksNavbar />
            <div className="task-list-container">
                <h1>Lista de Tarefas</h1>

                <div className="task-filter-container">
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

                    <div className="task-search">
                        <label htmlFor="search"></label>
                        <input
                            id="search"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar tarefas"
                        />
                    </div>
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
