'use client'
import { NextPage } from 'next'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { ReactNode } from 'react';
import { PRIMARYCOLOR } from '@/constants/Colors';

interface Props { children: ReactNode }

export const theme = createTheme({
    palette: {
        primary: {
            main: PRIMARYCOLOR,
        },
    },
});

const Theme: NextPage<Props> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}

export default Theme;
