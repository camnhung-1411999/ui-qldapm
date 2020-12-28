import { transactionConstant } from '../../constants';

export function transactions(state = {}, action) {
  switch (action.type) {
 

    case transactionConstant.GETALL_REQUEST:
      return {
        loading: true
      };
    case transactionConstant.GETALL_SUCCESS:
      return {
        items: action.transactions
      };
    case transactionConstant.GETALL_FAILURE:
      return {
        error: action.error
      };


    case transactionConstant.DELETE_REQUEST:
      return {
        loading: true,
      };
    case transactionConstant.DELETE_SUCCESS:
      return {
        item: action.transaction
      };
    case transactionConstant.DELETE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}