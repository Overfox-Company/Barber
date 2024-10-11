
import { uploadFileToCloudinary } from "@/app/functions/Cloudinary";
import { connectDB } from "../database/MongoConnect";
import { Personal } from "../models/Personal";
import { Temporal } from "../models/Temporal";



export async function POST(req: Request) {
    try {

        await connectDB()
        const { data } = await req.json()
        console.log(data)
        await Temporal.deleteMany({});
        const newTemporal = new Temporal({
            name: JSON.stringify(data)
        })
        await newTemporal.save()
        return new Response(JSON.stringify({ message: 'ok', data: newTemporal }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'error en la api', error: error }))
    }
}