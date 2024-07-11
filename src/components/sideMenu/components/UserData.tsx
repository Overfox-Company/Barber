'use client'
import AvatarUser from '@/components/UI/AvatarUser'
import { NameUser, UserRol } from '@/components/UI/Text'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { NextPage } from 'next'

interface Props { }
const Container = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
})
const UserData: NextPage<Props> = ({ }) => {
    return <Container>
        <AvatarUser size={70} />
        <UserRol>
            Admin
        </UserRol>
        <NameUser>
            Luis Perez
        </NameUser>
    </Container>
}

export default UserData