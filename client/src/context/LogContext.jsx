import React, { useState, createContext, useContext } from 'react';

const LogContext = createContext(null);

export const LogContextProvider = (props) => {
    const [user, setUser] = useState(null);

    return (
        <LogContext.Provider value={{ user, setUser }}>
            {props.children}
        </LogContext.Provider>
    );
};

export const useLogData = () => useContext(LogContext);
