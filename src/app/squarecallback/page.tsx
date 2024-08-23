'use client'
import { Box } from '@mui/material';
import { NextPage } from 'next'
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import FadeIn from '@/components/animation/FadeIn';
import { NameUser } from '@/components/UI/Text';
import ApiController from '@/controller/ApiController';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import SendData from './SendData';

interface Props { }

const Page: NextPage<Props> = ({ }) => {



    return <Suspense fallback={<div>
        cargando
    </div>}>
        <SendData />
    </Suspense>

}

export default Page