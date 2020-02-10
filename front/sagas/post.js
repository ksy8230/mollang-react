import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_REQUEST, ADD_POST_FAILURE, ADD_POST_SUCCESS, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, LOAD_TAG_POSTS_REQUEST, LOAD_TAG_POSTS_SUCCESS, LOAD_TAG_POSTS_FAILURE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE } from '../reducers/post';

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
//
function loadTagPostsAPI(tagData) {
    return axios.get(`/tag/${tagData}`); // server:GET /api/tag/:tag
}
function* loadTagPosts(action) {
    try {
        const result = yield call(loadTagPostsAPI, action.data);
        yield put({
            type : LOAD_TAG_POSTS_SUCCESS,
            data : result.data,
        })
    } catch(e) {
        yield put({
            type : LOAD_TAG_POSTS_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchloadTagPosts() {
    yield takeLatest(LOAD_TAG_POSTS_REQUEST, loadTagPosts);
}
//
function loadPostAPI(postId) {
    return axios.get(`/post/${postId}`); // server:GET /api/post/:id
}
function* loadPost(action) {
    try {
        const result = yield call(loadPostAPI, action.data);
        yield put({
            type : LOAD_POST_SUCCESS,
            data : result.data,
        })
    } catch(e) {
        yield put({
            type : LOAD_POST_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchloadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchloadPosts),
        fork(watchloadTagPosts),
        fork(watchloadPost),
    ])
}