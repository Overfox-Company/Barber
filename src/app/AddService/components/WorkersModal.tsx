import { NextPage } from 'next'
import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { ContainedButton } from '@/components/UI/Buttons';
import { Box, DialogContent } from '@mui/material';
import { Container, Item } from '@/components/Layout/Layout';
import { NameUser, TextBase, TextDialog } from '@/components/UI/Text';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import Input from '@/components/UI/Input';
import PaymentIcon from '@/icons/PaymentIcon';

import { PRIMARYCOLOR, PRIMARYCOLORHOVER } from '@/constants/Colors';
import styled from '@emotion/styled';
import Image from 'next/image';
import { workers } from './Step1';
import { AppContext } from '@/context/AppContext';


interface Props {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    changeValue: React.Dispatch<React.SetStateAction<any>>
}

const ContainerCardWorker = styled(Box)({
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    padding: 6,
    borderRadius: 10,
    '&:hover': {
        backgroundColor: PRIMARYCOLORHOVER
    }
})
const WorkersModal = (props: Props) => {
    const { personal } = React.useContext(AppContext)
    const { onClose, selectedValue, open, changeValue } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const SelectValue = (id: string | number) => {

        onClose(selectedValue);
        changeValue((prev: any) => ({ ...prev, worker: id }))
    }
    return (
        <Dialog onClose={handleClose} open={open} maxWidth="xs" fullWidth>
            <DialogContent>
                <div style={{ display: 'flex', gap: 10 }}>
                    {personal.length > 0 ? personal.map((worker) => (
                        <ContainerCardWorker key={worker._id} onClick={() => SelectValue(worker._id)}
                            style={{ backgroundColor: selectedValue.toString() === worker._id.toString() ? PRIMARYCOLORHOVER : 'white' }}
                        >
                            <div style={{ width: 160, height: 140, position: 'relative' }}>
                                <Image src={worker.avatar}
                                    style={{ borderRadius: 6 }}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="#" />

                            </div>
                            <NameUser size={14}>
                                {worker.name}
                            </NameUser>
                        </ContainerCardWorker>
                    )) : null}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default WorkersModal