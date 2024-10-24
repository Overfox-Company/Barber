
import { uploadFileToCloudinary } from "@/app/functions/Cloudinary";
import { connectDB } from "../database/MongoConnect";
import { Personal } from "../models/Personal";
import { Payment } from "../models/Payments";


const startOfYesterday = new Date('2024-10-23T00:00:00.000Z');
const endOfYesterday = new Date('2024-10-23T23:59:59.999Z');
export async function POST(req: Request) {
    try {
        const data = await req.json()
        const { worker, method } = data
        console.log(data)
        await connectDB()
        const allPayments = await Payment.find({
            worker,
            method,
            createdAt: {
                $gte: startOfYesterday,
                $lt: endOfYesterday
            }
        }).sort({ createdAt: -1, });
        return new Response(JSON.stringify({ message: 'payments searched', payments: allPayments }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'error en la api', error: error }))
    }
}