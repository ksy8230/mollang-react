import { all, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_REQUEST, ADD_POST_FAILURE, ADD_POST_SUCCESS } from '../reducers/post';

function addPostAPI(postData) {
    // server : post api
}

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield put({
            type : ADD_POST_SUCCESS,
            data : action.data,
        })
        console.log(action.data)
    } catch(error) {
        yield put({
            type : ADD_POST_FAILURE,
            error : error,
        })
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
    ])
}