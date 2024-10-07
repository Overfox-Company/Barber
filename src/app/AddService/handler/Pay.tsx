
export const handlePay = (value: number) => {

    let dataParameter = {
        amount_money: {
            amount: value * 100,
            currency_code: "USD"
        },

        // Replace this value with your application's callback URL
        callback_url: "https://barber-git-develop-overfoxcompanys-projects.vercel.app/squarecallback/",

        // Replace this value with your application's ID
        client_id: process.env.NEXT_PUBLIC_CLIENTSQ,

        version: "1.3",
        notes: "notes for the transaction",
        options: {
            supported_tender_types: [
                "CREDIT_CARD",
                "CASH",
                // "OTHER",
                // "SQUARE_GIFT_CARD",
                // "CARD_ON_FILE"

            ]
        }
    };
    const formated = encodeURIComponent(JSON.stringify(dataParameter))
    return `square-commerce-v1://payment/create?data=${formated}`
}
