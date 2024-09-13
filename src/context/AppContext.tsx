'use client'
import ApiController from '@/controller/ApiController';
import { useRouter } from 'next/navigation';
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
    logOut: any,
    login: any,
    isSnackbarOpen: typeof SnackbarInitial,
    setSnackbarOpen: Dispatch<SetStateAction<typeof SnackbarInitial>>,
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
    logOut: () => { },
    login: () => { },
    isSnackbarOpen: SnackbarInitial,
    setSnackbarOpen: () => { },

});

export const AppContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const router = useRouter()
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
            // console.log(payments)
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
    }, [])
    const login = (user: string, pass: string) => {
        //console.log(user)
        if (user.toLocaleLowerCase() === 'luis' && pass === 'Haircut2024') {
            localStorage.setItem("ad", "Luis")
            router.push("/")
        } else {
            setSnackbarOpen({ message: "invalid credentials", type: "error" })
        }
    }
    const logOut = () => {
        localStorage.removeItem("ad")
        router.refresh()
        window.location.reload()
    }
    return (
        <AppContext.Provider
            value={{
                isSnackbarOpen,
                setSnackbarOpen,
                logOut,
                login,
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
