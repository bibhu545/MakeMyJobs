import axios from "axios"

export default class HttpService {
    async postData(url, data) {
        var result = await axios.post(url, data);
        return result;
    }
    getData = (url) => {
        return axios.get(url);
    }
}