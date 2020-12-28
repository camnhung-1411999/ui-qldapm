import axios from 'axios';
import { API } from '../../constants';
import { authHeader } from '../../helpers';


const createTransaction = (data)=> {
    return axios.post(API.TRANSACTION, data,{
        headers: authHeader(),
    });
}

const getTransaction = () => {
    return axios.get(API.TRANSACTION, {
        headers: authHeader(),
    })
}

const deleteTransaction = (id) => {
    return axios.delete(API.TRANSACTION +`/${id}`, {
        headers: authHeader(),
    })
}


export const transactionService = {
    createTransaction,
    getTransaction,
    deleteTransaction,
}