import axios from "axios";

const apiClient = axios.create({
    baseURL : import.meta.env.VITE_APP_BASE_URL_POKEMON,
    headers : {
        Accept : "application/json",
        "Content-Type" : "application/json"
    }
});
export default {
    getData(endpoint){
        return apiClient.get(endpoint);
    }
}