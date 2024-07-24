import { Container, Item } from '@/components/Layout/Layout'
import { ContainedButton, OutlinedButton } from '@/components/UI/Buttons'
import { NextPage } from 'next'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from '@emotion/styled';
import { PRIMARYCOLOR } from '@/constants/Colors';
import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import PaymentIcon from '@/icons/PaymentIcon';
import { TextBase, TextDialog } from '@/components/UI/Text';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup'
import Input from '@/components/UI/Input';
import FadeIn from '@/components/animation/FadeIn';
import { InitialDataType } from '../AddService';
import { handlePay } from '../handler/Pay';
const Option = styled(Box)({
    width: 80,
    height: 30,
    borderRadius: 6,

    color: PRIMARYCOLOR,

})
const Label = styled(Typography)({
    color: PRIMARYCOLOR,
    fontSize: "18px",
    textAlign: "left",
    marginLeft: 5,
    fontWeight: 700
})
const Text = styled(Typography)({
    color: PRIMARYCOLOR,
    fontSize: "16px",
    textAlign: "left",
    marginLeft: 5,

})
interface Props {
    setStep: Dispatch<SetStateAction<number>>,
    setData: Dispatch<SetStateAction<InitialDataType>>,
    data: InitialDataType
}
const percent = [0, 5, 10, 15, 20,]

const validationSchema = Yup.object().shape({

    tip: Yup.number(),

});
const Step3: NextPage<Props> = ({ setStep, data, setData }) => {
    const router = useRouter()
    const initialValues = {
        tip: ''
    }
    const { tax, price } = data
    const [amountToPay, setAmountToPay] = useState<number>(price && tax ? parseFloat(price + tax) : 0)
    const [optionSelected, setOptionSelected] = useState(0)
    const [tipValue, setTipValue] = useState(0)
    const [customTip, setCustomTip] = useState(0)
    const onChange = (value: number) => {
        if (value > 0) {

            setCustomTip(value)
        } else {

            setCustomTip(0)
        }
        setTipValue(1)
    }
    const handleClick = () => {
        const totalTip: any = tipValue === 1 ? customTip : percent[optionSelected] * amountToPay / 100
        const totalPrice = amountToPay + parseFloat(totalTip)
        console.log(totalPrice)
        router.push(handlePay(totalPrice))
    }
    return <div>
        <FadeIn>
            <Container justifyContent={"center"} style={{ height: 400 }}>
                <Item xs={12}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <PaymentIcon size={55} />
                    </div>
                </Item>
                {  /* <Item xs={12}>
                    <Text style={{ textAlign: 'center', fontSize: 16, color: PRIMARYCOLOR, margin: 0 }}>
                        Total
                    </Text>
                    <Label style={{ textAlign: 'center', fontSize: 24, color: PRIMARYCOLOR, margin: 0 }}>
                        ${amountToPay} + {percent[optionSelected] + "% = $"} {amountToPay + ((percent[optionSelected] * amountToPay) / 100)}
                    </Label>

                </Item>*/}
                <Item xs={8}>
                    <br />
                    <TextDialog>
                        Want to leave a tip?
                    </TextDialog>
                </Item>

                <Item xs={10}>
                    <Label style={{ marginBottom: 8 }}>
                        By percentage
                    </Label>

                    <div style={{ display: 'flex', gap: 4 }}>
                        {percent.map((p, i) => (

                            <Option style={{
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: `solid 1px ${optionSelected === i ? PRIMARYCOLOR : 'rgb(200,200,220'}`
                            }}
                                onClick={() => { setTipValue(0); setOptionSelected(i); }}
                            >
                                <TextBase style={{ textAlign: 'center', fontSize: 14, color: optionSelected === i ? PRIMARYCOLOR : 'rgb(200,200,220' }}>
                                    {i === 0 ? 'None' : p + "%"}
                                </TextBase>
                            </Option>


                        ))}
                    </div>
                    <br />
                    <Formik
                        onSubmit={() => console.log('enviando')}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {({ errors, touched }) => (
                            <Form onChange={(e: any) => onChange(e.target.value)}>
                                <Input name="tip" type='number' touched={touched.tip} error={errors.tip} label="Custom" placeholder='0,00' />
                            </Form>
                        )}

                    </Formik>
                </Item>
                <Item xs={10}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: PRIMARYCOLOR, margin: 0 }}>
                            Service:
                        </Text>
                        <Label style={{ textAlign: 'center', fontSize: 16, color: PRIMARYCOLOR, margin: 0 }}>
                            ${amountToPay}
                        </Label>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: PRIMARYCOLOR, margin: 0 }}>
                            Tip:
                        </Text>
                        <Label style={{ textAlign: 'center', fontSize: 16, color: PRIMARYCOLOR, margin: 0 }}>
                            {tipValue === 1 ? "$" + customTip : percent[optionSelected] + "%"}
                        </Label>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: PRIMARYCOLOR, margin: 0 }}>
                            Total:
                        </Text>
                        <Label style={{ textAlign: 'center', fontSize: 16, color: PRIMARYCOLOR, margin: 0 }}>
                            ${amountToPay + (tipValue === 1 ? parseInt(customTip as any) : ((percent[optionSelected] * amountToPay) / 100))}
                        </Label>
                    </div>

                </Item>
            </Container>

            <Container columnSpacing={4} justifyContent={"center"}>

                <Item xs={5}>
                    <OutlinedButton lowerCase onClick={() => setStep(1)}>
                        Back
                    </OutlinedButton>
                </Item>
                <Item xs={5}>
                    <ContainedButton lowerCase onClick={() => handleClick()}>
                        Pay
                    </ContainedButton>
                </Item>
            </Container>
        </FadeIn>

    </div>
}

export default Step3