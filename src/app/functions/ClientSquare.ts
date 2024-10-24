import { Client, Environment, } from 'square'



const client = new Client({
    accessToken: 'EAAAlq5rWoHS6Qte71GZ0gGbW_apyhsJt6EMZOXdDm6QZOrMlQ37I1Sp00sHrY0y', // Reemplaza con tu Access Token
    environment: 'production' as Environment // O 'production' si ya estás en producción
});
export default client