
import { uploadFileToCloudinary } from "@/app/functions/Cloudinary";
import { connectDB } from "../database/MongoConnect";
import { Personal } from "../models/Personal";



export async function POST(req: Request) {
    try {
        await connectDB()
        const { id } = await req.json()
        if (!id) {
            return new Response(JSON.stringify({ message: 'dont have id' }))
        }
        await Personal.findByIdAndDelete(id)
        const allPersonal = await Personal.find()
        return new Response(JSON.stringify({ message: 'personal added', personal: allPersonal }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'error en la api', error: error }))
    }
}