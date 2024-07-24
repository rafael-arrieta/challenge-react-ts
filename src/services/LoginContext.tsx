import React, { createContext, useState, useContext, ReactNode } from 'react';
import { LoginContextType } from '../models/LoginContext.model';
import { UserData } from '../models/UserData.model';






// Crea el contexto con valores por defecto
const LoginContext = createContext<LoginContextType | undefined>(undefined);

const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const [userData, setUserData] = useState<UserData>({
        id: '',
        name: '',
        token: '',
        isAdmin: false,
    });

    const setUserDataInLocalStorage = (id: string, name: string, token: string, isAdmin: boolean) => {
        localStorage.setItem('userId', id);
        localStorage.setItem('userName', name);
        localStorage.setItem('userToken', token);
        localStorage.setItem('userIsAdmin', JSON.stringify(isAdmin));
    };

   
    const updateUserData = (id: string, name: string, token: string, isAdmin: boolean) => {
        setUserDataInLocalStorage(id, name, token, isAdmin);
        setIsLoggedIn(true);
        setUserData({ id, name, token, isAdmin });
    };

    const getUserData = (): UserData => {
        const id = localStorage.getItem('userId') || '';
        const name = localStorage.getItem('userName') || '';
        const token = localStorage.getItem('userToken') || '';
        const isAdmin = JSON.parse(localStorage.getItem('userIsAdmin') || 'false');
        return { id, name, token, isAdmin };
    };

    return (
        <LoginContext.Provider
        value={{
            isLoggedIn,
            setIsLoggedIn,
            updateUserData,
            getUserData,
            userData,
        }}
        >
        {children}
        </LoginContext.Provider>
    );
};

const useLoginContext = (): LoginContextType => {
    const context = useContext(LoginContext);
    if (context === undefined) {
        throw new Error('useLoginContext must be used within a LoginProvider');
    }
    return context;
};

export { LoginProvider, useLoginContext };