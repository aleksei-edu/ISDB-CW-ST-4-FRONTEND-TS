import axios from "axios";
import { serverHost } from "./confiig";

const axiosClient = axios.create({
    baseURL: serverHost,
    headers: {
        "Access-Control-Allow-Origin": serverHost + "*",
    },
});

export default axiosClient;