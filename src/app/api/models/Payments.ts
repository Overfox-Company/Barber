
import { Schema, model, models } from 'mongoose';
type PaymentType = {
    avatar: string;
    name: string;
    active: boolean
}
const PaymentSchema = new Schema({
    customer: { type: String },
    phone: { type: String },
    price: { type: String },
    tax: { type: String },
    tip: { type: String },
    worker: { type: String },

});

export const Payment = models.Payment || model<PaymentType>("Payment", PaymentSchema);