import { PRIMARYCOLOR, PRIMARYCOLORHOVER } from "@/constants/Colors";
import { PRIMARYFONT } from "@/constants/Fonts";
import styled from "@emotion/styled";
import { Typography } from '@mui/material'
import { NextPage } from 'next'

interface Props { children: React.ReactNode, size?: number }
export const TextBase = styled(Typography)({
    fontFamily: PRIMARYFONT,
    color: PRIMARYCOLOR
})
export const NameUser: NextPage<Props> = ({ children, size = 22 }) => {
    return <TextBase style={{ fontWeight: 700, fontSize: size, width: '100%', textAlign: 'center' }}>
        {children}
    </TextBase>
}

export const UserRol: NextPage<Props> = ({ children }) => {
    return <TextBase style={{ fontWeight: 500, fontSize: 14 }}>
        {children}
    </TextBase>
}
export const TextDialog: NextPage<Props> = ({ children }) => {
    return <TextBase style={{ fontWeight: 700, fontSize: 24 }}>
        {children}
    </TextBase>
}