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

const generatePDF = (date: string, nameBarber: string, payments: any[]) => {
    const doc = new jsPDF();
    let y = 0
    let x = 0

    const fisrtColumn = 15
    const secondColumn = 30
    const thirdColumn = 20
    const fourtyColumn = 20
    const fiveColumn = 70
    const sixColumn = 20
    // Obtener el ancho y alto de la página del PDF
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Configura el color de fondo del contenedor
    doc.setFillColor(0, 40, 89); // Color de fondo (RGB)
    // Dibuja un rectángulo de fondo (contenedor)
    const containerX = 0; // Posición X del contenedor
    const containerY = 0; // Posición Y del contenedor
    const containerWidth = pageWidth; // Ancho del contenedor (dejar un margen)
    const containerHeight = 30; // Alto del contenedor

    doc.rect(containerX, containerY, containerWidth, containerHeight, 'F');
    doc.addImage("/assets/l.png", 'PNG', x, y, 30, 30);
    x += 5
    y += 40

    ////////////////////////////////////////////////////////
    doc.setTextColor(30, 30, 30); // Cambiar a rojo
    doc.setFontSize(12); // Cambiar tamaño del texto
    doc.setFont('helvetica', 'bold');
    doc.text(`Payment report`, x, y);
    y += 12
    doc.setTextColor(30, 30, 30); // Cambiar a rojo
    doc.setFontSize(12); // Cambiar tamaño del texto
    doc.setFont('helvetica', 'bold');
    doc.text(`Report date: ${moment().format('MM/DD/YYYY HH:mm')}`, x, y);
    y += 12
    /////////////////////////////////////
    let w = 120
    doc.setFillColor(40, 40, 40);
    doc.rect(x, y - 9, w, 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Name`, x + 1, y);
    ////////////////////////////
    doc.setFillColor(40, 40, 40);
    doc.rect(x + w, y - 9, 80, 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Date rangue`, x + w + 1, y);
    y += 10
    ////////////////////////////////
    doc.setFillColor(40, 40, 40);
    doc.rect(x, y - 9, w, 10);
    doc.setFont('helvetica', 'nomal');
    doc.text(`${nameBarber}`, x + 1, y);
    ////////////////////////////
    doc.setFillColor(40, 40, 40);
    doc.rect(x + w, y - 9, 80, 10);
    doc.setFont('helvetica', 'nomal');
    doc.text(`${date}`, x + w + 1, y);
    y += 20


    /////////////////////////////////
    let w1 = 0
    doc.setFillColor(40, 40, 40);
    doc.rect(x, y - 9, fisrtColumn, 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Hour`, x + 1, y);
    ////////////////////////////
    w1 += 15
    doc.setFillColor(40, 40, 40);
    doc.rect(x + w1, y - 9, secondColumn, 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Date`, x + w1 + 1, y);
    w1 += 30
    //////////////////////////////////////
    doc.setFillColor(40, 40, 40);
    doc.rect(x + w1, y - 9, thirdColumn, 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Service`, x + w1 + 1, y);
    ///////////////
    w1 += 20
    doc.setFillColor(40, 40, 40);
    doc.rect(x + w1, y - 9, fourtyColumn, 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Tip`, x + w1 + 1, y);
    w1 += 20
    doc.setFillColor(40, 40, 40);
    doc.rect(x + w1, y - 9, fourtyColumn + 5, 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Method`, x + w1 + 1, y);
    w1 += 25
    doc.setFillColor(40, 40, 40);
    doc.rect(x + w1, y - 9, fiveColumn, 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`-30% (babershop commission)`, x + w1 + 1, y);
    w1 += 70
    doc.setFillColor(40, 40, 40);
    doc.rect(x + w1, y - 9, sixColumn, 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total`, x + w1 + 1, y);


    y += 10
    w1 = 40
    ////////////////////////////////////////
    let total = 0

    // Altura de la página
    const marginBottom = 20; // Espacio inferior antes de crear una nueva página

    for (let i = 0; i < payments.length; i++) {
        // Primer bloque
        doc.setFillColor(40, 40, 40);
        doc.rect(x, y - 9, fisrtColumn, 10);
        doc.setFont('helvetica', 'normal');
        doc.text(moment(payments[i].createdAt).format("HH:mm"), x + 1, y);

        // Segundo bloque
        doc.setFillColor(40, 40, 40);
        doc.rect(x + 15, y - 9, secondColumn, 10);
        doc.setFont('helvetica', 'normal');
        doc.text(moment(payments[i].createdAt).format("MM/DD/YYYY"), x + 15 + 1, y);
        w1 += 10;

        doc.setFillColor(40, 40, 40);
        doc.rect(x + 45, y - 9, thirdColumn, 10);
        doc.setFont('helvetica', 'normal');
        doc.text("$" + payments[i].price, x + (w1 - 5) + 1, y);
        // Tercer bloque
        w1 += 15;
        doc.setFillColor(40, 40, 40);
        doc.rect(x + w1, y - 9, fourtyColumn, 10);
        doc.setFont('helvetica', 'normal');
        doc.text(`$${payments[i].tip}`, x + w1 + 1, y);
        w1 += 20
        doc.setFillColor(40, 40, 40);
        doc.rect(x + w1, y - 9, fourtyColumn + 5, 10);
        // doc.setFont('helvetica', 'bold');
        doc.text(`${typeof payments[i].method === 'undefined' ? 'card' : payments[i].method}`, x + w1 + 1, y);
        w1 += 25
        doc.setFillColor(40, 40, 40);
        doc.rect(x + w1, y - 9, fiveColumn, 10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(250, 30, 30);
        doc.text(`-$${parseFloat(payments[i].price) * 0.3}`, x + w1 + 1, y);
        doc.setTextColor(30, 30, 30);


        w1 += 70;
        doc.setFillColor(40, 40, 40);
        doc.rect(x + w1, y - 9, sixColumn, 10);
        doc.setFont('helvetica', 'normal');
        const sevenPercent = parseFloat(payments[i].price) * 0.7
        const tip = parseFloat(payments[i].tip)
        const totalCalc = sevenPercent + tip
        doc.text(`$${totalCalc.toFixed(2)}`, x + w1 + 1, y);
        total += totalCalc
        // Ajustes para la siguiente iteración
        y += i === 16 ? 500 : 10;
        w1 = 40;
        if (y > pageHeight - marginBottom) {
            doc.addPage(); // Agregar una nueva página
            y = 20; // Reiniciar la posición Y para la nueva página
        }
    }

    y += 10;
    doc.setFillColor(40, 40, 40);
    doc.rect(x, y - 9, 180, 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Payment`, x + 1, y);
    /////////////////////////////////
    doc.setFillColor(40, 40, 40);
    doc.rect(x + 180, y - 9, sixColumn, 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`$${total.toFixed(2)}`, x + 180 + 1, y);

    doc.save(nameBarber + "/" + date);
};

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
        generatePDF(data.range, data.name, reverse)
    }
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