import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import '../css/Tarefa.scss';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [initialData, setInitialData] = useState('');

    const handleAddTask = (taskName) => {
        setTasks([...tasks, { nome: taskName, concluida: false }]);
    };

    const handleEditTask = (index, taskName) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, nome: taskName } : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
        setInitialData('');
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleToggleConcluida = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, concluida: !task.concluida } : task
        );
        setTasks(updatedTasks);
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
        setInitialData(tasks[index].nome);
    };

    return (
        <div className="task-list-container">
            <TaskForm
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                editIndex={editIndex}
                initialData={initialData}
            />
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        task={task}
                        index={index}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteTask}
                        onToggle={handleToggleConcluida}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
