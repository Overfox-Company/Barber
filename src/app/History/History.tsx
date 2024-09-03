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
interface Props { }

const History: NextPage<Props> = ({ }) => {
    const { personal, payments, getData } = useContext(AppContext)
    const [show, setShow] = useState(false)
    const [dataset, setDataset] = useState<any[]>([])
    const [date, setDate] = useState<string[]>([])
    const [state, setState] = useState<any[]>([
        {
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 15)),
            key: 'selection'
        }
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
            curve: "linear",
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
                    const workerPayments = cloneDataset.filter((payment: any) => payment.worker_id === worker._id);

                    // Calcular la cantidad de trabajos y el total de tips
                    const jobs = workerPayments.length;
                    const totalTip = workerPayments.reduce((acc: any, payment: any) => acc + parseFloat(payment.tip), 0);

                    return {
                        name: worker.name,
                        avatar: worker.avatar,
                        jobs: jobs,
                        totalTip: totalTip,
                        paymentsByWorker: workerPayments
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
    return show && state.length > 0 && date.length && dataset.length > 0 ? <div style={{
        height: 600,
        overflow: 'auto',
        backgroundColor: 'white',
        padding: 32,
        width: '100%',
        borderRadius: 20,
        boxShadow: '0 8px 8px rgba(0, 0, 45, 0.1)',
    }}>
        <Container rowSpacing={4}>
            <Item xs={9}>
                <Chart

                    date={date}
                    maxValue={maxValue}
                    dataset={dataset}
                    state={state}
                    setState={setState}
                />
            </Item>
            <Item xs={3}>
                <ListWorkers
                    dataFilter={dataFilter}
                    state={state}
                />
            </Item>
            <Item xs={12}>
                <Table dataFilter={dataFilter} />
            </Item>
        </Container>

    </div> : null
}

export default History