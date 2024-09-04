import React, { useState, useEffect } from 'react';
import '../css/Tarefa.scss'; // Importa o CSS unificado

const TaskForm = ({ onAddTask, onEditTask, editIndex, initialData }) => {
    const [taskName, setTaskName] = useState(initialData || '');

    useEffect(() => {
        if (editIndex !== null) {
            setTaskName(initialData);
        }
    }, [editIndex, initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            onEditTask(editIndex, taskName);
        } else {
            onAddTask(taskName);
        }
        setTaskName('');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Nome da Tarefa"
                required
            />
            <button type="submit">{editIndex !== null ? 'Salvar' : 'Adicionar'}</button>
        </form>
    );
};

export default TaskForm;
