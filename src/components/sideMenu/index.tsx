'use client'
import { NextPage } from 'next'
import ListButtons from './components/ListButtons'
import { CloseButton, SideMenuButton } from '../UI/Buttons'
import UserData from './components/UserData'
import LogOutIcon from '@/icons/LogOutIcon'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { usePathname } from "next/navigation";
interface Props {
    mobile?: boolean,
    setClose?: Dispatch<SetStateAction<boolean>>

}

const SideMenu: NextPage<Props> = ({ mobile, setClose }) => {
    const [show, setShow] = useState(false)
    const pathname = usePathname(); // Obtener la ruta actual

    // Define la ruta específica donde no quieres que se renderice el SideMenu
    // Cambia "/ruta-especifica" por la ruta que quieras

    useEffect(() => {
        const hideSideMenu = pathname === "/"
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
        <UserData />
        <ListButtons setClose={setClose} />
        <SideMenuButton icon={
            <LogOutIcon size={40} />
        } logOut>
            Log out
        </SideMenuButton>
    </div> : null
}

export default SideMenu