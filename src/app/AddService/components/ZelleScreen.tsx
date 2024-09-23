import { NextPage } from 'next'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Dispatch, SetStateAction, useContext } from 'react'
import { InitialData, InitialDataType } from '../AddService'
import { Typography } from '@mui/material'
import { Container, Item } from '@/components/Layout/Layout'
import { ContainedButton, OutlinedButton } from '@/components/UI/Buttons'
import FadeIn from '@/components/animation/FadeIn'
import ApiController from '@/controller/ApiController'
import { useRouter } from 'next/navigation'
import { AppContext } from '@/context/AppContext'
import { v4 as uuidv4 } from 'uuid';
interface Props {
    setStep: Dispatch<SetStateAction<number>>,
    setData: Dispatch<SetStateAction<InitialDataType>>,
    data: InitialDataType
}
const ZelleLogo = styled(Image)({

})
const Title = styled(Typography)({
    fontSize: 28,
    fontWeight: 700,
    color: 'rgb(60,60,60)'
})
const ZelleScreen: NextPage<Props> = ({ setStep, data, setData }) => {
    const router = useRouter()
    const { setSnackbarOpen } = useContext(AppContext)
    const handleClick = async () => {
        let cloneData: any = data
        cloneData.transaction_id = uuidv4()
        const res = await ApiController.addPayments(data as any)
        console.log(res)
        const { message, payments } = res.data
        if (payments) {
            setStep(0)
            setData(InitialData)
            router.refresh()

        } else {
            setSnackbarOpen({ message: message, type: 'error' })
        }
    }
    return <FadeIn style={{
        height: '100%',
    }}>
        <div style={{
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center',
            gap: 30,

            height: '100%',
            //  justifyContent: 'space-around'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <Title>
                    Pago por
                </Title>
                <ZelleLogo alt='logo zelle' src={"/assets/zll.png"} width={40} height={40} />
            </div>
            <p style={{ fontSize: 32, fontWeight: 700 }}>${data?.total}</p>
            <ZelleLogo alt='logo zelle' src={"/assets/qr.png"} width={250} height={250} />
            <Container columnSpacing={4} justifyContent={"center"}>

                <Item xs={5}>
                    <OutlinedButton lowerCase onClick={() => setStep(2)}>
                        Back
                    </OutlinedButton>
                </Item>
                <Item xs={5}>
                    <ContainedButton lowerCase onClick={() => handleClick()}>
                        Confirm payment
                    </ContainedButton>
                </Item>
            </Container>
        </div>
    </FadeIn>

}

export default ZelleScreen