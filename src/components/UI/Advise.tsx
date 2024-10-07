import { NextPage } from 'next'
import Image from 'next/image'
import { Container, Item } from '../Layout/Layout'
import { Typography } from '@mui/material'
import { PRIMARYCOLOR } from '@/constants/Colors'

interface Props { }

const Advise: NextPage<Props> = ({ }) => {
    return <div style={{ display: 'flex', gap: 8, padding: 12, borderRadius: 8, backgroundColor: 'rgba(66,159,244,0.24)' }}>

        <Image alt='' src={"/assets/info.png"} width={18} height={18} />

        <Typography style={{ color: PRIMARYCOLOR }}>
            The fee will only be applied when the payment method is by credit card.
        </Typography>


    </div>
}

export default Advise