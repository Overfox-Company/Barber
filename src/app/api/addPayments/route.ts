
import { uploadFileToCloudinary } from "@/app/functions/Cloudinary";
import { connectDB } from "../database/MongoConnect";
import { Personal } from "../models/Personal";
import { Payment } from "../models/Payments";



export async function POST(req: Request) {
    try {
        await connectDB()
        const { customer, phone, price, tax, tip, worker, transaction_id } = await req.json()
        if (!price || !tax || !tip || !worker) {
            return new Response(JSON.stringify({ message: 'We need al camps', }))
        }
        const workerSearched = await Personal.findById(worker)
        if (!workerSearched._id) {
            return new Response(JSON.stringify({ message: 'Dont find worker', }))
        }
        const newPayment = new Payment({ transaction_id, customer, phone, price, tax, tip, worker: workerSearched.name })
        await newPayment.save()
        const allPayments = await Payment.find()
        return new Response(JSON.stringify({ message: 'Payment processed', payments: allPayments }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'Error in the API', error: error }))
    }
}