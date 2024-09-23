import FadeIn from '@/components/animation/FadeIn'
import { Container, Item } from '@/components/Layout/Layout';
import Input from '@/components/UI/Input';
import { Form, Formik } from 'formik';
import { NextPage } from 'next'
import * as Yup from 'yup'
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { PRIMARYCOLOR, PRIMARYCOLORHOVER } from '@/constants/Colors';
import { ContainedButton } from '@/components/UI/Buttons';
import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import UserIcon from '@/icons/UserIcon';
import { NameUser } from '@/components/UI/Text';
import { useScroll } from 'framer-motion';
import WorkersModal from './WorkersModal';
import Image from 'next/image';
import { AppContext } from '@/context/AppContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SelectCustom from '@/components/UI/Select';
import { Height } from '@mui/icons-material';
export const workers = [{
    id: 1,
    name: 'Luis',
    Avatar: '/assets/1.jpg'
},
{
    id: 2,
    name: 'Andres',
    Avatar: '/assets/2.webp'
}]
const Title = styled(Typography)({
    color: PRIMARYCOLOR,
    fontSize: 24,

    fontWeight: 700
})
interface Props {
    setStep: Dispatch<SetStateAction<number>>,
    setData: Dispatch<SetStateAction<any>>,
    data: any
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
            <p style={{ fontWeight: 700 }}>
                {text}
            </p>
        </Box>
    )
}
const dataPayments = [
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
const Step1: NextPage<Props> = ({ setStep, data, setData }) => {
    const initialValues = {
        title: ''
    }

    const [openModal, setOpenModal] = useState(false)
    const { personal } = useContext(AppContext)
    const [paymentMethod, setPaymentMethod] = useState('card')
    useEffect(() => {

        let cloneData = data
        cloneData.method = paymentMethod
        setData(cloneData)
    }, [paymentMethod])
    return <FadeIn style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }}>
        <WorkersModal
            open={openModal}
            selectedValue={data.worker}
            changeValue={setData}
            onClose={() => setOpenModal(false)}
        />

        <Container columnSpacing={4} justifyContent={"center"} style={{ marginBottom: '5vh' }} rowSpacing={4}>
            <Item xs={12}>
                <Title style={{ textAlign: 'center' }}>
                    Barber
                </Title>
            </Item>
            <Item xs={8} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <div
                    onClick={() => setOpenModal(true)}
                    style={{
                        position: 'relative',
                        cursor: 'pointer',
                        backgroundColor: PRIMARYCOLORHOVER,
                        width: 110,
                        height: 110,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 200
                    }}>
                    {data.worker ?
                        <Image
                            style={{ borderRadius: 200 }}
                            src={personal.filter((e: any) => e._id === data.worker)[0].avatar}
                            layout="fill"
                            objectFit="cover" alt="" />
                        : <UserIcon size={70} />}
                </div>
                <br />
                <NameUser size={14}>
                    {data.worker ? personal.filter((e: any) => e._id === data.worker)[0].name : 'Not barber selected'}
                </NameUser>
            </Item>
            <Item xs={6}>

                <Title style={{ textAlign: 'center' }}>
                    Payment Method
                </Title>
                <br />
                <SelectCustom data={dataPayments} selectValue={paymentMethod} setSelectValue={setPaymentMethod} />

            </Item>
        </Container>
        <Container columnSpacing={4} justifyContent={"center"}>

            <Item xs={5} xl={4}>
                <ContainedButton lowerCase onClick={() => setStep(1)} disabled={!data.worker || !data.method}>
                    Next
                </ContainedButton>
            </Item>
        </Container>
    </FadeIn>
}

export default Step1