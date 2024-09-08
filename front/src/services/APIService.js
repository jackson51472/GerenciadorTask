import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
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

        const userData = {
            username,
            ...response.data
        };

        localStorage.setItem('user', JSON.stringify(userData));

        return userData;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
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

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    getStoredUser,
};
