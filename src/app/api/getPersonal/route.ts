
import { uploadFileToCloudinary } from "@/app/functions/Cloudinary";
import { connectDB } from "../database/MongoConnect";
import { Personal } from "../models/Personal";



export async function GET(req: Request) {
    try {
        await connectDB()
        const allPersonal = await Personal.find()
        return new Response(JSON.stringify({ message: 'personal searched', personal: allPersonal }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'error en la api', error: error }))
    }
}