import React, { useEffect, useState } from 'react';
import { getTarefas } from '../../service/tarefaService';

const TaskList = () => {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const tarefasData = await getTarefas();
                setTarefas(tarefasData);
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
            }
        };

        fetchTarefas();
    }, []);

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <ul>
                {tarefas.length > 0 ? (
                    tarefas.map((tarefa) => (
                        <li key={tarefa.id}>
                            <h3>{tarefa.titulo}</h3>
                            <p>{tarefa.descricao}</p>
                            <p>Status: {tarefa.status}</p>
                        </li>
                    ))
                ) : (
                    <p>Não há tarefas disponíveis.</p>
                )}
            </ul>
        </div>
    );
};

export default TaskList;
