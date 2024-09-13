'use client'

import { Container, Item } from '@/components/Layout/Layout'
import { AppContext } from '@/context/AppContext';
import { NextPage } from 'next'
import { useContext, useEffect } from 'react'

import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material';
import { PRIMARYCOLOR, PRIMARYCOLORHOVER } from '@/constants/Colors';
import { PRIMARYFONT } from '@/constants/Fonts';
import moment from 'moment';
interface Props { }
const CardCustomer = styled(Box)({
    borderRadius: 8,
    backgroundColor: PRIMARYCOLORHOVER,
    padding: 12,

})
const Title = styled(Typography)({
    fontWeight: 700,
    fontSize: 28,
    color: 'rgb(30,30,30)'
})
const Customers: NextPage<Props> = ({ }) => {
    const { customers } = useContext(AppContext);
    useEffect(() => { console.log(customers) }, [customers])
    return <Box style={{

        overflow: 'auto',
        backgroundColor: 'white',
        marginBottom: 20,
        width: '100%',
        boxShadow: '0 8px 8px rgba(0, 0, 45, 0.1)',
    }} sx={{
        borderRadius: { xs: 4, },
        padding: { xs: 1, lg: 2 },
        height: { xs: 800, lg: 600 },
    }}>
        <Container rowSpacing={{ xs: 2, md: 4 }} columnSpacing={2}>
            <Item xs={12}>
                <Title>Customers list</Title>
            </Item>
            {customers.map((customer: { createdAt: string, _id: string, name: string, phone: string }) => (
                <Item key={customer._id} xs={12} md={4} lg={3} >
                    <CardCustomer>
                        <p style={{ color: PRIMARYCOLOR }}>
                            <strong>
                                Register at:
                            </strong> {moment(customer.createdAt).format("MM/DD/YYYY")}
                        </p>
                        <p style={{ color: PRIMARYCOLOR }}>
                            <strong>
                                Name:
                            </strong> {customer.name}

                        </p>
                        <p style={{ color: PRIMARYCOLOR }}>
                            <strong>
                                Phone
                            </strong>  {customer.phone}
                        </p>
                    </CardCustomer>

                </Item>
            ))}
        </Container>

    </Box>
}

export default Customers