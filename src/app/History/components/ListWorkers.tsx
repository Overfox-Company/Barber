import moment from 'moment'
import { NextPage } from 'next'
import styled from '@emotion/styled'
import { Avatar, Box, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '@/context/AppContext'
import { Container, Item } from '@/components/Layout/Layout'
import { PRIMARYCOLOR } from '@/constants/Colors'
import FadeIn from '@/components/animation/FadeIn'
interface Props { state: any, dataFilter: any }
const Title = styled(Typography)({
    fontSize: 12,
    fontWeight: 700,
    color: 'rgb(90,90,90)'
})
const TitleContainer = styled(Box)({
    height: 44,
    display: 'flex',
    flexDirection: 'column'
})
const Headers = styled(Typography)({
    fontSize: 16,
    fontWeight: 700,
    color: 'rgb(60,60,60)'
})
const ContainerWorker = styled(Box)({
    width: '100%',
    textTransform: 'none',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: 'rgba(231,240,253,0.5)',
    padding: 10,
})
const WorkerData = styled(Typography)({
    fontSize: 14,
    fontWeight: 700,
    color: PRIMARYCOLOR
})
const ListWorkers: NextPage<Props> = ({ state, dataFilter }) => {



    return <div>
        <TitleContainer>
            <Title sx={{ fontSize: { xs: 16, xl: 16 } }}>
                Top  Barbers
            </Title>
            <Title sx={{ fontSize: { xs: 12, xl: 14 } }}>
                {moment(state[0].startDate).format("MM/DD/YYYY")} - {moment(state[0].endDate).format("MM/DD/YYYY")}
            </Title>
        </TitleContainer>
        <br />
        <Container >
            <Item xs={8}>
                <Headers>Barber</Headers>
            </Item>
            <Item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 4 }}>
                <Headers>Hair cuts</Headers>
            </Item>
        </Container>
        {dataFilter.sort((a: any, b: any) => b.jobs - a.jobs).filter((e: any) => e.jobs > 0).map((data: any, index: number) => {
            return index > 3 ? null : <FadeIn key={data.name}> <ContainerWorker>

                <Container alignItems='center'>
                    <Item xs={10}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Avatar src={data.avatar} sx={{ width: 32, height: 32 }} />
                            <WorkerData>

                                {data.name.split(" ")[0]}
                            </WorkerData>
                        </div>

                    </Item>
                    <Item xs={2} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 2 }}>
                        <WorkerData>
                            {data.jobs}
                        </WorkerData>
                    </Item>
                </Container>
            </ContainerWorker>
            </FadeIn>
        })}

    </div>
}

export default ListWorkers