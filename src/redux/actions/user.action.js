import { userConstants } from 'src/constants';
import { userService } from 'src/api';
import { history } from '../../helpers';
import { alertActions } from 'src/redux/actions';

export const userActions = {
    login,
    logout,
    register,
    updateUser,
    changePassword
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        dispatch(success({user: username, password: password}));
                    history.push('/app');
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
}

function logout() {
    userService.logout();
    history.push('/')
    return { type: userConstants.LOGOUT };
}

function register(iuser) {
    return dispatch => {
        dispatch(request(iuser));

        userService.register(iuser)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    console.log(error.response.status);
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function changePassword(iuser) {
    return dispatch => {
        dispatch(request({ iuser }));

        userService.changePassword(iuser)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.CHANGEPASS_REQUEST, user } }
    function success(user) { return { type: userConstants.CHANGEPASS_SUCCESS, user } }
    function failure(error) { return { type: userConstants.CHANGEPASS_FAILURE, error } }
}

function updateUser(data) {
    return dispatch => {
        dispatch(request({ data }));

        userService.update(data)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}