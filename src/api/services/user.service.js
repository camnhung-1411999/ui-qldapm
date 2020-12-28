import { authHeader } from 'src/helpers';
import { API } from '../../constants'
import axios from 'axios';
import {history} from '../../helpers/history';

export const userService = {
    login,
    logout,
    register,
    getAll,
    me,
    replyMail,
    update,
    handleResponse
};

function login(email, password) {
    return axios.post(API.USERS + '/login', { email, password })
        .then(user => {
            localStorage.setItem('accessToken', JSON.stringify(user.data.accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(user.data.refreshToken));
            history.push('/');
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
}

function getAll() {
    return axios.get(API.USERS +'/list', {
        headers: authHeader()
    })
}

function me() {
    return axios.get(API.USERS, {
        headers: authHeader()
    });
}

function register(user) {
    return axios.post(API.USERS, {
        email: user.email,
        name: user.firstName + ' ' + user.lastName,
        password: user.password,
        company: user?.company,
        address: user?.address,
        phone: user?.phone
    })
}

function update(data) {
    return axios.put(API.USERS, data, {
        headers: authHeader(),
    });
}

function replyMail(data){ 
    return axios.post(API.USERS + '/mail',data, {
        headers: authHeader(),
    })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}