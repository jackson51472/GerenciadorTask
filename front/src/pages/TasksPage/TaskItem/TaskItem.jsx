import React from 'react';
import { useNavigate } from 'react-router-dom'; // Adiciona a importação do useNavigate
import './TaskItem.scss'; // Certifique-se de que o caminho está correto

const TaskItem = ({ task }) => {
    const navigate = useNavigate(); // Inicializa o hook useNavigate

    const handleEdit = () => {
        navigate(`/task/${task.id}`); // Redireciona para a página de edição
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
