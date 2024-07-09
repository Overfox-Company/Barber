import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <main style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <br /><br />
      <Button variant={"contained"} style={{ width: "30vw" }}>
        <a href="intent:#Intent;action=com.squareup.pos.action.CHARGE;S.com.squareup.pos.CLIENT_ID=sq0idp-Gg38JTyT8ySsWFFyH47jSQ;S.com.squareup.pos.API_VERSION=v2.0;S.com.squareup.pos.WEB_CALLBACK_URI=https://localhost:3000/api/squarecallback;S.com.squareup.pos.CURRENCY_CODE=USD;i.com.squareup.pos.TOTAL_AMOUNT=1;S.version=2023-06-28;S.com.squareup.pos.TENDER_TYPES=com.squareup.pos.TENDER_CARD,com.squareup.pos.TENDER_CASH;end">
          Pay with Square
        </a>

      </Button>
      <br /><br />
      <Button variant="contained" style={{ width: "30vw" }}>

        <a href="square-commerce-v1://payment/create?client_id=sq0idp-Gg38JTyT8ySsWFFyH47jSQ&version=2023-06-28&amount_money=1&currency_code=USD&callback_url=https://localhost:3000/api/squarecallback&tender_types=CARD,CASH">
          Pay with Square IOS
        </a>
      </Button>

    </main>
  );
}
