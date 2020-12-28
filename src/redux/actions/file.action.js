import { fileConstant } from '../../constants';
import { fileService } from '../../api';
import { alertActions } from 'src/redux/actions';

export const fileAction = {
    upload,
    getListFile,
    deleteFile
};

function upload(data) {
    return dispatch => {
        fileService.uploadFile(data)
            .then(
                file => { 
                    dispatch(success(file?.data));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function success(file) { return { type: fileConstant.UPLOAD_SUCCESS, file } }
    function failure(error) { return { type: fileConstant.UPLOAD_FAILURE, error } }
}

function getListFile() {
    return dispatch => {
        fileService.getFiles()
            .then(
                files => {
                    console.log(files?.data)
                    dispatch(success(files?.data));
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success(files) { return { type: fileConstant.GETALL_SUCCESS, files } }
}

function deleteFile(_id) {
    return dispatch => {
        dispatch(request(_id));

        fileService.deleteFile(_id)
            .then(
                file => { 
                    dispatch(success(file));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: fileConstant.UPLOAD_REQUEST, id } }
    function success(file) { return { type: fileConstant.UPLOAD_SUCCESS, file } }
    function failure(error) { return { type: fileConstant.UPLOAD_FAILURE, error } }
}