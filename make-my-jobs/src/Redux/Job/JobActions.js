import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from "./JobTypes"
import Axios from "axios"

export const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

export const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

export const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        Axios.get('http://makemyjobs.me/corporate/getposts').then(response => {
            const users = response.data
            dispatch(fetchUsersSuccess(users))
        }).catch(error => {
            dispatch(fetchUsersFailure(error.message))
        });
    }
}