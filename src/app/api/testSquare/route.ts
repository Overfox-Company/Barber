import { Customers } from "../models/Customers"
import { Payment } from "../models/Payments"
import { Personal } from "../models/Personal"
import { Temporal } from "../models/Temporal"
import { Client, Environment, ApiError } from 'square'



const client = new Client({
    accessToken: 'EAAAlq5rWoHS6Qte71GZ0gGbW_apyhsJt6EMZOXdDm6QZOrMlQ37I1Sp00sHrY0y', // Reemplaza con tu Access Token
    environment: 'production' as Environment // O 'production' si ya estás en producción
});
export async function POST(req: any) {

    try {
        // Intentar obtener el pago con un ID incorrecto para testear el manejo de errores
        const response = await client.paymentsApi.getPayment('5suL1mn9detjqqxo79nNb8AvaB');
        //console.log("Payment found:", response.result);
        const { payment } = response.result
        if (payment) {
            console.log(payment?.status);
            return payment?.status
        }
        // Retornar una respuesta si el pago fue encontrado


    } catch (error) {
        // Si el error es un ApiError con código 404 (NOT_FOUND), lo manejamos aquí
        if (error instanceof ApiError) {
            // console.log("Status code:", error.statusCode); // Ahora puedes acceder a statusCode
            //   console.log("Payment not found. Details:", error.message, error.errors);
            return 404;
        }

        // Manejo de otros errores
        //  console.error("An error occurred while fetching the payment:", error);
        return 500;
    }

}

