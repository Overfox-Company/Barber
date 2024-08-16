import cloudinary from "cloudinary";
import { v4 as uuidv4 } from 'uuid';


(cloudinary as any).config({
    cloud_name: process.env.CLOUDINARYKEYCLOUD,
    api_key: process.env.CLOUDINARYKEY,
    api_secret: process.env.CLOUDINARYKEYSECRET,
    secure: true,
});
export async function uploadFileToCloudinary(file: File) {
    try {
        // Convertir el archivo a un buffer
        const buffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);

        const publicId = `${file.name}`;

        return new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream(
                {
                    resource_type: "auto",
                    public_id: file.name,
                },
                (error, result) => {
                    if (error) {
                        console.log(error);
                        return (error);
                    } else {
                        console.log("Archivo subido correctamente");
                        resolve(result);
                    }
                }
            ).end(uint8Array); // Enviar el buffer al método upload_stream
        });
    } catch (error) {
        console.error(error);
        return (error);
    }
}
export async function deleteFileFromCloudinary(publicId: string) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.destroy(publicId, (error, result) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Archivo eliminado correctamente");
                resolve(result);
            }
        });
    });
}