import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { motion } from 'framer-motion'
//import { FONTCOLORGRAY } from '@/colors/Colors';
import styled from '@emotion/styled'
import { Typography } from '@mui/material';
import Image from 'next/image';
const Label = styled(Typography)({
    color: "red",
    fontSize: 12,
    width: '100%',
    margin: 0,
    marginLeft: 5,
    textAlign: "left",
    letterSpacing: 2,
    fontFamily: "Mulish",
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {

            borderRadius: 8,
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200,
            '&::-webkit-scrollbar': {
                width: '12px', // Ancho de la barra de desplazamiento
                backgroundColor: 'red !important',
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '16px', // Redondear la barra de desplazamiento
                backgroundColor: 'red !important', // Cambia este color según tus preferencias
            },
        },

    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight: theme.typography.fontWeightRegular

    };
}

const CustomIcon: React.FC<any> = ({ isOpen }) => (

    <motion.img
        style={{ marginRight: 10 }}
        initial="initial"
        animate="animate"
        src="/assets/Up.svg"
        alt="icon"
        width={24}
        height={24}
        variants={{

            initial: { rotate: isOpen ? -180 : 0, },
            animate: { rotate: isOpen ? 0 : -180, transition: { duration: 0.3, ease: 'easeOut' } },
        }}
    />
);
export default function SelectCustom({ label, data, selectValue, setSelectValue }: any) {
    const [isOpen, setIsOpen] = React.useState(false);
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof selectValue>) => {
        const {
            target: { value },
        } = event;
        setSelectValue(
            value
        );
        setIsOpen(false);
    };
    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <Label>
                {label}
            </Label>
            <FormControl sx={{ width: "100%", }}>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    style={{
                        height: 60,
                        borderRadius: 8,
                        color: "#647184",
                        fontFamily: "Mulish",
                        fontSize: 16
                    }}
                    value={selectValue}
                    placeholder='xd'
                    onChange={handleChange}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    input={<OutlinedInput />}
                    MenuProps={MenuProps}
                    displayEmpty
                    //   renderValue={(selected) => {
                    //   if (!selected) {
                    //       return <em>Select a opción</em>;
                    // }

                    //   const selectedItem = data.find((item: any) => item.value === selected);
                    //      return selectedItem ? selectedItem.label : '';

                    //  }}
                    IconComponent={() => <CustomIcon isOpen={isOpen} />}

                >
                    {data.map((item: any) => {
                        return <MenuItem
                            key={item.value}
                            value={item.value}
                        //   style={getStyles( selectValue, theme)}
                        >
                            {item.label}
                        </MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    );
}