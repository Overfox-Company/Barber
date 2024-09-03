'use client'

import { Container, Item } from '@/components/Layout/Layout'
import { AppContext } from '@/context/AppContext';
import { NextPage } from 'next'
import { useContext, useEffect } from 'react'

import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material';
import { PRIMARYCOLOR, PRIMARYCOLORHOVER } from '@/constants/Colors';
import { PRIMARYFONT } from '@/constants/Fonts';
interface Props { }
const CardCustomer = styled(Box)({
    borderRadius: 8,
    backgroundColor: PRIMARYCOLORHOVER,
    padding: 12,

})
const Title = styled(Typography)({
    fontWeight: 700,
    fontSize: 28,
    color: 'rgb(90,90,90)'
})
const Customers: NextPage<Props> = ({ }) => {
    const { customers } = useContext(AppContext);
    useEffect(() => { console.log(customers) }, [customers])
    return <div style={{
        minHeight: 550,
        overflow: 'auto',
        backgroundColor: 'white',
        padding: 32,
        width: '100%',
        borderRadius: 20,
        boxShadow: '0 8px 8px rgba(0, 0, 45, 0.1)',
    }}>
        <Container rowSpacing={4}>
            <Item xs={12}>
                <Title>Customers list</Title>
            </Item>
            {customers.map((customer: { createdAt: string, _id: string, name: string, phone: string }) => (
                <Item key={customer._id} xs={2}>
                    <CardCustomer>
                        <p style={{ color: PRIMARYCOLOR }}>
                            <strong>
                                Register at:
                            </strong> {customer.createdAt}
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

    </div>
}

export default Customers