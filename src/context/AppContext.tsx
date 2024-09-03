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
    payments: any[],
    setPayments: Dispatch<SetStateAction<any[]>>,
    getData: () => void,
    customers: any[],
    setCustomers: Dispatch<SetStateAction<any[]>>,
};
export const AppContext = createContext<ContextData>({
    menuSelecte: 0,
    setMenuSelected: () => { },
    user: {},
    setUser: () => { },
    personal: [],
    setPersonal: () => { },
    payments: [],
    setPayments: () => { },
    getData: () => { },
    customers: [],
    setCustomers: () => { },


});

export const AppContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const initialMenu = parseInt(typeof localStorage != 'undefined' ? localStorage.getItem('menu') || '0' : "0")
    const [menuSelecte, setMenuSelected] = useState(initialMenu)
    const [user, setUser] = useState({})
    const [personal, setPersonal] = useState<any[]>([])
    const [payments, setPayments] = useState<any[]>([])
    const [customers, setCustomers] = useState<any[]>([])
    const [isSnackbarOpen, setSnackbarOpen] = useState({
        message: '',
        type: "success" as "error" | "warning" | "info" | "success"
    })
    const getData = async () => {
        try {
            const [resPersonal, resPayments, resCustomers] = await Promise.all([
                ApiController.getPersonal(),
                ApiController.getPayments(),
                ApiController.getCustomers()
            ]);

            const { payments } = resPayments.data || {};
            const { personal } = resPersonal.data || {};
            const { customers } = resCustomers.data || {};
            // console.log("logs")
            console.log(payments)
            if (payments) {
                setPayments(payments);
            }
            if (personal) {
                setPersonal(personal);
            }
            if (customers) {
                setCustomers(customers)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Manejar errores de manera adecuada aquí
        }
    };

    useEffect(() => {
        getData()

    }, [

    ])
    return (
        <AppContext.Provider
            value={{
                customers,
                setCustomers,
                getData,
                personal,
                setPersonal,
                user,
                setUser,
                menuSelecte,
                setMenuSelected,
                payments,
                setPayments
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
