// 포스트 정보만 담고 있는 포스트 store
export const initialState = {
    mainPosts : [],
    isAddingPost : false, // 포스트 업로드 중
    isAddingComment : false, // 댓글 업로드 중
    isLoadPost : false, // 개별 포스트 로드 중
    isLoadComments : false, // 개별 포스트 로드 중
    isLoadPosts : false, // 포스트들 로드 중
    postAdded : false, // 포스트 업로드 됨
    postEdited : false, // 포스트 수정 됨
    commentEdited : false, // 댓글 수정됨
    commentDeleted : false, // 댓글 삭제됨
    commentAdded : false, // 포스트 업로드 됨
    addPostErrorReason : false, // 포스트 업로드 실패 사유
    addCommentErrorReason : false, // 포스트 업로드 실패 사유
    loadPostsErrorReason : '', // 포스트들 로드 실패 사유
    loadPostErrorReason : '', // 포스트(개별) 로드 실패 사유
    editPostErrorReason : '', // 포스트 수정 실패 사유
    deletePostErrorReason : '', // 포스트 수정 실패 사유
    loadCommentsErrorReason : '', // 댓글들 로드 실패 사유
    singlePost : {
    },
    
    thumbImagePath : [], // 썸네일 이미지 미리보기 경로
    hasMorePost : false,
    hasMoreTagPost : false,
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
// 시리즈 포스트들 불러오기 액션
export const LOAD_SERIES_POSTS_REQUEST = 'LOAD_SERIES_POSTS_REQUEST';
export const LOAD_SERIES_POSTS_SUCCESS = 'LOAD_SERIES_POSTS_SUCCESS';
export const LOAD_SERIES_POSTS_FAILURE = 'LOAD_SERIES_POSTS_FAILURE';
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
// 댓글 업로드 액션
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
// 댓글 로드 액션
export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';
// 댓글 수정 액션
export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';
// 댓글 삭제 액션
export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

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
        case LOAD_POSTS_REQUEST : {
            return {
                ...state,
                mainPosts : action.lastId === 0 ? [] : state.mainPosts,
                hasMorePost : action.lastId ? state.hasMorePost : true,
                isLoadPosts: true,
                loadPostsErrorReason : '',
            }
        }
        case LOAD_POSTS_SUCCESS : {
            return {
                ...state,
                mainPosts : action.lastId === 0 ? action.data : state.mainPosts.concat(action.data),
                hasMorePost : action.data.length === 10,
                isLoadPosts: false,
                thumbImagePath : [],
            }
        }
        case LOAD_TAG_POSTS_REQUEST : {
            return {
                ...state,
                mainPosts : action.lastId === 0 ? [] : state.mainPosts,
                hasMoreTagPost : action.lastId ? state.hasMoreTagPost : true,
            }
        }
        case LOAD_TAG_POSTS_SUCCESS : {
            return {
                ...state,
                mainPosts : action.lastId === 0 ? action.data : state.mainPosts.concat(action.data),
                hasMoreTagPost : action.data.length === 10,
                thumbImagePath : [],
            }
        }
        //
        case LOAD_SERIES_POSTS_REQUEST : {
            return {
                ...state,
                //mainPosts : action.lastId === 0 ? [] : state.mainPosts,
                //hasMoreTagPost : action.lastId ? state.hasMoreTagPost : true,
            }
        }
        case LOAD_SERIES_POSTS_SUCCESS : {
            return {
                ...state,
                mainPosts : action.data,
                //mainPosts : action.lastId === 0 ? action.data : state.mainPosts.concat(action.data),
                //hasMoreTagPost : action.data.length === 10,
                //thumbImagePath : [],
            }
        }
        //
        case LOAD_SERIES_POSTS_FAILURE :
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
                isLoadPost: true,
            }
        }
        case LOAD_POST_SUCCESS : {
            return {
                ...state,
                singlePost : action.data,
                isLoadPost: false,
            }
        }
        case LOAD_POST_FAILURE : {
            return {
                ...state,
                loadPostErrorReason : action.error,
                isLoadPost: false,
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
        //
        case ADD_COMMENT_REQUEST : {
            return {
                ...state,
                isAddingComment: true,
                commentAdded: false,
            }
        }
        case ADD_COMMENT_SUCCESS : {
            //const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            //const post = state.mainPosts[postIndex];
            const singlePost = state.singlePost;
            const Comments = [action.data.comment, ...singlePost.Comments];
            //const mainPosts = [...state.mainPosts];
            //mainPosts[postIndex] = {...post, Comments};
            singlePost.Comments = Comments;            
            return {
                ...state,
                //mainPosts,
                singlePost,
                isAddingComment: false,
                commentAdded: true,
            }
        }
        case ADD_COMMENT_FAILURE : {
            return {
                ...state,
                addCommentErrorReason : action.error,
            }
        }
        //
        case LOAD_COMMENTS_REQUEST : {
            return {
                ...state,
                isLoadComments:false,
            }
        }
        case LOAD_COMMENTS_SUCCESS : {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            return {
                ...state,
                isLoadComments:true,
            }
        }
        case LOAD_COMMENTS_FAILURE : {
            return {
                ...state,
                loadCommentsErrorReason : action.error,
            }
        }
        //
        case EDIT_COMMENT_REQUEST : {
            return {
                ...state,
                commentEdited:false,
            }
        }
        case EDIT_COMMENT_SUCCESS : {
            //const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            //const post = state.mainPosts[postIndex];
            const singlePost = state.singlePost;
            const commentIndex = singlePost.Comments.findIndex( v => v.id === action.data.id);
            const comment = singlePost.Comments[commentIndex];
            comment.content = action.data.content;
            console.log(comment)
            return {
                ...state,
                commentEdited:true,
            }
        }
        case EDIT_COMMENT_FAILURE : {
            return {
                ...state,
                //loadCommentsErrorReason : action.error,
            }
        }
        //
        case DELETE_COMMENT_REQUEST : {
            return {
                ...state,
                commentDeleted:false,
            }
        }
        case DELETE_COMMENT_SUCCESS : {
            const singlePost = state.singlePost;
            const index = singlePost.Comments.findIndex((v) => v.id === action.data);
            singlePost.Comments.splice(index, 1);
            //console.log(action.data)
            //console.log(index)
            return {
                ...state,
                singlePost,
                commentDeleted:true,
            }
        }
        case DELETE_COMMENT_FAILURE : {
            return {
                ...state,
                //loadCommentsErrorReason : action.error,
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