'use client'
import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    const handlePayment = () => {
        const callbackUrl = encodeURIComponent('https://loacalhost:3000/api/squarescallback');
        window.location.href = `intent:#Intent;action=com.squareup.pos.action.CHARGE;S.com.squareup.pos.CLIENT_ID=sq0idp-Gg38JTyT8ySsWFFyH47jSQ;S.com.squareup.pos.WEB_CALLBACK_URI=${callbackUrl};S.com.squareup.pos.CURRENCY_CODE=USD;i.com.squareup.pos.TOTAL_AMOUNT=1;end`;
    };
    return <div>
        <button onClick={handlePayment}>Pay with Square</button>
    </div>
}

export default Page