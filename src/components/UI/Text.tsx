import { PRIMARYCOLOR, PRIMARYCOLORHOVER } from "@/constants/Colors";
import { PRIMARYFONT } from "@/constants/Fonts";
import styled from "@emotion/styled";
import { Typography } from '@mui/material'
import { NextPage } from 'next'

interface Props { children: React.ReactNode }
const TextBase = styled(Typography)({
    fontFamily: PRIMARYFONT,
    color: PRIMARYCOLOR
})
export const NameUser: NextPage<Props> = ({ children }) => {
    return <TextBase style={{ fontWeight: 700, fontSize: 22 }}>
        {children}
    </TextBase>
}

export const UserRol: NextPage<Props> = ({ children }) => {
    return <TextBase style={{ fontWeight: 500, fontSize: 14 }}>
        {children}
    </TextBase>
}