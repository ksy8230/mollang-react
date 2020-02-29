import { all, fork, put, takeLatest, call, throttle } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_REQUEST, ADD_POST_FAILURE, ADD_POST_SUCCESS, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, LOAD_TAG_POSTS_REQUEST, LOAD_TAG_POSTS_SUCCESS, LOAD_TAG_POSTS_FAILURE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE, EDIT_POST_REQUEST, EDIT_POST_FAILURE, EDIT_POST_SUCCESS, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE, UPLOAD_THUMB_IMAGE_REQUEST, UPLOAD_THUMB_IMAGE_SUCCESS, UPLOAD_THUMB_IMAGE_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_FAILURE, ADD_COMMENT_SUCCESS, LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE, EDIT_COMMENT_REQUEST, EDIT_COMMENT_SUCCESS, EDIT_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE, LOAD_SERIES_POSTS_REQUEST, LOAD_SERIES_POSTS_SUCCESS, LOAD_SERIES_POSTS_FAILURE } from '../reducers/post';

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
function loadPostsAPI(lastId = action.lastId, limit = action.limit) {
    return axios.get(`/posts?lastId=${lastId}&limit=${limit}`); // server:GET /api/posts
}
function* loadPosts(action) {
    try {
        const result = yield call(loadPostsAPI, action.lastId, action.limit);
        yield put({
            type : LOAD_POSTS_SUCCESS,
            data : result.data,
        })
    } catch(e) {
        console.error(e);
        yield put({
            type : LOAD_POSTS_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchloadPosts() {
    yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
}
function loadTagPostsAPI(tag, lastId = action.lastId, limit = action.limit) {
    return axios.get(`/tag/${encodeURIComponent(tag)}?lastId=${lastId}&limit=${limit}`); // server:GET /api/tag/:tag
}
function* loadTagPosts(action) {
    try {
        const result = yield call(loadTagPostsAPI, action.data, action.lastId, action.limit);
        yield put({
            type : LOAD_TAG_POSTS_SUCCESS,
            data : result.data,
        })
    } catch(e) {
        console.log(e)
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
function loadSeriesPostsAPI(series) {
    return axios.get(`/series/${encodeURIComponent(series)}`); // server:GET /api/series/:series
}
function* loadSeriesPosts(action) {
    try {
        const result = yield call(loadSeriesPostsAPI, action.data);
        yield put({
            type : LOAD_SERIES_POSTS_SUCCESS,
            data : result.data,
        })
    } catch(e) {
        console.error(e)
        yield put({
            type : LOAD_SERIES_POSTS_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchloadSeriesPosts() {
    yield takeLatest(LOAD_SERIES_POSTS_REQUEST, loadSeriesPosts);
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
//
function editPostAPI(data) {
    return axios.patch(`/post/${data.PostId}/edit`, data, { // server:POST /api/post/:id/edit
        withCredentials : true,
    });
}
function* editPost(action) {
    try {
        const result = yield call(editPostAPI, action.data);
        yield put({
            type : EDIT_POST_SUCCESS,
            data : {
                PostId : action.data.PostId,
                content : result.data.content,
                title : result.data.title,
                tag : result.data.tag,
            }
        })
    } catch(e) {
        yield put({
            type : EDIT_POST_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchEditPost() {
    yield takeLatest(EDIT_POST_REQUEST, editPost);
}
function deletePostAPI(data) {
    return axios.delete(`/post/${data}/delete`, { // server:DELETE /api/post/:id/delete
        withCredentials : true,
    });
}
function* deletePost(action) {
    try {
        const result = yield call(deletePostAPI, action.data);
        console.log('result',result)
        yield put({
            type : DELETE_POST_SUCCESS,
            data :  result.data,
        })
    } catch(e) {
        yield put({
            type : DELETE_POST_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchDeletePost() {
    yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function uploadThumbImageAPI(formData) {
    console.log('formData', formData)
    return axios.post('/post/thumbimage', formData, { // server:POST /api/post/thumbimage
        withCredentials : true,
    });
}
function* uploadThumbImage(action) {
    try {
        const result = yield call(uploadThumbImageAPI, action.data);
        console.log('result', result)
        yield put({
            type : UPLOAD_THUMB_IMAGE_SUCCESS,
            data : result.data, // 서버로 저장된 이미지 주소를 서버로부터 받을 예정
        })
    } catch(e) {
        console.log(e)
        yield put({
            type : UPLOAD_THUMB_IMAGE_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchUploadThumbImage() {
    yield takeLatest(UPLOAD_THUMB_IMAGE_REQUEST, uploadThumbImage);
}
//
function AddCommentAPI(data) {
    //console.log('data', data)
    return axios.post(`/post/detail/${data.postId}/comment`, {content: data.content}, { // server:POST /api/post/detail/:id/comment
        withCredentials : true,
    });
}
function* addComment(action) {
    try {
        const result = yield call(AddCommentAPI, action.data);
        //console.log('result', result)
        yield put({
            type : ADD_COMMENT_SUCCESS,
            data : {
                postId : action.data.postId,
                comment : result.data,
            }
        })
    } catch(e) {
        console.error(e)
        yield put({
            type : ADD_COMMENT_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
//
function loadCommentsAPI(data) {
    //console.log('data', data)
    return axios.get(`/post/detail/${data}/comments`);
}
function* loadComments(action) {
    try {
        const result = yield call(loadCommentsAPI, action.data);
        //console.log('loadComments result', result)
        yield put({
            type : LOAD_COMMENTS_SUCCESS,
            data : {
                postId : action.data.postId,
                comments : result.data,
            }
        })
    } catch(e) {
        console.error(e)
        yield put({
            type : LOAD_COMMENTS_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchLoadComments() {
    yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}
//
function editCommentAPI(data) {
    //console.log('data', data)
    return axios.patch(`/post/detail/${data.postId}/comments/${data.id}/edit`, data, {
        withCredentials : true,
    });
}
function* editComment(action) {
    try {
        const result = yield call(editCommentAPI, action.data);
        //console.log('edit',result)
        yield put({
            type : EDIT_COMMENT_SUCCESS,
            data : {
                id : action.data.id,
                content : result.data.content,
            }
        })
    } catch(e) {
        console.error(e)
        yield put({
            type : EDIT_COMMENT_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchEditComment() {
    yield takeLatest(EDIT_COMMENT_REQUEST, editComment);
}
//
function deleteCommentAPI(data) {
    //console.log('data', data)
    return axios.delete(`/post/detail/${data.postId}/comments/${data.id}/delete`, {
        withCredentials : true,
    });
}
function* deleteComment(action) {
    try {
        const result = yield call(deleteCommentAPI, action.data);
        //console.log('edit',result)
        yield put({
            type : DELETE_COMMENT_SUCCESS,
            data : result.data,
        })
    } catch(e) {
        console.error(e)
        yield put({
            type : DELETE_COMMENT_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchDeleteComment() {
    yield takeLatest(DELETE_COMMENT_REQUEST, deleteComment);
}
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchloadPosts),
        fork(watchloadTagPosts),
        fork(watchloadSeriesPosts),
        fork(watchloadPost),
        fork(watchEditPost),
        fork(watchDeletePost),
        fork(watchUploadThumbImage),
        fork(watchAddComment),
        fork(watchLoadComments),
        fork(watchEditComment),
        fork(watchDeleteComment),
    ])
}