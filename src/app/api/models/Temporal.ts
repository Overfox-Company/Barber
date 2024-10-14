
import { Schema, model, models } from 'mongoose';
type PaymentType = {
    phone: string;
    name: string;

}
const TemporalSchema = new Schema({
    name: { type: String },

}, {
    timestamps: true
});

export const Temporal = models.Temporal || model<PaymentType>("Temporal", TemporalSchema);
