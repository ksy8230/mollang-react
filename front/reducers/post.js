// 포스트 정보만 담고 있는 포스트 store
export const initialState = {
    mainPosts : [
        {
            id : 1,
            title : '더미 데이터',
            tag : null,
            content : '지금 이 포스트는 더미 내용입니다. 지금 이 포스트는 더미 내용입니다. 지금 이 포스트는 더미 내용입니다.',
            date : '2020.02.06',
            User : {
                id : 1,
                nickname : 'mollang'
            },
            thumbImg : 'https://us.123rf.com/450wm/lcc54613/lcc546131011/lcc54613101100003/8159003-%EB%8B%AC%EC%BD%A4%ED%95%9C-%ED%91%B8%EB%94%A9-%EA%B3%84%EB%9E%80-%ED%91%B8%EB%94%A9.jpg?ver=6',
        },
    ], // 포스트들
    isAddingPost : false, // 포스트 업로드 중
    postAdded : false, // 포스트 업로드 됨
    addPostErrorReason : false, // 포스트 업로드 실패 사유
    loadPostsErrorReason : '',
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
                mainPosts : [],
                loadPostsErrorReason : '',
            }
        }
        case LOAD_POSTS_SUCCESS : {
            return {
                ...state,
                mainPosts : action.data,
            }
        }
        case LOAD_POSTS_FAILURE : {
            return {
                ...state,
                loadPostsErrorReason : action.error,
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