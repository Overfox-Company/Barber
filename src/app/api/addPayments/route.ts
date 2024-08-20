
import { uploadFileToCloudinary } from "@/app/functions/Cloudinary";
import { connectDB } from "../database/MongoConnect";
import { Personal } from "../models/Personal";
import { Payment } from "../models/Payments";



export async function POST(req: Request) {
    try {
        await connectDB()
        const { customer, phone, price, tax, tip, worker } = await req.json()
        const newPayment = new Payment({ customer, phone, price, tax, tip, worker })
        await newPayment.save()
        const allPayments = await Payment.find()
        return new Response(JSON.stringify({ message: 'Payment processed', payments: allPayments }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'Error in the API', error: error }))
    }
}