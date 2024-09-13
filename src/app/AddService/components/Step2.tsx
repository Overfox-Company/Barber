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
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Phone } from '@mui/icons-material';
import { InitialData, InitialDataType } from '../AddService'
import { AppContext } from '@/context/AppContext';
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
const InputStyled = styled.input({
    padding: "6px",
    width: '100%',
    background: "#FFF",
    paddingRight: 20,
    marginBottom: 4,
    border: 0,
    fontSize: 16,
    outline: "none",
    color: PRIMARYCOLOR,
    fontFamily: "Mulish",
    '::placeholder': {
        color: '#647184'
    }
})
const Label = styled(Typography)({
    color: PRIMARYCOLOR,
    width: "100%",
    fontSize: "16px",
    textAlign: "left",
    marginLeft: 5,
    fontWeight: 700
})
const ContainerInput = styled.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    border: "solid 1px #E5E9F2",
    borderRadius: '6px',
    background: "white",
    //   borderBottom: 'solid 1px rgb(150,150,150)'
})
const Step2: NextPage<Props> = ({
    setStep,
    setData,
    data
}) => {
    const initialValues = {
        price: null,
        tax: parseFloat(localStorage.getItem("fee") ?? "1.50"),
        customer: '',
        phone: '',
    }
    useEffect(() => {

    }, [])
    const ChangeTax = (name: string, value: number) => {
        if (name === "tax") {
            // console.log(value)
            localStorage.setItem("fee", value.toString())

        }
    }
    const { customers } = useContext(AppContext)
    const [numberPhone, setNumberPhone] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [userFound, setUserFound] = useState(false)
    const handleChange = (value: string, name: string) => {
        if (name === 'phone') {
            setNumberPhone(value)
            const filter = customers.filter((e) => e.phone === value)[0]?.name

            if (filter) {
                setCustomerName(filter)
                setUserFound(true)

            } else {
                setCustomerName("")
                setUserFound(false)
            }
        } else if (name === 'customer' && !userFound) {
            setCustomerName(value)
        }

    }
    const onSendForm = (values: typeof initialValues) => {
        //console.log(values)
        let client_id = null
        if (customerName && numberPhone) {
            client_id = customers.filter((e) => e.phone === numberPhone && e.name === customerName)[0]?._id
        }
        setData((prevData: any) => ({
            ...prevData,
            client_id,
            customer: customerName,
            phone: numberPhone,
            price: parseFloat(values.price || "0"),
            tax: typeof values.tax === 'string' ? parseFloat(values.tax || "0") : values.tax,
        }));
        setStep(2)
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
                        <Container columnSpacing={{ xs: 1, lg: 4 }} style={{ height: 400 }}>
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
                                <Container rowSpacing={1}>
                                    <Item xs={12}>
                                        <Label>
                                            Phone
                                        </Label>
                                    </Item>
                                    <Item xs={12}>
                                        <ContainerInput>
                                            <InputStyled placeholder='customer phone' value={numberPhone} onChange={(e: any) => handleChange(e.target.value, 'phone')} />
                                        </ContainerInput>
                                    </Item>
                                </Container>
                            </Item>
                            <Item xs={6}>
                                <Container rowSpacing={1}>
                                    <Item xs={12}>
                                        <Label>
                                            Customer
                                        </Label>
                                    </Item>
                                    <Item xs={12}>
                                        <ContainerInput>
                                            <InputStyled placeholder='Customer name' value={customerName} onChange={(e: any) => handleChange(e.target.value, 'customer')} />
                                        </ContainerInput>
                                    </Item>
                                </Container>
                            </Item>
                        </Container>
                        <Container columnSpacing={{ xs: 1, lg: 4 }} justifyContent={"center"}>
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