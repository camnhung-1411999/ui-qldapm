import axios from 'axios';
import { API } from '../../constants';
import { authHeader } from '../../helpers';


const uploadFile = (data)=> {
    return axios.post(API.FILE, data,{
        headers: authHeader(),
    });
}

const getFiles = () => {
    return axios.get(API.FILE, {
        headers: authHeader(),
    })
}

const deleteFile = (id) => {
    return axios.delete(API.FILE +`/${id}`, {
        headers: authHeader(),
    })
}


export const fileService = {
    uploadFile,
    getFiles,
    deleteFile,
}