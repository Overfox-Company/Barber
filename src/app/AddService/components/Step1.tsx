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
import { Dispatch, SetStateAction, useState } from 'react';
import UserIcon from '@/icons/UserIcon';
import { NameUser } from '@/components/UI/Text';
import { useScroll } from 'framer-motion';
import WorkersModal from './WorkersModal';
import Image from 'next/image';
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

const Step1: NextPage<Props> = ({ setStep, data, setData }) => {
    const initialValues = {
        title: ''
    }
    const [openModal, setOpenModal] = useState(false)
    return <FadeIn style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    }}>
        <WorkersModal
            open={openModal}
            selectedValue={data.worker}
            changeValue={setData}
            onClose={() => setOpenModal(false)}
        />

        <Container columnSpacing={4} justifyContent={"center"} style={{ marginBottom: '14vh' }} rowSpacing={4}>
            <Item xs={12}>
                <Title style={{ textAlign: 'center' }}>
                    Barber
                </Title>
            </Item>
            <Item xs={5} style={{
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
                            src={workers.filter((e: any) => e.id === data.worker)[0].Avatar}
                            layout="fill"
                            objectFit="cover" alt="" />
                        : <UserIcon size={70} />}
                </div>
                <br />
                <NameUser size={14}>
                    {data.worker ? workers.filter((e: any) => e.id === data.worker)[0].name : 'Not barber selected'}
                </NameUser>
            </Item>
        </Container>
        <br />
        <Container columnSpacing={4} justifyContent={"center"}>
            <Item xs={5} xl={4}>
                <ContainedButton lowerCase onClick={() => setStep(1)} disabled={!data.worker}>
                    Next
                </ContainedButton>
            </Item>
        </Container>
    </FadeIn>
}

export default Step1