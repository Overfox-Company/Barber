'use client'
import FadeIn from '@/components/animation/FadeIn'
import { SideMenuButton } from '@/components/UI/Buttons'
import { AppContext } from '@/context/AppContext'

import { NextPage } from 'next'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { buttons } from './data'



interface Props { setClose?: Dispatch<SetStateAction<boolean>> }
const ListButtons: NextPage<Props> = ({ setClose }) => {
    const { setMenuSelected, menuSelecte } = useContext(AppContext);

    const handleClick = (index: number) => {
        localStorage.setItem('menu', index.toString())
        setMenuSelected(index)
        if (setClose) {
            setClose(false)
        }
    }
    return <div style={{ height: '70%' }}><FadeIn>

        {buttons.map((button, index) => {
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