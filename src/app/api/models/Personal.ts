
import { Schema, model, models } from 'mongoose';
type PersonalType = {
    avatar: string;
    name: string;
    active: boolean
}
const PersonalSchema = new Schema({
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean }
});

export const Personal = models.Personal || model<PersonalType>("Personal", PersonalSchema);
