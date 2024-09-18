'use client'
import { Button } from "@mui/material";
import { Container, Item } from "@/components/Layout/Layout";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import AddService from "./AddService/AddService";
import Personal from "./Personal/Personal";
import History from "./History/History";
import Customers from "./customers/page";


export default function Home() {
  const { menuSelecte } = useContext(AppContext);


  return (
    <main
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 2,
        alignItems: 'center'
      }}>
      <Container rowSpacing={4} justifyContent={"center"} >
        <Item xs={12}>
          {menuSelecte === 0 ? <AddService /> : null}
          {menuSelecte === 1 ? <Personal /> : null}
          {menuSelecte === 2 ? <Customers /> : null}
          {menuSelecte === 3 ? <History /> : null}
        </Item>
      </Container>
    </main>
  );
}
