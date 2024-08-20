import { Container, Item } from '@/components/Layout/Layout'
import { TextDialog } from '@/components/UI/Text'
import { PRIMARYCOLOR, PRIMARYCOLORHOVER } from '@/constants/Colors'
import AddImageIcon from '@/icons/AddImageIcon'
import UserIcon from '@/icons/UserIcon'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import Image from 'next/image'
import { useCallback, useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import * as Yup from 'yup'
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { ContainedButton, OutlinedButton } from '@/components/UI/Buttons'
import Input from '@/components/UI/Input'
import ApiController from '@/controller/ApiController'
import { AppContext } from '@/context/AppContext'
interface Props { }
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
});

const AddPersonal: NextPage<Props> = ({ }) => {
    const { setPersonal } = useContext(AppContext)
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const url = file;
        setAvatarPersonal(url)

    }, [])
    const { getRootProps, getInputProps, } = useDropzone({ onDrop, maxFiles: 1 })
    const [avatarPersonal, setAvatarPersonal] = useState<File | null>(null)
    const handleSend = async (values: { name: string }, resetForm: any) => {

        const data = {
            avatar: avatarPersonal as File,
            name: values.name
        }
        const result = await ApiController.addPersonal(data)
        //console.log(result)
        const { personal } = result.data
        if (personal) {
            setAvatarPersonal(null)
            resetForm()
            setPersonal(personal)
        }
    }
    return <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <TextDialog>Add barbers</TextDialog>
        <br />
        <div {...getRootProps()} style={{ display: 'flex', justifyContent: 'center' }}>
            <input {...getInputProps()} />

            <div
                style={{
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    backgroundColor: PRIMARYCOLORHOVER,
                    width: 110,
                    height: 110,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8
                }}>

                {
                    avatarPersonal ? <Image src={URL.createObjectURL(avatarPersonal)} fill objectFit='contain' alt='' /> : <AddImageIcon size={70} />
                }
            </div>
        </div>
        <br />
        <Formik
            onSubmit={(values, { resetForm }) => handleSend(values, resetForm)}
            initialValues={{ name: '' }}
            validationSchema={validationSchema}
        >
            {({ errors, touched }) => (
                <Form>
                    <Container columnSpacing={4}>
                        <Item xs={12}>
                            <Input name="name" error={errors.name} touched={touched.name} label="Name" placeholder='jhon' />
                        </Item>
                    </Container>
                    <br />
                    <Container columnSpacing={4} justifyContent={"center"}>
                        <Item xs={12}>
                            <ContainedButton lowerCase type="submit" disabled={!avatarPersonal}>
                                Next
                            </ContainedButton>
                        </Item>
                    </Container>
                </Form>
            )}

        </Formik>
    </div>
}

export default AddPersonal