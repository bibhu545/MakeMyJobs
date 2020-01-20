import cookie from 'react-cookies';
import { UserCookieInfoModel } from './Models';
import Swal from 'sweetalert2'

export const BaseUrl = "http://makemyjobs.me";
export const API_ENDPOINTS = {
    BaseApiUrl: BaseUrl,
    GetCommonDataForNewPost: BaseUrl + "/Common/GetCommonDataForNewPost",
    GetCorporateInfo: BaseUrl + '/Corporate/GetCorporateInfo',

    GetJobInfo: BaseUrl + "/Corporate/GetJobInfo",
    UpdateJob: BaseUrl + "/Corporate/UpdateJob",
    
    GetInternships: BaseUrl + '/Corporate/GetInternships',
    GetInternshipInfo: BaseUrl + '/Corporate/GetInternshipInfo',
    UpdateInternship: BaseUrl + '/Corporate/UpdateInternship',

    ApplyPost: BaseUrl + '/Corporate/ApplyPost',
    CreatePost: BaseUrl + "/Corporate/CreatePost",
    DeletePost: BaseUrl + "/Corporate/DeletePost",

    GetApplications: BaseUrl +  'http://makemyjobs.me/Corporate/GetApplications',
};

export const PostType = {
    Job: 1,
    Internship: 2
}

export class Utils {
    siteName = '<span class="red-text">M</span>ake<span class="red-text">M</span>yJobs';
    isLoggedIn = () => {
        if (cookie.load('loggedUser') != null) {
            return true;
        }
        return false;
    }

    isCorporate = () => {
        if (cookie.load('loggedUser') != null) {
            if (this.getUserTypeFromCookies() === 3) {
                return true;
            }
        }
        return false;
    }

    saveLoginDataInCookies = (userData) => {
        // cookie.save('loggedUser', userData.email);
        var dataToSave = userData.userId + "random" + userData.email + "random" + userData.firstName + "random" + userData.lastName + "random" + userData.userType;
        cookie.save(
            'loggedUser',
            dataToSave,
            {
                path: '/',
                maxAge: 60 * 60 * 24 * 14
            }
        )
    }

    getUserInfoFromCookies = () => {
        if (cookie.load('loggedUser') === undefined) {
            return new UserCookieInfoModel();
        }
        else {
            var userDataFromCookie = cookie.load('loggedUser').split("random");
            var userData = new UserCookieInfoModel();
            userData.userId = userDataFromCookie[0];
            userData.email = userDataFromCookie[1];
            userData.firstName = userDataFromCookie[2];
            userData.lastName = userDataFromCookie[3];
            userData.userType = userDataFromCookie[4];
            return userData;
        }
    }

    getUserTypeFromCookies = () => {
        var loggedUser = cookie.load('loggedUser');
        if (!(loggedUser === undefined)) {
            return loggedUser.split("random")[4];
        }
        else {
            return 0;
        }
    }

    clearLoginDataFromCookies = () => {
        cookie.remove('loggedUser');
    }

    GetDateFromServer = (dateString) => {
        var extractedDate = dateString.substring(6, dateString.length - 2);
        return new Date(parseInt(extractedDate)).toLocaleDateString();
    }

    formatDateToBind = (dateString) => {
        var date = this.GetDateFromServer(dateString);
        var constraints = date.split('/');
        if (constraints[0].length === 1) {
            constraints[0] = '0' + constraints[0];
        }
        if (constraints[1].length === 1) {
            constraints[1] = '0' + constraints[1];
        }
        return constraints[2] + "-" + constraints[0] + "-" + constraints[1];
    }

    getQueryStringValue = (query) => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        return params.get(query)
    }

    showDefaultMessage = (message) => {
        Swal.fire({
            title: message,
            showClass: {
                popup: 'animated fadeInDown faster'
            },
            hideClass: {
                popup: 'animated fadeOutUp faster'
            }
        })
    }

    showErrorMessage = (message) => {
        Swal.fire({
            icon: 'error',
            title: message,
            showClass: {
                popup: 'animated fadeInDown faster'
            },
            hideClass: {
                popup: 'animated fadeOutUp faster'
            }
        })
    }

    showInlineDefaultMessage = (message) => {
        Swal.fire(
            'Deleted!',
            message,
            'success'
        )
    }

    showInlineErrorMessage = (message, error = null) => {
        Swal.fire(
            'Error!',
            message + error,
            'error'
        )
    }
    getInstituteTypeName = (id) => {
        var typeName = "Institute name";
        switch (id) {
            case 1:
                typeName = "School";
                break;
            case 2:
                typeName = "College";
                break;
            case 3:
                typeName = "Post Graduate";
                break;
            default:
                break;
        }
        return typeName;
    }

    validateResume = (name) => {
        var supportedList = ["pdf", "doc", "docx"];
        return supportedList.indexOf(name.split(".")[name.split(".").length - 1]) >= 0;
    }

    getResume = (e, studentId, employeeId) => {
        e.preventDefault();
        window.open('http://makemyjobs.me/Corporate/ViewResume?studentId=' + studentId + "&employeeId=" + employeeId);
    }
}

export default Utils