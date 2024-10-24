import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
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
import MetricsIcon from '@/icons/MetricsIcon';
import jsPDF from 'jspdf';
import GeneratePDFByWorker from '../functions/GeneratePDFByWorker';



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
    fontSize: 16,
    fontWeight: 700,
    color: 'rgb(50,50,50)'
})
const WorkerDataTitle = styled(Typography)({
    fontSize: 20,
    fontWeight: 700,
    color: PRIMARYCOLOR
})
const ResponsiveTitles = {
    fontSize: { xs: 12, lg: 20 }
}
const ResponsiveData = {
    fontSize: { xs: 10, lg: 16 }
}
const Table: NextPage<Props> = ({ dataFilter }) => {
    //    useEffect(() => { console.log(dataFilter) }, [dataFilter])
    const generateReport = (e: any, data: any) => {
        e.stopPropagation()
        const reverse = data.paymentsByWorker
        GeneratePDFByWorker(data.range, data.name, reverse)
    }
    useEffect(() => {
        console.log(dataFilter)
    }, [dataFilter])
    return <div >
        <Container sx={{ width: { xs: '72vw', lg: '68vw' } }} alignItems='center'>
            <Item xs={5}>
                <WorkerDataTitle sx={ResponsiveTitles}>Barber</WorkerDataTitle >

            </Item>
            <Item xs={3}>
                <WorkerDataTitle sx={ResponsiveTitles}>Total  Cuts</WorkerDataTitle >
            </Item>
            <Item xs={3}>
                <WorkerDataTitle sx={ResponsiveTitles}>Total tips</WorkerDataTitle >
            </Item>
            <Item xs={1}>
                <WorkerDataTitle sx={ResponsiveTitles}></WorkerDataTitle >
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
                            <Item xs={5}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Avatar src={data.avatar} sx={{ width: 32, height: 32 }} />
                                    <WorkerData sx={ResponsiveData}>
                                        {data.name}
                                    </WorkerData>
                                </div>
                            </Item>
                            <Item xs={3} style={{ display: 'flex', }}>
                                <WorkerData sx={ResponsiveData}>
                                    {data.jobs}
                                </WorkerData>
                            </Item>
                            <Item xs={2} style={{ display: 'flex', }}>
                                <WorkerData sx={ResponsiveData}>
                                    ${data.totalTip.toFixed(2)}
                                </WorkerData>
                            </Item>
                            <Item xs={2}>
                                <Tooltip title="Generate Report" arrow placement='top'
                                    sx={{
                                        '& .MuiTooltip-popper': {
                                            // backgroundColor: 'red !important',   // Color de fondo
                                            color: '#fff',             // Color del texto
                                            fontSize: '14px',          // Tamaño del texto
                                            borderRadius: '4px',       // Bordes redondeados
                                            padding: '10px',           // Espaciado interno
                                        },
                                    }}
                                >
                                    <IconButton style={{ borderRadius: 200, }} onClick={(e) => generateReport(e, data)}>
                                        <MetricsIcon size={25} />
                                    </IconButton>
                                </Tooltip>
                            </Item>
                        </Container>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Container alignItems='center'>
                            <Item xs={2}>
                                <WorkerDataTitle sx={ResponsiveTitles}>Date</WorkerDataTitle >
                            </Item>
                            <Item xs={2}>
                                <WorkerDataTitle sx={ResponsiveTitles}>Service</WorkerDataTitle >
                            </Item>
                            <Item xs={2}>
                                <WorkerDataTitle sx={ResponsiveTitles}>Tip</WorkerDataTitle >
                            </Item>
                            <Item xs={2}>
                                <WorkerDataTitle sx={ResponsiveTitles}>Fee</WorkerDataTitle >
                            </Item>
                            <Item xs={2}>
                                <WorkerDataTitle sx={ResponsiveTitles}>Method</WorkerDataTitle >
                            </Item>
                            <Item xs={2}>
                                <WorkerDataTitle sx={ResponsiveTitles}>Total</WorkerDataTitle >
                            </Item>
                        </Container>
                        {data.paymentsByWorker.map((payment: any) => (
                            <Container alignItems='center' key={payment._id}>
                                <Item xs={2}>
                                    <WorkerData sx={ResponsiveData}>

                                        {moment(payment.createdAt).format("MM/DD/YYYY HH:mm")}
                                    </WorkerData>
                                </Item>
                                <Item xs={2} style={{ display: 'flex', }}>
                                    <WorkerData sx={ResponsiveData}>
                                        ${payment.price}
                                    </WorkerData>
                                </Item>
                                <Item xs={2} style={{ display: 'flex', }}>
                                    <WorkerData sx={ResponsiveData}>
                                        ${payment.tip}
                                    </WorkerData>
                                </Item>
                                <Item xs={2} style={{ display: 'flex', }}>
                                    <WorkerData sx={ResponsiveData}>
                                        ${payment.tax}
                                    </WorkerData>
                                </Item>
                                <Item xs={2} style={{ display: 'flex', }}>
                                    <WorkerData sx={ResponsiveData}>
                                        {typeof payment.method === 'undefined' ? 'card' : payment.method}
                                    </WorkerData>
                                </Item>
                                <Item xs={2} style={{ display: 'flex', }}>
                                    <WorkerData sx={ResponsiveData}>
                                        ${payment.total}
                                    </WorkerData>
                                </Item>
                            </Container>
                        ))}
                    </AccordionDetails>
                </Accordion>
                <ContainerWorker>
                </ContainerWorker>
            </FadeIn>
        })}
    </div >
}

export default Table