import axios from "axios"
// import Utils from "./Utils";

export default class HttpService {
    async postData(url, data) {
        // var header = {'userId': new Utils().getUserInfoFromCookies().userId}
        var result = await axios.post(url, data);
        return result;
    }
    getData = (url) => {
        return axios.get(url);
    }
}