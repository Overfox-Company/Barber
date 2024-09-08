'use client'
import { AppContext } from '@/context/AppContext'
import { NextPage } from 'next'
import { useContext } from 'react'
import styled from '@emotion/styled'
import { Box, IconButton } from '@mui/material'
import Image from 'next/image'
import { NameUser, TextDialog } from '@/components/UI/Text'
import { PRIMARYCOLORHOVER } from '@/constants/Colors'
import DeleteIcon from '@/icons/DeleteIcon'
import ApiController from '@/controller/ApiController'
import { Container, Item } from '@/components/Layout/Layout'
interface Props { }
const Card = styled(Box)({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    padding: 4,
    width: 140,
    // backgroundColor: 'red',
    borderRadius: 12,
    border: `solid 1px ${PRIMARYCOLORHOVER}`,
})

const ListBarbers: NextPage<Props> = ({ }) => {
    const { personal, setPersonal } = useContext(AppContext)
    const deleteWorker = async (id: string) => {
        const result = await ApiController.deleteWorker(id)
        const { personal } = result.data
        if (personal) {
            setPersonal(personal)
            //console.log(personal)
        }
    }
    return <div style={{ height: '100%', overflowY: 'auto', }}>
        <TextDialog>
            Barbers list
        </TextDialog>
        <div style={{
            justifyContent: 'flex-start',
            // flexWrap: 'wrap',
            display: "flex",

        }}>
            <Container>
                {personal.length > 0 ? personal.map((person) => (
                    <Item xs={4} key={person._id} style={{ position: 'relative', }}>
                        <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 99 }}>
                            <IconButton onClick={() => deleteWorker(person._id)}>
                                <DeleteIcon size={24} />
                            </IconButton>

                        </div>
                        <Card >

                            <div style={{
                                width: 100, height: 100, position: 'relative'
                            }}>
                                <Image src={person.avatar} fill objectFit='contain' alt='' style={{ borderRadius: 8 }} />

                            </div>
                            <NameUser size={14}>
                                {person.name.length > 16 ? `${person.name.substring(0, 16)}...` : person.name}
                            </NameUser>
                        </Card>
                    </Item>

                )) : null}
            </Container>

        </div>

    </div>
}

export default ListBarbers