import axios from "axios"

export default class HttpService {
    postData = (url, data) => {
        return axios.post(url, data);
    }
    getData = (url) => {
        return axios.get(url);
    }
}