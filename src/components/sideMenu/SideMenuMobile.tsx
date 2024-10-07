'use client'
import { AppContext } from '@/context/AppContext'
import { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { buttons } from './components/data'
import { NameUser } from '../UI/Text'
import { Box, Drawer, IconButton, SwipeableDrawer } from '@mui/material'
import MenuIcon from '@/icons/MenuIcon'
import SideMenu from '.'
import FadeIn from '../animation/FadeIn'
import { usePathname } from 'next/navigation'

interface Props { }

const SideMenuMobile: NextPage<Props> = ({ }) => {
    const { menuSelecte } = useContext(AppContext)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [show, setShow] = useState(false)
    const pathname = usePathname();
    useEffect(() => { setTimeout(() => { setShow(true) }, 100) }, [])
    return <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start'
    }}>
        <SwipeableDrawer
            anchor={'left'}
            open={openDrawer}
            onOpen={() => setOpenDrawer(true)}
            onClose={() => setOpenDrawer(false)}
            variant='temporary'
            ModalProps={{
                keepMounted: true, // Mejora el rendimiento en móviles al mantener el componente montado
            }}
        >
            <Box sx={{ width: { xs: '100vw', sm: '40vw' } }}>
                <SideMenu mobile setClose={setOpenDrawer} />
            </Box>
        </SwipeableDrawer>
        <IconButton onClick={() => setOpenDrawer(true)}>
            <MenuIcon size={30} />
        </IconButton>
        {show ?
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                gap: 10,
                width: '100%'
            }}>

                <NameUser>
                    {pathname === '/login' ? "Login" : buttons[menuSelecte].label}
                </NameUser>
            </Box>
            : null}
    </div>
}

export default SideMenuMobile