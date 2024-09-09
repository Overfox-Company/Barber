'use client'
import { Box, Typography } from '@mui/material'
import { NextPage } from 'next'
import styled from '@emotion/styled'
import { PRIMARYCOLOR } from '@/constants/Colors'
import { Container, Item } from '@/components/Layout/Layout'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Input from '@/components/UI/Input'
import { ContainedButton, OutlinedButton } from '@/components/UI/Buttons'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { AppContext } from '@/context/AppContext'
interface Props { }
const Title = styled(Typography)({
    fontSize: 24,
    fontWeight: 700,
    color: PRIMARYCOLOR,
    textAlign: 'center'
})
const validationSchema = Yup.object().shape({
    user: Yup.string().required(),
    password: Yup.string().required()

});

const Page: NextPage<Props> = ({ }) => {
    const router = useRouter()
    const { login } = useContext(AppContext)
    const SendValues = (values: { user: string, password: string }) => {
        login(values.user, values.password)
        console.log(values)
    }
    return <div
        style={{ width: "100%", height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
        <Container justifyContent={"center"}>
            <Item xs={12} md={6} lg={4}>
                <Box style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: "100%",
                    height: 480,
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    padding: 40,
                    borderRadius: 20,
                    boxShadow: '0 8px 8px rgba(0, 0, 45, 0.1)',
                }}>
                    <Container>
                        <Item xs={12}>
                            <Title>
                                Login
                            </Title>

                        </Item>
                        <Item xs={12}>
                            <Formik
                                onSubmit={(values) => SendValues(values)}
                                initialValues={{ user: '', password: '' }}
                                validationSchema={validationSchema}
                            >
                                {({ errors, touched }) => (
                                    <Form
                                    //  onChange={(e: any) => ChangeTax(e.target.name, e.target.value)}
                                    >
                                        <Container columnSpacing={{ xs: 1, lg: 4 }} rowSpacing={2}>

                                            <Item xs={12}>
                                                <Input name="user" error={errors.user} touched={touched.user} label="User" placeholder='your user name' />
                                            </Item>
                                            <Item xs={12}>
                                                <Input name="password" error={errors.password} touched={touched.password} label="Password" placeholder='*********' type='password' />
                                            </Item>

                                            <Item xs={12}>
                                                <ContainedButton lowerCase type="submit">
                                                    Log In
                                                </ContainedButton>
                                            </Item>
                                            <Item xs={12}>
                                                <OutlinedButton lowerCase onClick={() => router.push("/")}>
                                                    Back
                                                </OutlinedButton>
                                            </Item>
                                        </Container>

                                    </Form>
                                )}

                            </Formik>
                        </Item>
                    </Container>

                </Box>
            </Item>
        </Container>

    </div>
}

export default Page