import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskItem.scss';

const TaskItem = ({ task }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/task/${task.id}`);
    };

    const formatStatus = (status) => {
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

    return (
        <li key={task.id} className="task-item">
            <button className="edit-button" onClick={handleEdit}>Editar</button>
            <div className="task-details">
                <p className="task-label">Tarefa:</p>
                <h2 className="task-title">{task.title}</h2>
                <p><strong>Status:</strong> {formatStatus(task.status)}</p>
                <p><strong>Data de Expiração:</strong> {new Date(task.expirationDate).toLocaleString()}</p>
            </div>
        </li>
    );
};

export default TaskItem;
