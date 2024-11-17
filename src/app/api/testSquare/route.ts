import { VerifyPayments } from "@/app/functions/Square"
import { Customers } from "../models/Customers"
import { Payment } from "../models/Payments"
import { Personal } from "../models/Personal"
import { Temporal } from "../models/Temporal"

// pages/api/square-callback.js
export async function POST(req: any) {
    try {
        const response = await VerifyPayments("JYkVkG9l9wLz94wPgpUyZErYvaB")
        //   console.log(response.status)
        //   if (response.status === "COMPLETED") {
        console.log("success")
        //   }
        //   if (response.status === "FAILED") {
        console.log("fail")
        //    }
        return new Response(JSON.stringify({ message: "payment result", }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Error callback", status: 409 }))
    }

}
