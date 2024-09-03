import { Avatar, Box, Typography } from '@mui/material'
import { NextPage } from 'next'
import styled from '@emotion/styled'
import { useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Item } from '@/components/Layout/Layout';
import { PRIMARYCOLOR } from '@/constants/Colors';
import FadeIn from '@/components/animation/FadeIn';
import { Widgets } from '@mui/icons-material';
import moment from 'moment';
interface Props { dataFilter: any }
const ContainerWorker = styled(Box)({
    width: '100%',
    textTransform: 'none',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    padding: 10,
})
const WorkerData = styled(Typography)({
    fontSize: 14,
    fontWeight: 700,

})
const WorkerDataTitle = styled(Typography)({
    fontSize: 18,
    fontWeight: 700,
    color: PRIMARYCOLOR
})
const Table: NextPage<Props> = ({ dataFilter }) => {
    useEffect(() => { console.log(dataFilter) }, [dataFilter])
    return <div>
        <Container style={{ width: '67vw' }}>
            <Item xs={4}>
                <WorkerDataTitle >Barber</WorkerDataTitle >
            </Item>
            <Item xs={4}>
                <WorkerDataTitle >Total Hair Cuts</WorkerDataTitle >
            </Item>
            <Item xs={4}>
                <WorkerDataTitle >Total Hair tips</WorkerDataTitle >
            </Item>

        </Container>
        <br />
        {dataFilter.map((data: any) => {
            return <FadeIn key={data.name}>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Container alignItems='center'>
                            <Item xs={4}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Avatar src={data.avatar} sx={{ width: 32, height: 32 }} />
                                    <WorkerData>

                                        {data.name}
                                    </WorkerData>
                                </div>

                            </Item>
                            <Item xs={4} style={{ display: 'flex', }}>
                                <WorkerData>
                                    {data.jobs}
                                </WorkerData>
                            </Item>
                            <Item xs={4} style={{ display: 'flex', }}>
                                <WorkerData>
                                    ${data.totalTip.toFixed(2)}
                                </WorkerData>
                            </Item>
                        </Container>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Container >
                            <Item xs={3}>
                                <WorkerDataTitle >Date</WorkerDataTitle >
                            </Item>
                            <Item xs={3}>
                                <WorkerDataTitle >Service</WorkerDataTitle >
                            </Item>
                            <Item xs={2}>
                                <WorkerDataTitle >Tip</WorkerDataTitle >
                            </Item>
                            <Item xs={2}>
                                <WorkerDataTitle >Fee</WorkerDataTitle >
                            </Item>
                            <Item xs={2}>
                                <WorkerDataTitle >Total cost</WorkerDataTitle >
                            </Item>
                        </Container>
                        {data.paymentsByWorker.map((payment: any) => (
                            <Container alignItems='center'>
                                <Item xs={3}>
                                    <WorkerData>

                                        {moment(payment.createdAt).format("DD/MM/YYYY HH:mm")}
                                    </WorkerData>
                                </Item>
                                <Item xs={3} style={{ display: 'flex', }}>
                                    <WorkerData>
                                        ${payment.price}
                                    </WorkerData>
                                </Item>
                                <Item xs={2} style={{ display: 'flex', }}>
                                    <WorkerData>
                                        ${payment.tip}
                                    </WorkerData>
                                </Item>
                                <Item xs={2} style={{ display: 'flex', }}>
                                    <WorkerData>
                                        ${payment.tax}
                                    </WorkerData>
                                </Item>
                                <Item xs={2} style={{ display: 'flex', }}>
                                    <WorkerData>
                                        ${payment.total}
                                    </WorkerData>
                                </Item>
                            </Container>
                        ))}
                    </AccordionDetails>
                </Accordion>
                <ContainerWorker>




                </ContainerWorker> </FadeIn>
        })}
    </div>
}

export default Table