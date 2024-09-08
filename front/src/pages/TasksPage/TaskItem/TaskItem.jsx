import React from 'react';
import './TaskItem.scss'; // Certifique-se de que o caminho está correto

const TaskItem = ({ task }) => {
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
        <li className="task-item">
            <button className="edit-button">Editar</button>
            <div className="task-info">
                <p className="task-item-title">Tarefa: {task.title}</p>
                <p className="task-item-description"><strong>Descrição:</strong> {task.description}</p>
                <p className="task-item-status"><strong>Status:</strong> {formatStatus(task.status)}</p>
                <p className="task-item-expiration-date"><strong>Data de Expiração:</strong> {new Date(task.expirationDate).toLocaleString()}</p>
            </div>
        </li>
    );
};

export default TaskItem;
