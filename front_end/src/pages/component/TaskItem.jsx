import React from 'react';
import '../css/Tarefa.scss'; // Importa o CSS unificado

const TaskItem = ({ task, index, onEdit, onDelete, onToggle }) => {
    return (
        <li className={`task-item ${task.concluida ? 'concluida' : ''}`}>
            <span onClick={() => onToggle(index)}>{task.nome}</span>
            <button onClick={() => onEdit(index)}>Editar</button>
            <button onClick={() => onDelete(index)}>Excluir</button>
        </li>
    );
};

export default TaskItem;
