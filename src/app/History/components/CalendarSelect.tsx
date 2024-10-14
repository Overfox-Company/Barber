import { NextPage } from 'next'
import { Container, Item } from '@/components/Layout/Layout';
import { Box, Button, Popover, Typography } from '@mui/material'
import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';

import { DateRange } from 'react-date-range';
import { lineElementClasses } from '@mui/x-charts/LineChart';
import styled from '@emotion/styled'
import moment from 'moment';
import { LineChart } from '@mui/x-charts';
import Image from 'next/image';
import SelectCustom from '@/components/UI/Select';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import GeneratePDF from '../functions/GeneratePDF';
import { AppContext } from '@/context/AppContext';
const initialValues = [
    {
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Primer día del mes actual
        endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // Último día del mes actual
        //   key: 'selection',
    },
]
const BoxDate = styled(Button)({
    width: '100%',
    textTransform: 'none',
    borderRadius: 4,
    display: 'flex',
    gap: 4,
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: 'rgba(231,240,253,0.8)',
    padding: 10,
    height: 40,
    '&:hover': {
        backgroundColor: 'rgba(231,240,253,0.8)',
    }
})
const DateRangeText = styled(Typography)({
    color: "rgb(60,60,60)",

    // fontWeight: 700

})

interface Props {
    date: any[],
    setDate: Dispatch<SetStateAction<any[]>>,
    id: string | undefined
    valueDate: string | null | any,
    setValueDate: Dispatch<SetStateAction<string | null>>
}

