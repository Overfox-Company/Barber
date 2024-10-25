
import { uploadFileToCloudinary } from "@/app/functions/Cloudinary";
import { connectDB } from "../database/MongoConnect";
import { Personal } from "../models/Personal";
import { Temporal } from "../models/Temporal";
import { Payment } from "../models/Payments";



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
        /*  const pay = new Payment({
              transaction_id: "ROrsm7FQuJmDgM6jSxqi9P3LvaB",
              customer: "",
              phone: "",
              price: "28",
              tax: '0',
              tip: '0',
              worker: "Frias",
              worker_id: "66dbd8123d32dfc403b0c711",
              total: "28",
             method: 'cash',
              square: true
          })
          await pay.save()
          return new Response(JSON.stringify({ message: 'pago', pay }))*/
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'error en la api', error: error }))
    }
}