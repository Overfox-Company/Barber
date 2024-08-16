
import { uploadFileToCloudinary } from "@/app/functions/Cloudinary";
import { connectDB } from "../database/MongoConnect";
import { Personal } from "../models/Personal";



export async function POST(req: Request) {
    try {
        return new Response(JSON.stringify({ message: 'ruta funcionando' }))
        await connectDB()
        const formData = await req.formData();

        const formDataObject: any = Object.fromEntries(formData.entries());
        const json = formDataObject;
        const { name, avatar } = json;
        let avaUpload: any
        if (!name && !avatar) {
            return new Response(JSON.stringify({ message: 'you need all fields' }))
        }
        avaUpload = await uploadFileToCloudinary(avatar)
        console.log(avaUpload)
        if (!avaUpload.url) {
            return new Response(JSON.stringify({ message: 'error subiendo imagen', error: avaUpload }))
        }
        const newPersonal = new Personal({
            name, avatar: avaUpload.url
        }

        )
        await newPersonal.save()
        const allPersonal = await Personal.find()
        return new Response(JSON.stringify({ message: 'personal added', personal: allPersonal }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'error en la api', error: error }))
    }
}