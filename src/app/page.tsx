import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <Button variant={"contained"}>
        <a href="intent:#Intent;action=com.squareup.pos.action.CHARGE;S.com.squareup.pos.CLIENT_ID=sq0idp-Gg38JTyT8ySsWFFyH47jSQ;S.com.squareup.pos.API_VERSION=v2.0;S.com.squareup.pos.WEB_CALLBACK_URI=https://localhost:3000/api/squarecallback;S.com.squareup.pos.CURRENCY_CODE=USD;i.com.squareup.pos.TOTAL_AMOUNT=1;S.version=2023-06-28;S.com.squareup.pos.TENDER_TYPES=com.squareup.pos.TENDER_CARD,com.squareup.pos.TENDER_CASH;end">
          Pay with Square
        </a>
      </Button>


    </main>
  );
}
