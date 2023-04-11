import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

//TODO: Configurar interceptores
// Nos permiten interceptar peticiones al backend, tanto las que van al servidor como las que regresan del servidor

calendarApi.interceptors.request.use( config => {
    // Modifico la cabecera de mi peticion para que incluya el token
    // Cualquier peticion que se haga va a tener este header
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
});

export default calendarApi;