'use client'
import { AppContext } from '@/context/AppContext'
import { Avatar } from '@mui/material'
import { NextPage } from 'next'
import Image from 'next/image'
import { useContext } from 'react'

interface Props { size: number }

const AvatarUser: NextPage<Props> = ({ size }) => {
    const { user } = useContext(AppContext)
    return <Avatar src={user.avatar || './assets/profile.png'} sx={{ width: size, height: size }} />
}

export default AvatarUser