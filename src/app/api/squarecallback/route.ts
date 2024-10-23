import { Customers } from "../models/Customers"
import { Payment } from "../models/Payments"
import { Personal } from "../models/Personal"
import { Temporal } from "../models/Temporal"

// pages/api/square-callback.js
export async function POST(req: any) {
    if (req.method === 'POST') {
        // console.log(req)
        // console.log("-------------")
        const data = await req.json()
        //  console.log(data)
        const { type, data: dataPayment } = data
        //  console.log("-------------")
        if (type === 'payment.created') {
            // console.log(dataPayment)
            const { id, object } = dataPayment

            //  const {source } = object.payment
            const temporal = await Temporal.find()

            console.log(temporal)
            const { method, total, phone, price, tax, tip, worker, client_id, customer } = temporal[0]
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
            const newPayment = new Payment({
                transaction_id: id,
                customer: cId,
                phone,
                price,
                tax,
                tip: tip || 0,
                worker: workerSearched.name,
                worker_id: workerSearched._id,
                total,
                method: method || 'card',
                square: true
            })
            try {
                await newPayment.save()
                const allPayments = await Payment.find()
                return new Response(JSON.stringify({ message: 'Payment processed', payments: allPayments }))
            } catch (e) {
                console.log(e)
            }
        }

        return new Response(JSON.stringify({
            message: 'No se ha completado el pago'

        }))

    } else {
        return new Response(JSON.stringify({ message: 'Method Not Allowed', status: 409 }))

    }
}
