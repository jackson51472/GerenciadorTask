import { useState, useEffect } from 'react';
import { getStoredUser } from './APIService';

export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = getStoredUser();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return { user };
};
