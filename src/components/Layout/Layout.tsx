'use client'
import React, { FC } from 'react'
import { Box, Grid } from '@mui/material';
import styled from '@emotion/styled';
import { ContainerProps, ItemProps } from '@/types/App';

const Section = styled.section({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    aligItems: 'center',
})
const StylePrincipalContainer = styled.main({
    display: 'grid',
    gridTemplateColumns: ' minmax(100%, 2fr)',
    maxWidth: 1440,
    width: '100%',
    margin: '0 auto',
    // backgroundColor: 'blue',
    placeItems: " center;"

})
const StyleContentContainer = styled(Box)({
    display: 'grid',
    gridTemplateColumns: ' minmax(100%, 1fr)',
    width: '100%',
    //   backgroundColor: "blue",
    padding: '0 20px',
    maxWidth: 1400,
})

export const PrincipalContainer: FC<ContainerProps> = ({ children, ...props }) => {
    return (
        <StylePrincipalContainer  {...props}>
            <ContentContainer>
                {children}
            </ContentContainer>
        </StylePrincipalContainer>
    )
}
export const ContentContainer: FC<ContainerProps> = ({ children, ...props }) => {
    return (
        <StyleContentContainer sx={{ padding: { xs: 0, md: '0 20px' }, }} {...props}>
            {children}
        </StyleContentContainer>
    )
}

export const Container: FC<ContainerProps> = ({ children, ...props }) => {

    return (<Grid container {...props}>
        {children}
    </Grid>)
}
export const Item: FC<ItemProps> = ({ children, ...props }) => {
    return (<Grid item {...props}>
        {children}
    </Grid>)
}
export const Wrapper: FC<ContainerProps> = ({ children, ...props }) => {
    return (<Section  {...props}>
        {children}
    </Section >)
}
export const Row: FC<ContainerProps> = ({ children, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }} {...props}>
            {children}
        </div>
    )
}
export const Column: FC<ContainerProps> = ({ children, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} {...props}>
            {children}
        </div>
    )
}