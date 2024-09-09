import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskItem.scss';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importando ícones de seta

const TaskItem = ({ task }) => {
    const [showDescription, setShowDescription] = useState(false);
    const navigate = useNavigate();

    const handleEdit = () => {
        if (task && task.id) {
            navigate(`/task/${task.id}`);
        } else {
            console.error('ID da tarefa não disponível.');
        }
    };

    const toggleDescription = () => {
        setShowDescription(!showDescription);
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
                <div className="task-toggle" onClick={toggleDescription}>
                    {showDescription ? <FaChevronUp /> : <FaChevronDown />}
                    <span>{showDescription ? 'Menos' : 'Mais'}</span>
                </div>
                {showDescription && (
                    <div className="task-description">
                        <p><strong>Descrição:</strong> {task.description}</p>
                    </div>
                )}
            </div>
        </li>
    );
};

export default TaskItem;
