import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: Array<string>;
    avatar: string;
    createdAt: string;
    coverImage: string;
}

interface UserProfileContextType {
    userProfile: UserProfile | null;
    setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
    fetchUserProfile: () => void;
}

const UserProfileContext = createContext<UserProfileContextType | null>(null);

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (!context) {
        throw new Error('useUserProfile must be used within a UserProfileProvider');
    }
    return context;
};

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    const { user } = useAuth();

    useEffect(() => {
        if (user?.token) {
            fetchUserProfile();
        }
    }, [user?.token]);

    const fetchUserProfile = useCallback(async () => {
        const savedUser = localStorage.getItem('user');
        const parsedToken = savedUser && JSON.parse(savedUser).token;

        try {
            const response = await api.get('/user/getBasicProfile', {
                headers: {
                    Authorization: `Bearer ${parsedToken}`,
                },
            });
            setUserProfile(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }, []);

    return (
        <UserProfileContext.Provider value={{ userProfile, setUserProfile, fetchUserProfile }}>
            {children}
        </UserProfileContext.Provider>
    );
};
