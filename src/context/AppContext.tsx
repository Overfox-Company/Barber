'use client'
import ApiController from '@/controller/ApiController';

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
    setUser: Dispatch<SetStateAction<any>>;
    personal: any[],
    setPersonal: Dispatch<SetStateAction<any[]>>,
};
export const AppContext = createContext<ContextData>({
    menuSelecte: 0,
    setMenuSelected: () => { },
    user: {},
    setUser: () => { },
    personal: [],
    setPersonal: () => { },
});

export const AppContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const initialMenu = parseInt(typeof localStorage != 'undefined' ? localStorage.getItem('menu') || '0' : "0")
    const [menuSelecte, setMenuSelected] = useState(initialMenu)
    const [user, setUser] = useState({})
    const [personal, setPersonal] = useState<any[]>([])
    const [isSnackbarOpen, setSnackbarOpen] = useState({
        message: '',
        type: "success" as "error" | "warning" | "info" | "success"
    })
    const getData = async () => {
        const res = await ApiController.getPersonal()
        console.log("resultado")
        console.log(res)
        const { personal } = res.data
        if (personal) {
            setPersonal(personal)
        }
    }
    useEffect(() => {
        getData()

    }, [

    ])
    return (
        <AppContext.Provider
            value={{
                personal,
                setPersonal,
                user, setUser,
                menuSelecte, setMenuSelected
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
