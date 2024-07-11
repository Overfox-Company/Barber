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

interface Props { }

const SideMenuMobile: NextPage<Props> = ({ }) => {
    const { menuSelecte } = useContext(AppContext)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => { setTimeout(() => { setShow(true) }, 100) }, [])
    return <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
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
        {show ? <FadeIn>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10, gap: 10, width: '78%' }}>
                {buttons[menuSelecte].icon}
                <NameUser>
                    {buttons[menuSelecte].label}
                </NameUser>
            </Box>
        </FadeIn> : null}

    </div>
}

export default SideMenuMobile