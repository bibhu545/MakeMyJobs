import axios from "axios"

export default class HttpService {
    async postData(url, data) {
        this.showLoader();
        var result = await axios.post(url, data);
        this.hideLoader();
        return result;
    }
    async getData(url) {
        this.showLoader();
        var result = await axios.get(url);
        this.hideLoader();
        return result;
    }

    showLoader() {
        document.getElementById('apiProgress').style.display = "block";
    }
    hideLoader() {
        document.getElementById('apiProgress').style.display = "none";
    }
}