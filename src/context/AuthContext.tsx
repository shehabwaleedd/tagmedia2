'use client'

import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { User } from '@/types/hooks';

interface AuthContextType {
    error: string;
    isLoggedIn: boolean;
    loading: boolean;
    handleLoginSuccess: (token: string, userData: User) => void;
    handleLogout: () => void;
    hasAnimationShown: boolean;
    setHasAnimationShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
interface AuthProviderProps {
    children: ReactNode;
}




export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasAnimationShown, setHasAnimationShown] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            setIsLoggedIn(false);
            setError('No token found');
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/verify`, {
                headers: { token }
            });

            if (response.data.message === "success") {
                setIsLoggedIn(true);
            } else {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                setError('Authentication failed');
            }
        } catch (error: any) {
            console.error('Authentication error:', error);
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setError(error.message || 'Unknown authentication error');
        }
        setLoading(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkAuth();
        }
    }, []);


    const handleLoginSuccess = (token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('hasAnimationShown', 'true');
        setIsLoggedIn(true);
        router.push('/account');
    };



    const handleLogout = () => {
        const clearLocalStorageItems = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('hasAnimationShown');
        };
        const resetAuthStates = () => {
            setIsLoggedIn(false);
        };
        clearLocalStorageItems();
        resetAuthStates();
        router.push('/login');
    };

    const authValue: AuthContextType = useMemo(() => ({
        isLoggedIn,
        loading,
        handleLoginSuccess,
        handleLogout,
        hasAnimationShown,
        setHasAnimationShown,
        error,
    }), [isLoggedIn, loading, error]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
