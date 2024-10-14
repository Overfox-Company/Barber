'use client'
import ApiController from '@/controller/ApiController'
import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    const handleClick = async () => {
        const res = await ApiController.saveData({ data: "xdxdxdxd" })
        console.log(res)
    }
    return <div>
        <button onClick={() => handleClick()}>
            send
        </button>
    </div>
}

export default Page