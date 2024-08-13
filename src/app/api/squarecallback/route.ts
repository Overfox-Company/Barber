// pages/api/square-callback.js
export async function GET(req: any) {
    if (req.method === 'GET') {
        console.log(req)
        //  const { transactionId, status } = req?.q;
        // Procesa la respuesta de Square aquí
        //   if (status === 'COMPLETED') {
        // Lógica para manejar transacción exitosa
        //  if (transactionId) {
        //    console.log(`Transaction completed successfully with ID: ${transactionId}`);
        //    return new Response(JSON.stringify({
        //      message: 'pago completado', transactionId
        //
        //    }))
        //   }
        return new Response(JSON.stringify({
            message: 'pago  completado'//, transactionId

        }))
        //} else {
        // Lógica para manejar transacción fallida o cancelada
        // console.log(`Transaction failed or was canceled with ID: ${transactionId}`);
        //  return new Response(JSON.stringify({ message: 'error completando el pago', }))
        //  }
    } else {
        return new Response(JSON.stringify({ message: 'Method Not Allowed', status: 409 }))

    }
}
