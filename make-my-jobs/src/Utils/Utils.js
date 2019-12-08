import cookie from 'react-cookies';
import { UserCookieInfoModel } from './Models';
import Swal from 'sweetalert2'


export class Utils {
    siteName = '<span class="red-text">M</span>ake<span class="red-text">M</span>yJobs';
    isLoggedIn = () => {
        if (cookie.load('loggedUser') != null) {
            return true;
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
        var userDataFromCookie = cookie.load('loggedUser').split("random");
        var userData = new UserCookieInfoModel();
        userData.userId = userDataFromCookie[0];
        userData.email = userDataFromCookie[1];
        userData.firstName = userDataFromCookie[2];
        userData.lastName = userDataFromCookie[3];
        userData.userType = userDataFromCookie[4];
        return userData;
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
}

export default Utils