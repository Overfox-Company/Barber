'use client'
import { NextPage } from 'next'
import ListButtons from './components/ListButtons'
import { CloseButton, SideMenuButton } from '../UI/Buttons'
import UserData from './components/UserData'
import LogOutIcon from '@/icons/LogOutIcon'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { usePathname, useRouter } from "next/navigation";
import UserIcon from '@/icons/UserIcon'
import { AppContext } from '@/context/AppContext'

interface Props {
    mobile?: boolean,
    setClose?: Dispatch<SetStateAction<boolean>>

}

const SideMenu: NextPage<Props> = ({ mobile, setClose }) => {
    const [show, setShow] = useState(false)
    const pathname = usePathname(); // Obtener la ruta actual
    const router = useRouter()
    const { logOut } = useContext(AppContext)
    // Define la ruta específica donde no quieres que se renderice el SideMenu
    // Cambia "/ruta-especifica" por la ruta que quieras
    const [isLogged, setIsLogged] = useState(true)
    useEffect(() => {

        const storage = localStorage.getItem("ad")
        if (storage === 'Luis') {
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
        const hideSideMenu = pathname === "/" || window.innerWidth < 438
        setTimeout(() => {
            setShow(hideSideMenu)
        }, 100)
    }, [pathname])

    return show ? <div style={{
        backgroundColor: 'white',
        height: mobile ? '92vh' : '100vh',
        paddingTop: `${mobile ? '2vh' : "10vh"}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        paddingRight: `${!mobile ? '3vh' : '2vh'}`,
        paddingLeft: `${!mobile ? '3vh' : '2vh'}`,
    }}>
        {mobile && setClose ? <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CloseButton onClick={() => setClose(false)} />
        </Box> : null}
        <UserData isLogged={isLogged} />
        <ListButtons setClose={setClose} isLogged={isLogged} />

        {isLogged ?
            <SideMenuButton icon={
                <LogOutIcon size={40} />
            } logOut onClick={() => logOut()}>
                Log out
            </SideMenuButton>
            :
            <SideMenuButton icon={
                <UserIcon size={25} />
            } logOut onClick={() => { setClose && setClose(false), router.push("/login") }}>
                Sig In
            </SideMenuButton>
        }

    </div> : null
}

export default SideMenu