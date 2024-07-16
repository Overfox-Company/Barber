'use client'
import { PRIMARYCOLOR, PRIMARYCOLORHOVER } from "@/constants/Colors";
import { PRIMARYFONT } from "@/constants/Fonts";
import AddServiceIcon from "@/icons/AddServicesIcon";
import ArrowMenuIcon from "@/icons/ArrowMenuIcon";
import BackArrowIcon from "@/icons/BackArrowIcon";
import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material"
import { FC, MouseEvent, MouseEventHandler } from "react"
const sizeIcons = 24
interface ButtonType {
    children?: React.ReactNode;
    props?: any;
    style?: any,
    lowerCase?: boolean,
    selected?: boolean,
    icon?: React.ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement> | void | undefined | any;
    logOut?: boolean
}
const TextButton = styled(Typography)({
    fontFamily: PRIMARYFONT,
    textTransform: 'none',

    fontWeight: 700,
    textAlign: 'left'
})

const RoundedButton = styled(Button)({
    borderRadius: 8,
    minWidth: 160,
    width: '100%',
    padding: '12px',
    display: 'flex',
    gap: 12,

})
export const ContainedButton: FC<ButtonType> = ({ children, lowerCase, ...props }) => {
    return (
        <Button style={{
            height: 54,
            color: '#EFF2F7',
            width: '100%',
            borderRadius: 8
        }} variant={"contained"}{...props}>
            <TextButton style={{ textTransform: lowerCase ? 'none' : 'uppercase' }}>
                {children}
            </TextButton>
        </Button>
    )
}
export const SideMenuButton: FC<ButtonType> = ({ logOut, onClick, selected, icon, children, ...props }) => {
    return (
        <RoundedButton {...props} onClick={onClick}
            style={{
                backgroundColor: selected ? PRIMARYCOLORHOVER : undefined,
                justifyContent: logOut ? 'flex-start' : 'space-between'
            }}>
            {icon}
            <TextButton style={{ width: 140, fontSize: 14 }}>
                {children}
            </TextButton>
            {logOut ? null : <ArrowMenuIcon size={sizeIcons} />}
        </RoundedButton>
    )
}
export const CloseButton: FC<ButtonType> = ({ onClick }) => {
    return (
        <Button onClick={onClick} style={{ height: 60, width: 10, padding: 0, borderRadius: 200 }}>
            <BackArrowIcon size={25} />
        </Button>
    )
}