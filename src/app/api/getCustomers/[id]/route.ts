import { connectDB } from "../../database/MongoConnect";
import { Customers } from "../../models/Customers";

export async function GET(req: Request) {
    try {
        await connectDB()
        const allCustomers = await Customers.find()
        return new Response(JSON.stringify({ message: 'payments searched', customers: allCustomers }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'error en la api', error: error }))
    }
}