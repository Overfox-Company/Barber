'use client'
import { unstable_noStore as noStore } from 'next/cache';

import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
const SnackbarInitial = {
    message: '',
    type: "error" as "error" | "warning" | "info" | "success"
}


type ProviderProps = {
    children?: React.ReactNode;
    className?: string;
};
type ContextData = {
    menuSelecte: number;
    setMenuSelected: Dispatch<SetStateAction<number>>;
    user: any,
    setUser: Dispatch<SetStateAction<any>>
};
export const AppContext = createContext<ContextData>({
    menuSelecte: 0,
    setMenuSelected: () => { },
    user: {},
    setUser: () => { }
});

export const AppContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const initialMenu = parseInt(typeof localStorage != 'undefined' ? localStorage.getItem('menu') || '0' : "0")
    const [menuSelecte, setMenuSelected] = useState(initialMenu)
    const [user, setUser] = useState({})
    const [isSnackbarOpen, setSnackbarOpen] = useState({
        message: '',
        type: "success" as "error" | "warning" | "info" | "success"
    })




    return (
        <AppContext.Provider
            value={{
                user, setUser,
                menuSelecte, setMenuSelected
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
