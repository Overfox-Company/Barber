'use client'
import ApiController from '@/controller/ApiController'
import { NextPage } from 'next'
import { useState } from 'react'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    const [state, setSatate] = useState('')
    const getData = async () => {
        const res = await ApiController.getData()
        setSatate(JSON.stringify(res.data))
    }
    return <div>
        <button onClick={() => getData()}>
            get
        </button>
        {state}
    </div>
}

export default Page