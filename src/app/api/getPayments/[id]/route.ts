
import { uploadFileToCloudinary } from "@/app/functions/Cloudinary";
import { connectDB } from "../../database/MongoConnect";
import { Personal } from "../../models/Personal";
import { Payment } from "../../models/Payments";



export async function GET(req: Request) {
    try {
        await connectDB()
        const allPayments = await Payment.find().sort({ createdAt: -1 });
        return new Response(JSON.stringify({ message: 'payments searched', payments: allPayments }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'error en la api', error: error }))
    }
}