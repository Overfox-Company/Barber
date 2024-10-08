// Eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import React, { useState } from "react";
import { Field } from "formik";
import styled from "@emotion/styled";
import { InputProps } from "@/types/App";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, Typography } from "@mui/material";
import { Container, Item } from "../Layout/Layout";
import { PRIMARYCOLOR } from "@/constants/Colors";
const Label = styled(Typography)({
    color: PRIMARYCOLOR,
    width: "100%",
    fontSize: "16px",
    textAlign: "left",
    marginLeft: 5,
    fontWeight: 700
})
//Deezert es una aplicacion para la gestion empresarial, tanto del lado de recursos humanos como la gestion administrativa y la gestion de proyectos
const TextInput = styled(Field)({
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

});
const Error = styled(Typography)({
    color: "red",
    fontSize: 12,
    width: '100%',
    margin: 0,
    marginLeft: 5,
    textAlign: "left",
    letterSpacing: 2,
    fontFamily: "Mulish",
});
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
const ViewPassword = styled(VisibilityIcon)({

})
const OcultPassword = styled(VisibilityOffIcon)({

})
const Input: React.FC<InputProps> = ({

    name,
    label,
    error,
    touched,
    placeholder,
    type,
    as,
    rows,
    cols,
    children,
    ...props
}) => {
    const [isPassword, setIsPassword] = useState(type === 'password' ? true : false)
    return (
        <Container
            rowSpacing={1}
        >
            {label && (
                <Item xs={12}>
                    <Label
                    >
                        {label}
                    </Label>
                </Item>
            )}
            <Item xs={12}>
                <ContainerInput style={{
                    borderColor: error && touched ? "red" : undefined,
                    //  fontSize: "1.1vw",
                }} >
                    <TextInput
                        style={{

                            resize: 'none'
                        }}
                        name={name}
                        placeholder={placeholder}
                        type={type === 'password' ? isPassword ? 'password' : 'text' : type}
                        as={as ?? null}
                        rows={rows}
                        cols={cols}

                    >
                        {children}
                    </TextInput>
                    {type == 'password' ? <IconButton onClick={() => setIsPassword(!isPassword)}>
                        {isPassword ? <ViewPassword /> : <OcultPassword />}
                    </IconButton> : null}
                </ContainerInput>
            </Item>
            <Item xs={12}>
                {error && touched ? <Error>{error}</Error> : null}

            </Item>
        </Container>


    )
};
export default Input;

export const InputSimple = styled.input({
    border: 0,
    outline: 'none',
    padding: 5,
    fontSize: 16,
    boxShadow: '0 0 0px 0 rgb(50,50,50)',
    fontFamily: '"Inter",sans-serif',
    width: 120
})