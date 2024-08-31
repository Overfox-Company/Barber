import { Container, Item } from '@/components/Layout/Layout';
import { Button, Popover, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useState } from 'react';

import { DateRange } from 'react-date-range';
import { lineElementClasses } from '@mui/x-charts/LineChart';
import styled from '@emotion/styled'
import moment from 'moment';
import { LineChart } from '@mui/x-charts';



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

interface Props { state: any, setState: any, dataset: any, date: any[], maxValue: number }
const Chart: NextPage<Props> = ({ state, setState, dataset, date, maxValue }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return <div>  <div>

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
            <DateRange
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state as any}
            />
        </Popover>
        <Container>
            <Item xs={4}>
                <BoxDate aria-describedby={id} onClick={handleClick}>
                    <DateRangeText>
                        {moment(state[0].startDate).format("MMM D, YYYY")} - {moment(state[0].endDate).format("MMM D, YYYY")}
                    </DateRangeText>
                </BoxDate>
            </Item>
        </Container>
    </div>
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
            height={350}
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
    </div>
}

export default Chart