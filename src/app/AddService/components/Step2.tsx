import { NextPage } from 'next'
import FadeIn from '@/components/animation/FadeIn'
import { Container, Item } from '@/components/Layout/Layout';
import Input from '@/components/UI/Input';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { PRIMARYCOLOR } from '@/constants/Colors';
import { ContainedButton, OutlinedButton } from '@/components/UI/Buttons';
import { Dispatch, SetStateAction } from 'react';
import { Phone } from '@mui/icons-material';
import { InitialData, InitialDataType } from '../AddService'
interface Props {
    setStep: Dispatch<SetStateAction<number>>,
    setData: Dispatch<SetStateAction<InitialDataType>>,
    data: InitialDataType
}
const validationSchema = Yup.object().shape({

    price: Yup.number()
        .required("Price is required").moreThan(0, "Price must be greater than 0"),
    tax: Yup.number()
        .required("Tax is required"),
    phone: Yup.string(),
    customer: Yup.string()

});
const Title = styled(Typography)({
    color: PRIMARYCOLOR,
    fontSize: 24,
    fontWeight: 700
})
const Step2: NextPage<Props> = ({
    setStep,
    setData,
    data
}) => {
    const initialValues = {
        price: null,
        tax: parseFloat(localStorage.getItem("fee") || "1.50") || 1.50,
        customer: '',
        phone: '',
    }
    const onSendForm = (values: typeof initialValues) => {
        console.log(values)
        setData((prevData: any) => ({
            ...prevData,
            customer: values.customer,
            phone: values.phone,
            price: values.price,
            tax: values.tax,
        }));
        setStep(2)
    }
    const ChangeTax = (name: string, value: number) => {
        if (name === "tax") {
            localStorage.setItem("fee", value.toString())
        }
    }
    return <div >
        <FadeIn>

            <Formik
                onSubmit={(values) => onSendForm(values)}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ errors, touched }) => (
                    <Form
                        onChange={(e: any) => ChangeTax(e.target.name, e.target.value)}
                    >
                        <Container columnSpacing={4} style={{ height: 400 }}>
                            <Item xs={12}>
                                <Title style={{ textAlign: 'center' }}>
                                    Service Data
                                </Title>
                                <br />
                            </Item>

                            <Item xs={6}>
                                <Input name="price" type="number" error={errors.price} touched={touched.price} label="Price" placeholder='0,00' />
                            </Item>
                            <Item xs={6}>
                                <Input name="tax" error={errors.tax} touched={touched.tax} label="Fee" placeholder='0,00' />
                            </Item>
                            <Item xs={6}>
                                <Input name="phone" error={errors.phone} touched={touched.phone} label="Phone" placeholder='Customer phone' />
                            </Item>
                            <Item xs={6}>
                                <Input name="customer" error={errors.customer} touched={touched.customer} label="Customer" placeholder='Customer name' />
                            </Item>
                        </Container>
                        <Container columnSpacing={4} justifyContent={"center"}>
                            <Item xs={5}>
                                <OutlinedButton lowerCase onClick={() => setStep(0)}>
                                    Back
                                </OutlinedButton>
                            </Item>
                            <Item xs={5}>
                                <ContainedButton lowerCase type="submit">
                                    Next
                                </ContainedButton>
                            </Item>
                        </Container>
                    </Form>
                )}

            </Formik>
        </FadeIn>
    </div>
}

export default Step2