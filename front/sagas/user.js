import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { SIGNUP_REQUEST, SIGNUP_FAILURE, SIGNUP_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAILURE } from '../reducers/user';

function signUpAPI(signUpData) {
    return axios.post('/user', signUpData);
}
function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        yield put({
            type : SIGNUP_SUCCESS,
            data : result.data,
        });
    } catch (e) {
        console.error('e',e.response);
        yield put({
            type : SIGNUP_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchSignUp() {
    yield takeLatest(SIGNUP_REQUEST, signUp);
}
//
function logInAPI(logInData) {
    return axios.post('/user/login', logInData, {
        withCredentials : true,
    });
}
function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({
            type : LOGIN_SUCCESS,
            data : result.data,
        });
    } catch (e) {
        console.error('e',e.response);
        yield put({
            type : LOGIN_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, logIn);
}
//
function logOutAPI() {
    return axios.post('/user/logout', {}, {
        withCredentials : true,
    });
}
function* logOut() {
    try {
        yield call(logOutAPI);
        yield put({
            type : LOGOUT_SUCCESS,
        });
    } catch (e) {
        console.error('e',e.response);
        yield put({
            type : LOGOUT_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchLogout() {
    yield takeLatest(LOGOUT_REQUEST, logOut);
}
function LoadUserAPI() {
    return axios.get('/user', {
        withCredentials : true,
    });
}
function* loadUser() {
    try {
        const result = yield call(LoadUserAPI);
        yield put({
            type : LOAD_USER_SUCCESS,
            data : result.data,
        });
    } catch (e) {
        yield put({
            type : LOAD_USER_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
//
function editUserAPI(editData) {
    return axios.patch(`/user/${editData.id}/edit`, {editData}, {
        withCredentials : true,
    });
}
function* editUser(action) {
    try {
        const result = yield call(editUserAPI, action.data);
        yield put({
            type : EDIT_USER_SUCCESS,
            data : {
                // id : action.data.id,
                nickname : result.data.nickname
            },
        });
        console.log(result)
    } catch (e) {
        yield put({
            type : EDIT_USER_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchEditUser() {
    yield takeLatest(EDIT_USER_REQUEST, editUser);
}
export default function* userSaga() {
    yield all([
        fork(watchSignUp),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchLoadUser),
        fork(watchEditUser),
    ])
}