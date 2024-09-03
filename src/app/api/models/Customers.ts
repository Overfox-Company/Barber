
import { Schema, model, models } from 'mongoose';
type PaymentType = {
    phone: string;
    name: string;

}
const CustomersSchema = new Schema({
    name: { type: String },
    phone: { type: String, unique: true },

}, {
    timestamps: true
});

export const Customers = models.Customers || model<PaymentType>("Customers", CustomersSchema);
