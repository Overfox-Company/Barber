
import { uploadFileToCloudinary } from "@/app/functions/Cloudinary";
import { connectDB } from "../database/MongoConnect";
import { Personal } from "../models/Personal";
import nodemailer from 'nodemailer';


export async function POST(req: Request) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, // Usar 465 para SSL
            secure: false, // true para 465, false para otros puertos 
            auth: {
                user: process.env.EMAIL_USER, // Cambia esto por tu correo
                pass: process.env.EMAIL_PASS, // Cambia esto por tu contraseña
            },
        });
        const { amount, barber } = await req.json();

        const to =/* 'overfoxcompany@gmail.com'*/'perezbarbershop1411@gmail.com'
        const subject = 'Zelle payment by barber shop'
        const text = `Payment for $${amount} to the barber ${barber}`
        const mailOptions = {
            from: process.env.EMAIL_USER, // Tu dirección de correo de Gmail
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: 'Correo enviado con éxito' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'error en la api', error: error }))
    }
}