const CalendarSelect: NextPage<Props> = ({ date, setDate, id, valueDate, setValueDate }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [optionSelected, setOptionSelected] = useState(6)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    // const id = open ? 'simple-popover' : undefined;
    const setThisWeek = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // Día de la semana (0 = domingo, 6 = sábado)

        // Primer día de la semana (domingo)
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - dayOfWeek);

        // Último día de la semana (sábado)
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + (6 - dayOfWeek));
        setValueDate(null);
        setDate([
            {
                startDate,
                endDate,
                key: 'selection',
            },
        ]);
    };
    const setLastWeek = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // Día de la semana (0 = domingo, 6 = sábado)

        // Primer día de la semana pasada (domingo)
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - dayOfWeek - 7); // Restamos los días actuales y 7 días para retroceder a la semana pasada

        // Último día de la semana pasada (sábado)
        const endDate = new Date(today);
        endDate.setDate(today.getDate() - dayOfWeek - 1); // Restamos los días actuales más 1 para llegar al sábado de la semana pasada
        setValueDate(null);
        setDate([
            {
                startDate,
                endDate,
                key: 'selection',
            },
        ]);
    };
    const setThisMonth = () => {
        const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // Primer día del mes actual
        const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0); // Último día del mes actual
        setValueDate(null);
        setDate([
            {
                startDate,
                endDate,
                key: 'selection',
            },
        ]);
    };
    const setLastMonth = () => {
        const today = new Date();

        // Obtenemos el año y mes actuales
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        // Primer día del mes pasado
        const startDate = new Date(currentYear, currentMonth - 1, 1);

        // Último día del mes pasado
        const endDate = new Date(currentYear, currentMonth, 0); // Día 0 del mes actual es el último día del mes anterior
        setValueDate(null);
        setDate([
            {
                startDate,
                endDate,
                key: 'selection',
            },
        ]);
    };
    const setDay = () => {
        const currentDay = dayjs(); // Obtenemos la fecha actual en el formato deseado

        setValueDate(currentDay as any); // Actualizamos el estado con la fecha actual formateada
    };
    const setYesterday = () => {
        const yesterday = dayjs().subtract(1, 'day'); // Obtenemos la fecha de ayer restando 1 día
        setValueDate(yesterday as any); // Actualizamos el estado con la fecha de ayer formateada
    };

    const buttons = [{
        label: "Day",
        function: setDay
    },
    {
        label: "Month",
        function: () => { } //setThisMonth
    },
    {
        label: "Today",
        function: setDay
    }, {
        label: "Yesterday",
        function: setYesterday
    }, {
        label: "This week",
        function: setThisWeek
    }, {
        label: "Last week",
        function: setLastWeek
    }, {
        label: "This month",
        function: setThisMonth
    },
    {
        label: "Last month",
        function: setLastMonth
    },
    ]

    useEffect(() => {

        if (optionSelected === 0) {
            // setDay()
        }
        if (optionSelected === 3) {
            // setYesterday()
        }
        if (optionSelected === 4) {
            // setThisWeek()
        }
        if (optionSelected === 5) {
            // setLastWeek()
        }

        if (optionSelected === 6) {
            // setThisMonth()
        }
        if (optionSelected === 7) {
            // setLastMonth()
        }

    }, [optionSelected])
    const { personal, payments, getData } = useContext(AppContext)
    const handleClickReport = (value?: string) => {

        const filterPayments = valueDate ? payments.filter((e: any) => moment(e.createdAt).format('MM/DD/YYYY') === valueDate.format('MM/DD/YYYY')) : payments.filter((e: any) => {
            const paymentDate = moment(e.createdAt);
            const startDate = moment(date[0].startDate); // Suponiendo que solo hay un objeto en el array `date`
            const endDate = moment(date[0].endDate);

            // Verificamos si la fecha de creación del pago está dentro del rango de fechas
            return paymentDate.isBetween(startDate, endDate, 'days', '[]');
        });

        GeneratePDF(!value ? "General" : value, filterPayments)
    }
    return <div>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Box sx={{ width: 520 }}>
                <Container style={{ padding: 4 }} columnSpacing={1}>
                    <Item xs={8}>
                        {valueDate === null ? <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date as any}
                        /> :

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateCalendar', 'DateCalendar']}>

                                    <DateCalendar
                                        views={[optionSelected === 0 || optionSelected === 2 || optionSelected === 3 ? 'day' : 'month']}
                                        value={valueDate as any}
                                        onChange={(newValue) => {
                                            console.log(newValue)
                                            setValueDate(newValue)
                                        }} />

                                </DemoContainer>
                            </LocalizationProvider>}
                        <Container columnSpacing={1} rowSpacing={1}>
                            <Item xs={4}>
                                <BoxDate style={{

                                    // backgroundColor: `rgba(231,240,253,${optionSelected === i ? '1' : '0.1'})`,
                                }}>
                                    <Image src={"/assets/us.png"} alt=""
                                        width={24}
                                        height={18} />
                                    Card
                                </BoxDate>
                            </Item>
                            <Item xs={4}>
                                <BoxDate style={{

                                    // backgroundColor: `rgba(231,240,253,${optionSelected === i ? '1' : '0.1'})`,
                                }}>
                                    <Image src={"/assets/mc.png"} alt=""
                                        width={24}
                                        height={18} />
                                    <Image src={"/assets/vs.png"} alt=""
                                        width={24}
                                        height={18} />
                                    Cash
                                </BoxDate>
                            </Item>
                            <Item xs={4}>
                                <BoxDate style={{

                                    // backgroundColor: `rgba(231,240,253,${optionSelected === i ? '1' : '0.1'})`,
                                }}>
                                    <Image src={"/assets/zll.png"} alt=""
                                        width={24}
                                        height={24} />
                                    Zelle
                                </BoxDate>
                            </Item>
                            <Item xs={12}>
                                <BoxDate
                                    onClick={() => handleClickReport()}
                                    style={{

                                        // backgroundColor: `rgba(231,240,253,${optionSelected === i ? '1' : '0.1'})`,
                                    }}>
                                    General Report
                                </BoxDate>
                            </Item>
                        </Container>

                    </Item>
                    <Item xs={4}>
                        <Box style={{ display: 'flex', gap: 8, flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                            {buttons.map((b, i) => (
                                <BoxDate style={{

                                    backgroundColor: `rgba(231,240,253,${optionSelected === i ? '1' : '0.1'})`,
                                }} key={b.label} onClick={() => {

                                    b.function()
                                    setOptionSelected(i)
                                }}>
                                    {b.label}
                                </BoxDate>
                            ))}
                        </Box>

                    </Item>
                </Container>
            </Box>


        </Popover>
        <BoxDate aria-describedby={id} onClick={handleClick}>
            {valueDate === null ? <DateRangeText>
                {moment(date[0].startDate).format("MMM D, YYYY")} - {moment(date[0].endDate).format("MMM D, YYYY")}
            </DateRangeText> :
                <DateRangeText>
                    {dayjs(valueDate).format("MMM D, YYYY")}
                </DateRangeText>}

        </BoxDate>
    </div>
}

export default CalendarSelect