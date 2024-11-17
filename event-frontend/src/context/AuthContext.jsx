import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [rollNo, setRollNo] = useState()
    const [teamName, setTeamName] = useState()

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, rollNo, setRollNo, teamName, setTeamName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
