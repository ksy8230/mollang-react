// 포스트 정보만 담고 있는 포스트 store
export const initialState = {
    mainPosts : [
        // {
        //     id : 1,
        //     title : '더미 데이터',
        //     tag : null,
        //     content : '지금 이 포스트는 더미 내용입니다. 지금 이 포스트는 더미 내용입니다. 지금 이 포스트는 더미 내용입니다.',
        //     date : '2020.02.06',
        //     User : {
        //         id : 1,
        //         nickname : 'mollang'
        //     },
        //     thumbImg : 'https://us.123rf.com/450wm/lcc54613/lcc546131011/lcc54613101100003/8159003-%EB%8B%AC%EC%BD%A4%ED%95%9C-%ED%91%B8%EB%94%A9-%EA%B3%84%EB%9E%80-%ED%91%B8%EB%94%A9.jpg?ver=6',
        // },
    ], // 포스트들
    isAddingPost : false, // 포스트 업로드 중
    postAdded : false, // 포스트 업로드 됨
    postEdited : false, // 포스트 업데이트 됨
    addPostErrorReason : false, // 포스트 업로드 실패 사유
    loadPostsErrorReason : '', // 포스트들 로드 실패 사유
    loadPostErrorReason : '', // 포스트(개별) 로드 실패 사유
    editPostErrorReason : '', // 포스트 수정 실패 사유
    deletePostErrorReason : '', // 포스트 수정 실패 사유
    singlePost : { },
    thumbImagePath : [], // 썸네일 이미지 미리보기 경로
    hasMorePost : false,
};

const dummyPost = {
    content : '지금 이 포스트는 방금 추가한 더미 내용입니다. ',
    date : '2020.02.07',
    User : {
        id : 1,
        nickname : 'mollang'
    },
    thumbImg : 'https://us.123rf.com/450wm/lcc54613/lcc546131011/lcc54613101100003/8159003-%EB%8B%AC%EC%BD%A4%ED%95%9C-%ED%91%B8%EB%94%A9-%EA%B3%84%EB%9E%80-%ED%91%B8%EB%94%A9.jpg?ver=6',
};
// 포스트 업로드 액션
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
// 포스트들 불러오기 액션
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';
// 태그 포스트들 불러오기 액션
export const LOAD_TAG_POSTS_REQUEST = 'LOAD_TAG_POSTS_REQUEST';
export const LOAD_TAG_POSTS_SUCCESS = 'LOAD_TAG_POSTS_SUCCESS';
export const LOAD_TAG_POSTS_FAILURE = 'LOAD_TAG_POSTS_FAILURE';
// 포스트(개별) 불러오기 액션
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';
// 포스트 수정 액션
export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';
// 포스트 삭제 액션
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';
// 썸네일 이미지 업로드 액션
export const UPLOAD_THUMB_IMAGE_REQUEST = 'UPLOAD_THUMB_IMAGE_REQUEST';
export const UPLOAD_THUMB_IMAGE_SUCCESS = 'UPLOAD_THUMB_IMAGE_SUCCESS';
export const UPLOAD_THUMB_IMAGE_FAILURE = 'UPLOAD_THUMB_IMAGE_FAILURE';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST : {
            return {
                ...state,
                isAddingPost : true,
                postAdded : false,
                addPostErrorReason : '',
            }
        }
        case ADD_POST_SUCCESS : {
            console.log('server action.data', action.data)
            return {
                ...state,
                isAddingPost : false,
                postAdded : true,
                mainPosts : [action.data, ...state.mainPosts],
                thumbImagePath : [],
            }
        }
        case ADD_POST_FAILURE : {
            return {
                ...state,
                isAddingPost : false,
                postAdded : false,
                addPostErrorReason : action.error,
            }
        }
        case LOAD_TAG_POSTS_REQUEST :
        case LOAD_POSTS_REQUEST : {
            return {
                ...state,
                mainPosts : action.lastId === 0 ? [] : state.mainPosts,
                hasMorePost : action.lastId ? state.hasMorePost : true,
                loadPostsErrorReason : '',
            }
        }
        case LOAD_TAG_POSTS_SUCCESS :
        case LOAD_POSTS_SUCCESS : {
            return {
                ...state,
                mainPosts : state.mainPosts.concat(action.data),
                hasMorePost : action.data.length === 10,
                thumbImagePath : [],
            }
        }
        case LOAD_TAG_POSTS_FAILURE :
        case LOAD_POSTS_FAILURE : {
            return {
                ...state,
                loadPostsErrorReason : action.error,
            }
        }
        case LOAD_POST_REQUEST : {
            return {
                ...state,
                singlePost : {},
                loadPostErrorReason : '',
            }
        }
        case LOAD_POST_SUCCESS : {
            return {
                ...state,
                singlePost : action.data,
            }
        }
        case LOAD_POST_FAILURE : {
            return {
                ...state,
                loadPostErrorReason : action.error
            }
        }
        //
        case EDIT_POST_REQUEST : {
            return {
                ...state,
                editPostErrorReason : '',
                postEdited : false,
            }
        }
        case EDIT_POST_SUCCESS : {
            const postIndex = state.mainPosts.findIndex( v => v.id === action.data.PostId);
            const post = state.mainPosts[postIndex];
            const singlePost = state.singlePost;
            post.content = action.data.content;
            post.title = action.data.title;
            post.tag = action.data.tag;
            singlePost.content = action.data.content;
            singlePost.title = action.data.title;
            singlePost.tag = action.data.tag;
            return {
                ...state,
                postEdited : true,
            }
        }
        case EDIT_POST_FAILURE : {
            return {
                ...state,
                editPostErrorReason : action.error,
            }
        }
        case DELETE_POST_REQUEST : {
            return {
                ...state,
                deletePostErrorReason : '',
            }
        }
        case DELETE_POST_SUCCESS : {
            return {
                ...state,
                mainPosts : state.mainPosts.filter( v => v.id !== action.data ),
            }
        }
        case DELETE_POST_FAILURE : {
            return {
                ...state,
                deletePostErrorReason : action.error,
            }
        }
        //
        case UPLOAD_THUMB_IMAGE_REQUEST : {
            return {
                ...state,
            }
        }
        case UPLOAD_THUMB_IMAGE_SUCCESS : {
            return {
                ...state,
                thumbImagePath : action.data
            }
        }
        case UPLOAD_THUMB_IMAGE_FAILURE : {
            return {
                ...state,
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
};

export default reducer;