
import { uploadFileToCloudinary } from "@/app/functions/Cloudinary";
import { connectDB } from "../database/MongoConnect";
import { Personal } from "../models/Personal";
import { Payment } from "../models/Payments";
import { Customers } from "../models/Customers";



export async function POST(req: Request) {
    try {
        await connectDB()
        const { method, total, phone, price, tax, tip, worker, transaction_id, client_id, customer } = await req.json()
        if (!price || !tax || !worker || !total) {
            return new Response(JSON.stringify({ message: 'We need all camps', }))
        }

        console.log(total)

        console.log(price)
        console.log(tax)
        console.log(worker)
        console.log(transaction_id)
        console.log("-----------------")
        console.log(phone)
        console.log(client_id)
        console.log(customer)
        const workerSearched = await Personal.findById(worker)
        if (!workerSearched._id) {
            return new Response(JSON.stringify({ message: 'Dont find worker', }))
        }
        let cId = null
        if (!client_id && phone && customer) {
            try {
                const newClient = new Customers({ name: customer, phone });
                await newClient.save();
                cId = newClient._id;
            } catch (err) {
                console.log('Error creating client:', err);
                // Continúa el flujo sin interrumpir en caso de error al crear el cliente
            }
        }
        if (client_id) {
            cId = client_id
        }
        const newPayment = new Payment({ transaction_id, customer: cId, phone, price, tax, tip: tip || 0, worker: workerSearched.name, worker_id: workerSearched._id, total, method: method || 'card' })
        const res = await Payment.find({ transaction_id })
        console.log("aca es la cantidad de registros con la misma url transaction")
        console.log(res.length)
        if (res.length === 0) {
            await newPayment.save()
        } else {
            //   return new Response(JSON.stringify({ message: 'No 2 ids can be the same', }))
        }

        const allPayments = await Payment.find()
        return new Response(JSON.stringify({ message: 'Payment processed', payments: allPayments }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'Error in the API', error: error }))
    }
}