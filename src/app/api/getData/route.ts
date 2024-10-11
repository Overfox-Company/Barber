
import { uploadFileToCloudinary } from "@/app/functions/Cloudinary";
import { connectDB } from "../database/MongoConnect";
import { Personal } from "../models/Personal";
import { Temporal } from "../models/Temporal";



export async function POST(req: Request) {
    try {

        await connectDB()
        const temporal = await Temporal.find()
        //  await Temporal.deleteMany({});
        return new Response(JSON.stringify({ message: 'ok', data: temporal }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'error en la api', error: error }))
    }
}