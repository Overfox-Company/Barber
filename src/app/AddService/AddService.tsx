import FadeIn from '@/components/animation/FadeIn'
import { Container, Item } from '@/components/Layout/Layout';
import Input from '@/components/UI/Input';
import { Form, Formik } from 'formik';
import { NextPage } from 'next'
import * as Yup from 'yup'
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { PRIMARYCOLOR, PRIMARYCOLORHOVER, PRIMARYWHITE } from '@/constants/Colors';
import { ContainedButton } from '@/components/UI/Buttons';
import { useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import TipModal from './components/WorkersModal';
import Step3 from './components/Step3';
interface Props { }
const Title = styled(Typography)({
    color: PRIMARYCOLOR,
    fontSize: 24,
    fontWeight: 700
})
const validationSchema = Yup.object().shape({

    title: Yup.string()
        .required("Title is required"),

});
const StepFill = styled(Box)({
    borderRadius: 40,
    width: 60,
    height: 6,
    backgroundColor: PRIMARYCOLOR
})
const StepEmty = styled(Box)({
    borderRadius: 40,
    width: 60,
    height: 6,
    backgroundColor: PRIMARYCOLORHOVER
})
const emails = ['username@gmail.com', 'user02@gmail.com'];

const AddService: NextPage<Props> = ({ }) => {

    const [data, setData] = useState<InitialDataType>(InitialData)
    const [step, setStep] = useState(0)
    const handleSendForm = () => {

    }
    const [selectedValue, setSelectedValue] = useState(emails[1]);
    return <div>
        <Container justifyContent={"center"} style={{ height: '100vh' }} alignItems='center'>
            <Item xs={12} md={6} lg={6} xl={5}>

                <Box style={{
                    height: 550,
                    backgroundColor: 'white',

                    marginBottom: 20,
                    boxShadow: '0 8px 8px rgba(0, 0, 45, 0.1)',
                }} sx={{
                    borderRadius: { xs: 4, },
                    padding: { xs: 4, lg: 2 },
                    height: { xs: 800, lg: 600 },
                }}>

                    <div style={{ display: 'flex', gap: 4 }}>
                        {new Array(step + 1).fill(0).map((a) => (
                            <FadeIn key={a}>

                                <StepFill />
                            </FadeIn>
                        ))}
                        {new Array(2 - step).fill(0).map((a) => (


                            <StepEmty key={a} />

                        ))}
                    </div>
                    <br />
                    {step === 0 ? <Step1 setStep={setStep} data={data} setData={setData} /> : null}
                    {step === 1 ? <Step2 setStep={setStep} data={data} setData={setData} /> : null}
                    {step === 2 ? <Step3 setStep={setStep} data={data} setData={setData} /> : null}

                </Box>
            </Item>
        </Container>


    </div>
}

export default AddService
export const InitialData = {
    customer: '',
    phone: '',
    worker: '',
    detail: '',
    tip: '',
    price: '',
    tax: ''
}
export type InitialDataType = {
    customer?: string | null,
    phone?: string | null,
    worker?: string | null,
    detail?: string | null,
    tip?: string | null,
    price?: string | null,
    tax?: string | null
}