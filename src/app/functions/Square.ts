import { ApiError } from 'square'
import client from './ClientSquare';




export const VerifyPayments = async (id: string) => {
    try {
        // Intentar obtener el pago con un ID incorrecto para testear el manejo de errores
        const response = await client.paymentsApi.getPayment(id);
        //console.log("Payment found:", response.result);
        const { payment } = response.result
        if (payment) {
            console.log(payment?.status);
            return payment
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