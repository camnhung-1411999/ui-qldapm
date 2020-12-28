import { fileConstant } from '../../constants';

export function files(state = {}, action) {
  switch (action.type) {
    case fileConstant.UPLOAD_REQUEST:
      return {
        loading: true,
      };
    case fileConstant.UPLOAD_SUCCESS:
      return {
          item: action.file,
      };
    case fileConstant.UPLOAD_FAILURE:
      return {
          error: action.error
      };



    case fileConstant.GETALL_REQUEST:
      return {
        loading: true
      };
    case fileConstant.GETALL_SUCCESS:
      return {
        items: action.files
      };
    case fileConstant.GETALL_FAILURE:
      return {
        error: action.error
      };


    case fileConstant.DELETE_REQUEST:
      return {
        loading: true,
      };
    case fileConstant.DELETE_SUCCESS:
      return {
        item: action.file
      };
    case fileConstant.DELETE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}