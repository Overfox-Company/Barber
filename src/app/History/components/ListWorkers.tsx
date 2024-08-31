import moment from 'moment'
import { NextPage } from 'next'
import styled from '@emotion/styled'
import { Avatar, Box, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '@/context/AppContext'
import { Container, Item } from '@/components/Layout/Layout'
import { PRIMARYCOLOR } from '@/constants/Colors'
import FadeIn from '@/components/animation/FadeIn'
interface Props { state: any, dataset: any, date: any }
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
const ListWorkers: NextPage<Props> = ({ state, dataset, date }) => {
    const { personal } = useContext(AppContext)
    const [dataFilter, setDataFilter] = useState<any[]>([])
    const filterData = () => {
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
                    totalTip: totalTip
                };
            });
            console.log(cloneDataset)
            setDataFilter(result);
        } else {
            setDataFilter([])
        }
    };
    useEffect(() => { filterData() }, [dataset])
    return <div>
        <TitleContainer>
            <Title sx={{ fontSize: { xs: 16, xl: 16 } }}>
                Top  Barbers
            </Title>
            <Title sx={{ fontSize: { xs: 12, xl: 14 } }}>
                {moment(state[0].startDate).format("D/MM/YYYY")} - {moment(state[0].endDate).format("D/MM/YYYY")}
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
        {dataFilter.map((data) => {
            return <FadeIn> <ContainerWorker>

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


            </ContainerWorker> </FadeIn>
        })}

    </div>
}

export default ListWorkers