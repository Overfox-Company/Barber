
'use client'
import { NextPage } from 'next'
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import FadeIn from '@/components/animation/FadeIn';
import { NameUser } from '@/components/UI/Text';
import ApiController from '@/controller/ApiController';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface Props { }

const SendData: NextPage<Props> = ({ }) => {

    const [state, setSatate] = useState('')

    const handlePayment = () => {
        const callbackUrl = encodeURIComponent('https://loacalhost:3000/api/squarescallback');
        window.location.href = `intent:#Intent;action=com.squareup.pos.action.CHARGE;S.com.squareup.pos.CLIENT_ID=sq0idp-Gg38JTyT8ySsWFFyH47jSQ;S.com.squareup.pos.WEB_CALLBACK_URI=${callbackUrl};S.com.squareup.pos.CURRENCY_CODE=USD;i.com.squareup.pos.TOTAL_AMOUNT=1;end`;
    };
    const [result, setResult] = useState({
        message: '',
        type: 'error'
    })
    const [countDown, setCountDown] = useState(false)
    const [time, setTime] = useState(3)
    const route = useRouter()
    const [oneSend, setOneSend] = useState(false)




    const handleSend = async (id: string) => {
        const json = localStorage.getItem("payment")
        const data = json ? JSON.parse(json) : null
        if (data && !oneSend) {
            console.log(oneSend)
            data.transaction_id = id
            console.log(data)
            const res = await ApiController.addPayments(data)
            // console.log(res)
            const { message, payments } = res.data
            if (payments) {
                setResult({ message: 'The transaction has been processed correctly', type: 'success' })
                localStorage.removeItem("payment")
                setCountDown(true)
            } else {
                setResult({ message, type: 'error' })
            }

        } else {
            setResult({ message: 'An error has ocurred in the payment data', type: 'error' })
        }
    }


    useEffect(() => {

        if (countDown) {
            setInterval(() => {
                setTime(prev => prev - 1)
            }, 1000)
        }

    }, [countDown])
    useEffect(() => {
        if (time === 0) {
            route.push('/')
        }
        //  console.log("veces que se pinta")
    }, [time])
    const searchParams = useSearchParams();
    useEffect(() => {

        const data = searchParams.get('data');

        if (data && !oneSend) {
            console.log(searchParams.get('data'))
            setOneSend(true)
            setSatate(data)
            const parsedData = JSON.parse(data);
            // console.log(parsedData);
            if (parsedData.status === 'error') {
                setResult({ message: parsedData.error_code, type: 'error' })
                setCountDown(true)
            } else {
                handleSend(parsedData.transaction_id)
            }

            // Procesa los datos según sea necesario
        } else {
            //    console.log('No se encontraron datos en la URL.');
            setResult({ message: "Transaction error", type: 'error' })
        }

    }, [])

    return <div style={{
        height: '100vh', width: '100%',
        alignItems: 'center', display: 'flex', justifyContent: 'center'
    }}>
        <Box style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 400,
            height: 300,
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: 40,
            borderRadius: 20,
            boxShadow: '0 8px 8px rgba(0, 0, 45, 0.1)',
        }}>
            {result.message ? <FadeIn>
                <Image src={result.type === "error" ? "/assets/err.png"
                    : "/assets/succes.png"} width={60} height={60} alt='icon' />
            </FadeIn> : <FadeIn>

                <CircularProgress />
            </FadeIn>}{
                /*
                <p>{state}</p>
           */ }
            <br />
            {result.message ? <NameUser>{result.message}</NameUser> : <NameUser>Procesando</NameUser>}
            {result.message && countDown ? <NameUser size={18}>Redirecting in {time}s</NameUser> : null}
        </Box>
    </div>
}

export default SendData