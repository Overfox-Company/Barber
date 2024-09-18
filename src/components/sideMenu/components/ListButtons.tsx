'use client'
import FadeIn from '@/components/animation/FadeIn'
import { SideMenuButton } from '@/components/UI/Buttons'
import { AppContext } from '@/context/AppContext'

import { NextPage } from 'next'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { buttons } from './data'
import { usePathname, useRouter } from 'next/navigation'



interface Props { setClose?: Dispatch<SetStateAction<boolean>>, isLogged: boolean }
const ListButtons: NextPage<Props> = ({ setClose, isLogged }) => {
    const { setMenuSelected, menuSelecte } = useContext(AppContext);
    const router = useRouter()
    const phatName = usePathname()
    const handleClick = (index: number) => {
        if (phatName === '/login') {
            router.push("/")
        }
        localStorage.setItem('menu', index.toString())
        setMenuSelected(index)
        if (setClose) {
            setClose(false)
        }
    }
    useEffect(() => {
        if (!isLogged) {
            setMenuSelected(0)
        }
        return () => {

        };
    }, [isLogged]);
    return <div style={{ height: '70%' }}><FadeIn>

        {buttons.filter((e, i) => isLogged || i === 0).map((button, index) => {
            return (
                <SideMenuButton
                    key={button.label}
                    selected={menuSelecte === index}
                    icon={button.icon}
                    onClick={() => handleClick(index)}>
                    {button.label}
                </SideMenuButton>
            )
        })}


    </FadeIn> </div>
}

export default ListButtons