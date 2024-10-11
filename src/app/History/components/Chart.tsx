import { Container, Item } from '@/components/Layout/Layout';
import { Box, Button, Popover, Typography } from '@mui/material'
import { NextPage } from 'next'
import { Dispatch, FC, SetStateAction, useState } from 'react';

import { DateRange } from 'react-date-range';
import { lineElementClasses } from '@mui/x-charts/LineChart';
import styled from '@emotion/styled'
import moment from 'moment';
import { LineChart } from '@mui/x-charts';
import Image from 'next/image';
import SelectCustom from '@/components/UI/Select';
import CalendarSelect from './CalendarSelect';



const BoxDate = styled(Button)({
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
const DateRangeText = styled(Typography)({
    color: "rgb(60,60,60)",
})
const ErrorText = styled(Typography)({
    color: "rgb(60,60,60)",
    fontWeight: 700,
    fontSize: 24
})
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format;

interface Props {
    state: any,
    setState: any,
    dataset: any,
    date: any[],
    maxValue: number,
    paymentsFilter: string,
    setPaymentsFilter: Dispatch<SetStateAction<string>>,
    valueDate: string | null,
    setValueDate: Dispatch<SetStateAction<string | null>>
}

const ItemSelect: FC<{ images: string[], text: string }> = ({ images, text }) => {
    return (
        <Box style={{ height: 50, display: 'flex', alignItems: 'center', gap: 4 }}>
            {images.map((image) => (
                <Image key={image} src={image}
                    // objectFit='cover' 
                    alt=''
                    style={{
                        width: 'auto',
                        height: 'auto',
                        maxHeight: '25px'
                        , maxWidth: '25px'
                    }}
                    layout='objectFit'
                    width={45} height={30}
                />
            ))}
            <p style={{ fontWeight: 700, color: 'rgb(60,60,60)' }}>
                {text}
            </p>
        </Box>
    )
}

const Chart: NextPage<Props> = ({
    state,
    setState,
    dataset,
    date,
    maxValue,
    paymentsFilter,
    setPaymentsFilter,
    valueDate,
    setValueDate
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const dataPayments = [
        //   { label: 'All payment methods', value: 'all' },
        {
            label: <ItemSelect images={['/assets/mc.png', '/assets/vs.png']} text='Card' />,
            value: 'card'
        },
        ,
        {
            label: <ItemSelect images={['/assets/us.png']} text='Cash' />,
            value: 'cash'
        },
        {
            label: <ItemSelect images={['/assets/zll.png']} text='Zelle' />,
            value: 'zelle'
        }
    ]

    return <div>
        <div>
            <Container>
                <Item xs={12}>
                    <Container alignItems='center' gap={4}>
                        <Item xs={3} lg={4} xl={3}>
                            <CalendarSelect date={state} setDate={setState} id={id}
                                valueDate={valueDate} setValueDate={setValueDate}
                            />
                        </Item>
                        <Item xs={2} lg={4} xl={2}>
                            <Box style={{ width: "100%", }}>
                                <SelectCustom data={dataPayments} selectValue={paymentsFilter} setSelectValue={setPaymentsFilter} />
                            </Box>
                        </Item>
                    </Container>
                </Item>
            </Container>
        </div>
        {<div>
            {date.length >= 7 ? <LineChart
                {...dataset}
                sx={{
                    [`& .${lineElementClasses.root}`]: {

                        strokeWidth: 1,
                    },
                    '& .MuiAreaElement-series-Germany': {
                        fill: "url('#myGradient')",
                    },
                }}
                xAxis={[
                    {
                        data: date,
                        id: 'Days',
                        scaleType: "point",
                        valueFormatter: (date) =>
                            date.toString()
                    },
                ]}
                yAxis={[{
                    max: maxValue,

                    id: 'price',
                    valueFormatter: (price) => {
                        return "$" + price
                    }
                }]}
                series={
                    dataset.map((series: any) => {
                        return ({
                            ...series,
                            baseline: 0,
                            valueFormatter: (v: any) => (v === null ? '' : currencyFormatter(v)),
                        })
                    })
                }
                height={340}
                grid={{ vertical: true, horizontal: true }}
            >
                <defs>
                    <linearGradient id="myGradient" gradientTransform="rotate(90)">
                        <stop offset="5%" stopColor={"rgba(0,100,200,0.4)"} />
                        <stop offset="95%" stopColor="rgba(0,100,200,0.2)" />
                    </linearGradient>
                </defs>

            </LineChart> : <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


                <ErrorText>
                    You must select a minimum range of 7 days

                </ErrorText>
            </div>
            }
        </div>}

    </div>
}

export default Chart