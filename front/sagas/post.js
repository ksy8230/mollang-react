import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_REQUEST, ADD_POST_FAILURE, ADD_POST_SUCCESS, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE } from '../reducers/post';

function addPostAPI(postData) {
    return axios.post('/post', postData, { // server:POST /api/post
        withCredentials : true,
    });
}
function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type : ADD_POST_SUCCESS,
            data : result.data,
        })
        //console.log(action.data)
    } catch(e) {
        yield put({
            type : ADD_POST_FAILURE,
            error : e,
        })
    }
}
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
//
function loadPostsAPI() {
    return axios.get('/posts'); // server:GET /api/posts
}
function* loadPosts() {
    try {
        const result = yield call(loadPostsAPI);
        yield put({
            type : LOAD_POSTS_SUCCESS,
            data : result.data,
        })
        //console.log(action.data)
    } catch(e) {
        yield put({
            type : LOAD_POSTS_FAILURE,
            error : e,
        })
    }
}
function* watchloadPosts() {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchloadPosts),
    ])
}