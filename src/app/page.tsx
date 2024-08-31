'use client'
import { Button } from "@mui/material";
import { Container, Item } from "@/components/Layout/Layout";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import AddService from "./AddService/AddService";
import Personal from "./Personal/Personal";
import History from "./History/History";


export default function Home() {
  const { menuSelecte } = useContext(AppContext);


  return (
    <main
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Container rowSpacing={4} justifyContent={"center"}>

        <Item xs={12}>
          {menuSelecte === 0 ? <AddService /> : null}
          {menuSelecte === 1 ? <Personal /> : null}
          {menuSelecte === 3 ? <History /> : null}
        </Item>
        { /*  <Item xs={12}>
          <br /><br />
          <Button variant={"contained"} style={{ width: "30vw" }}>
            <a href="intent:#Intent;action=com.squareup.pos.action.CHARGE;S.com.squareup.pos.CLIENT_ID=sq0idp-Gg38JTyT8ySsWFFyH47jSQ;S.com.squareup.pos.API_VERSION=v2.0;S.com.squareup.pos.WEB_CALLBACK_URI=https://localhost:3000/api/squarecallback;S.com.squareup.pos.CURRENCY_CODE=USD;i.com.squareup.pos.TOTAL_AMOUNT=1;S.version=2023-06-28;S.com.squareup.pos.TENDER_TYPES=com.squareup.pos.TENDER_CARD,com.squareup.pos.TENDER_CASH;end">
              Pay with Square
            </a>

          </Button>

          <br /><br />
          <Button variant="contained" style={{ width: "30vw" }}>

            <a href={`square-commerce-v1://payment/create?data=${encodeURIComponent(JSON.stringify(dataParameter))}`}>
              Pay with Square IOS
            </a>
          </Button>
        </Item>*/}
      </Container>
    </main>
  );
}
