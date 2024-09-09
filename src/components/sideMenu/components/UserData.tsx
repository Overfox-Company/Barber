'use client'
import AvatarUser from '@/components/UI/AvatarUser'
import { NameUser, UserRol } from '@/components/UI/Text'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { NextPage } from 'next'

interface Props { isLogged: boolean }
const Container = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
})
const UserData: NextPage<Props> = ({ isLogged }) => {
    return <Container>
        <AvatarUser size={140} />
        <UserRol>
            {isLogged ? "Admin" : 'Barber'}
        </UserRol>
        {isLogged ? <NameUser>
            Luis Perez
        </NameUser> : null}
    </Container>
}

export default UserData