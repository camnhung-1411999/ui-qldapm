import { transactionConstant } from '../../constants';
import { transactionService } from '../../api';
import { alertActions } from 'src/redux/actions';

export const transactionAction = {
    listReceived,
    deleteTransaction,
};

function listReceived() {
    return dispatch => {
        transactionService.getTransaction()
            .then(
                transactions => {
                    dispatch(success(transactions?.data));
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success(transactions) { return { type: transactionConstant.GETALL_SUCCESS, transactions } }
}

function deleteTransaction(_id) {
    return dispatch => {
        dispatch(request(_id));

        transactionService.deleteTransaction(_id)
            .then(
                transaction => { 
                    dispatch(success(transaction));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: transactionConstant.DELETE_REQUEST, id } }
    function success(transaction) { return { type: transactionConstant.DELETE_SUCCESS, transaction } }
    function failure(error) { return { type: transactionConstant.DELETE_FAILURE, error } }
}