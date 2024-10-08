
import { PaymentsType } from "@/types/Payments";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


// Define the base URL for the API
const branch = process.env.NEXT_PUBLIC_IS_DEVELOP
export const Domain = process.env.NEXT_PUBLIC_PRODUCTION == 'true' ? branch : "http://localhost:3000/";

// Define the base route for the API

//THIS FILE NEED A REFACTOR, TO USERCONTROLLER, COMPANYCONTROLLER ETC
const Route = `${Domain}api`;

const api = axios.create({
    baseURL: Route,

});
const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};
// Enviar el token en cada solicitud
api.interceptors.request.use(async (config: any) => {
    const token = await getToken(); // Obtener el token de alguna manera
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.data) {
            const { status, data } = error.response;
            // Manejar el error de acuerdo a la respuesta
            //console.log(status)
            // console.log(data)
            // Verificar el tamaño de la respuesta
            const contentLength = error.response.headers['content-length'];
            const maxSize = 1; // Establece el límite en bytes (1MB en este ejemplo)
            if (contentLength && parseInt(contentLength) > maxSize) {
                //    console.log("el tamaño de la peticion es muy grande")
            }
        }

        return Promise.reject(error);
    }
);
let requestPending = false

const Interval = (method?: string, route?: string, data?: any) => {
    if (!requestPending) {
        requestPending = true;
        setTimeout(() => {
            createApiRequest(method, route, data);
        }, 10000);
    }
};



const createApiRequest = async (method?: string, route?: string, data?: any) => {
    const source = axios.CancelToken.source();
    const request = api({
        method: method,
        url: route,
        data: data || undefined,
        cancelToken: source.token,
        timeout: 10000 // 5 segundos
    });

    // Cancelar la petición si tarda más de 5 segundos
    const timeoutId = setTimeout(() => {
        source.cancel('La petición tardó demasiado');
        requestPending = false; // La solicitud ha terminado, permite hacer otra solicitud
        Interval(method, route, data);
    }, 10000);

    // Cuando la solicitud se completa (ya sea éxito o error)
    return request.then((response) => {
        clearTimeout(timeoutId);
        requestPending = false; // La solicitud ha terminado, permite hacer otra solicitud

        // Verificar el status de la respuesta
        if (response.status === 200) {
            // Devolver la respuesta solo si el status es 200
            return response;
        } else {
            // Si el status no es 200, puedes manejar el error aquí si es necesario
            console.error('Error en la solicitud:', response.status, response.data);
            throw new Error('Error en la solicitud'); // Lanzar un error o manejar de otra forma
        }
    }).catch(error => {
        // console.log(error);
        requestPending = false; // La solicitud ha terminado, permite hacer otra solicitud
        // Manejar el error aquí
        throw error; // Puedes lanzar el error nuevamente para que el código que llamó a esta función maneje el error
    });
};

// Create an object to hold API methods
const ApiController = {

    //workers
    addPersonal: (data: { avatar: File, name: string }) => api.post('/addPersonal', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }),
    deleteWorker: (id: string) => api.post(`/deleteWorker`, { id }),


    //Pagos
    addPayments: (data: PaymentsType) => api.post('/addPayments', data),
    sendMail: (data: { amount: string | number, barber: string }) => api.post('/sendMails', data),
    //cargar informacion de la base de datos
    getPayments: () => api.get(`/getPayments/${uuidv4()}`),
    getPersonal: () => api.get(`/getPersonal/${uuidv4()}`),
    getCustomers: () => api.get(`/getCustomers/${uuidv4()}`)

};


export default ApiController;
