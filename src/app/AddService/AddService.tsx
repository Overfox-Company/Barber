import FadeIn from '@/components/animation/FadeIn'
import { Container, Item } from '@/components/Layout/Layout';
import Input from '@/components/UI/Input';
import { Form, Formik } from 'formik';
import { NextPage } from 'next'
import * as Yup from 'yup'
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { PRIMARYCOLOR } from '@/constants/Colors';
import { ContainedButton } from '@/components/UI/Buttons';
interface Props { }
const Title = styled(Typography)({
    color: PRIMARYCOLOR,
    fontSize: 24,
    fontWeight: 700
})
const Ray = styled(Box)({
    height: 1,
    width: '100%',
    backgroundColor: '#E5E9F2'
})
const validationSchema = Yup.object().shape({

    title: Yup.string()
        .required("Title is required"),

});
const AddService: NextPage<Props> = ({ }) => {
    const initialValues = {
        title: ''
    }
    return <FadeIn>
        <Container justifyContent={"center"}>
            <Item xs={10}>
                <div style={{
                    backgroundColor: 'white',
                    padding: 40,
                    borderRadius: 20,
                    boxShadow: '0 8px 8px rgba(0, 0, 45, 0.1)'
                }}>
                    <Formik
                        onSubmit={() => console.log('enviando')}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >

                        <Form>

                            <Container columnSpacing={4}>
                                <Item xs={12}>
                                    <Title>
                                        Service Data
                                    </Title>
                                    <Ray />
                                    <br />
                                </Item>
                                <Item xs={6}>
                                    <Input name="title" label="Worker" placeholder='Jose' />
                                </Item>
                                <Item xs={6}>
                                    <Input name="title" label="Detail" placeholder='Service detail' />
                                </Item>
                                <Item xs={6}>
                                    <Input name="title" label="Price" placeholder='50,00' />
                                </Item>
                                <Item xs={6}>
                                    <Input name="title" label="Tip" placeholder='10,00' />
                                </Item>
                                <Item xs={12}>
                                    <Title>
                                        Client Data
                                    </Title>
                                    <Ray />
                                    <br />
                                </Item>
                                <Item xs={6}>
                                    <Input name="title" label="Client name" placeholder='Jhon' />
                                </Item>
                                <Item xs={6}>
                                    <Input name="title" label="Email" placeholder='example@gmail.com' />
                                </Item>

                                <Item xs={6}>
                                    <Input name="title" label="Phone" placeholder='54 505205' />
                                </Item>

                            </Container>
                            <Container columnSpacing={4} justifyContent={"flex-end"}>
                                <Item xs={4}>
                                    <ContainedButton lowerCase>
                                        Add service
                                    </ContainedButton>
                                </Item>
                            </Container>






                        </Form>
                    </Formik>
                </div>
            </Item>
        </Container>


    </FadeIn>
}

export default AddService