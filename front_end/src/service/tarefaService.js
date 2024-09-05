import axios from 'axios';

// Usando a variável de ambiente para a URL base da API
const API_URL_BASE = process.env.REACT_APP_API_URL;

export const getTarefas = async () => {
    try {
        // Especifica o caminho completo para a requisição
        const response = await axios.get(`${API_URL_BASE}/tarefa`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar as tarefas:', error);
        throw error;
    }
};

export const criarTarefa = async (novaTarefa) => {
    try {
        // Especifica o caminho completo para a requisição
        const response = await axios.post(`${API_URL_BASE}/tarefa`, novaTarefa);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar a tarefa:', error);
        throw error;
    }
};
