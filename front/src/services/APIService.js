import axios from 'axios';


const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

const getUsers = async () => {
    try {
        const response = await apiClient.get('/users');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar usuário com ID ${id}:`, error);
        throw error;
    }
};

const createUser = async (userData) => {
    try {
        const response = await apiClient.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

const updateUser = async (id, userData) => {
    try {
        const response = await apiClient.put(`/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        await apiClient.delete(`/users/${id}`);
        console.log(`Usuário com ID ${id} excluído com sucesso.`);
    } catch (error) {
        console.error(`Erro ao excluir usuário com ID ${id}:`, error);
        throw error;
    }
};

const loginUser = async (username, password) => {
    try {
        const response = await apiClient.post('/auth/login', { username, password });

        const { token } = response.data;

        if (!token) {
            throw new Error('Token não recebido do servidor.');
        }

        localStorage.setItem('token', token);

        const userData = {
            username,
            ...response.data
        };
        localStorage.setItem('user', JSON.stringify(userData));

        return userData;
    } catch (error) {
        // Adicione informações detalhadas do erro
        console.error('Erro ao fazer login:', {
            message: error.message,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data,
            } : undefined,
            request: error.request,
            stack: error.stack,
        });

        // Mostre uma mensagem amigável para o usuário, se necessário
        alert('Houve um problema ao tentar fazer login. Por favor, tente novamente mais tarde.');

        throw error; // Re-throws error to allow further handling
    }
};


const logoutUser = () => {
    localStorage.removeItem('user');
};

const getStoredUser = () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
        console.warn('Nenhum usuário armazenado encontrado no localStorage.');
        return null;
    }

    try {
        const parsedUser = JSON.parse(storedUser);
        if (!parsedUser.username) {
            console.error('Usuário armazenado não tem o campo username.');
            return null;
        }
        return parsedUser;
    } catch (error) {
        console.error('Erro ao analisar o usuário armazenado:', error);
        return null;
    }
};


const createTask = async (taskData) => {
    try {
        console.log('Criando tarefa com dados:', taskData);
        const response = await apiClient.post('/task', taskData);
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        throw error;
    }
};

const getTasks = async () => {
    try {
        const response = await apiClient.get('/task');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
    }
};


export {
    getTasks,
    createTask,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    getStoredUser,
};
