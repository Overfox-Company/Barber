'use client'
import { NextPage } from 'next'
import { PRIMARYCOLOR } from '@/constants/Colors';
import ApiController from '@/controller/ApiController';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Container, Item } from '@/components/Layout/Layout';
import Chart from './components/Chart';
import ListWorkers from './components/ListWorkers';
import { AppContext } from '@/context/AppContext';
import Table from './components/Table';
import { Box } from '@mui/material';
interface Props { }

const History: NextPage<Props> = ({ }) => {
    const { personal, payments, getData } = useContext(AppContext)
    const [show, setShow] = useState(false)
    const [dataset, setDataset] = useState<any[]>([])
    const [date, setDate] = useState<string[]>([])
    const [state, setState] = useState<any[]>([
        {
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Primer día del mes actual
            endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // Último día del mes actual
            key: 'selection',
        },
    ]);
    const [maxValue, setMaxValue] = useState(5)
    const getPayments2 = async () => {

        const startDate = moment(state[0].startDate);
        const endDate = moment(state[0].endDate);
        const dateArray = [];
        let currentDate = startDate.clone();
        let relativeAmount = 10
        const paymentsFounded: any = []
        while (currentDate.isSameOrBefore(endDate)) {

            let dailyTotal = payments.reduce((total: number, payment: any) => {
                if (moment(payment.createdAt).isSame(currentDate, 'day')) {
                    paymentsFounded.push(payment)
                }
                let totalResult = total + (moment(payment.createdAt).isSame(currentDate, 'day') ? parseFloat(payment.total) : 0)
                return totalResult;
            }, 0);
            if (dailyTotal > relativeAmount) {
                relativeAmount = Math.ceil(dailyTotal / 10) * 10 + 10
            }
            dateArray.push(dailyTotal);
            currentDate.add(1, 'day');
        }
        setMaxValue(relativeAmount)
        const formattedPayments = {
            // 'catmullRom' | 'linear' | 'monotoneX' | 'monotoneY' | 'natural' | 'step' | 'stepBefore' | 'stepAfter';
            curve: 'linear',
            color: PRIMARYCOLOR,
            showMark: true,
            // id: 'Germany',
            // area: true,
            baseline: 0,
            stack: 'total',
            label: 'Earnings',
            data: dateArray,
            paymentsFounded: paymentsFounded
        };

        setDataset([formattedPayments]);
        setShow(true);
    };

    const formatDate = () => {
        const startDate = moment(state[0].startDate);
        const endDate = moment(state[0].endDate);
        const dateArray = [];
        let currentDate = startDate.clone();
        while (currentDate.isSameOrBefore(endDate)) {
            if (currentDate.date() === 1 || dateArray.length === 0) {
                dateArray.push(currentDate.format("MMM DD").toLowerCase());
            } else {
                dateArray.push(currentDate.format("DD"));
            }
            currentDate.add(1, 'day');
        }
        if (dateArray.length > 1) {

            setDate(dateArray)
        }
    }
    useEffect(() => {
        formatDate()

    }, [state, dataset])
    useEffect(() => {
        getPayments2()
    }, [state])
    useEffect(() => {
        getData()

    }, [])

    const [dataFilter, setDataFilter] = useState<any[]>([])

    const filterData = () => {
        if (dataset[0]?.paymentsFounded) {
            const cloneDataset = dataset[0].paymentsFounded;
            console.log(cloneDataset)
            if (cloneDataset.length > 0 && date.length > 6) {
                const result = personal.map((worker) => {
                    // Filtrar los pagos que pertenecen al trabajador actual
                    const workerPayments = cloneDataset.filter((payment: any) => payment.worker_id === worker._id).reverse();

                    // Calcular la cantidad de trabajos y el total de tips
                    const jobs = workerPayments.length;
                    const totalTip = workerPayments.reduce((acc: any, payment: any) => acc + parseFloat(payment.tip), 0);

                    return {
                        name: worker.name,
                        avatar: worker.avatar,
                        jobs: jobs,
                        totalTip: totalTip,
                        paymentsByWorker: workerPayments,
                        range: moment(state[0].startDate).format("DD/MM/YYYY") + "-" + moment(state[0].endDate).format("DD/MM/YYYY")
                    };
                });
                console.log(cloneDataset)
                setDataFilter(result);
            } else {
                setDataFilter([])
            }
        }

    };
    useEffect(() => { filterData() }, [dataset])
    return show && state.length > 0 && date.length && dataset.length > 0 ? <Box style={{

        overflow: 'auto',
        backgroundColor: 'white',

        width: '100%',
        marginBottom: 6,
        boxShadow: '0 8px 8px rgba(0, 0, 45, 0.1)',
    }} sx={{
        borderRadius: { xs: 4, },
        padding: { xs: 1, lg: 2 },
        height: { xs: 800, lg: 600 },
    }}>
        <Container rowSpacing={4}>
            <Item xs={12} lg={9}>
                <Chart

                    date={date}
                    maxValue={maxValue}
                    dataset={dataset}
                    state={state}
                    setState={setState}
                />
            </Item>
            <Item xs={12} lg={3}>
                <ListWorkers
                    dataFilter={dataFilter}
                    state={state}
                />
            </Item>
            <Item xs={12}>
                <Table dataFilter={dataFilter} />
            </Item>
        </Container>

    </Box> : null
}

export default History