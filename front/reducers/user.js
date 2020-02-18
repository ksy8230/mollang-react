// 유저 정보만 담고 있는 유저 store
export const initialState = {
    isLoggedIn : false, // 로그인 여부
    logInErrorReason : '', // 로그인 에러 사유
    isSignedUp : false, // 회원가입 여부
    signUpErrorReason : '', // 회원가입 실패 사유
    isLoggedOut : false, // 로그아웃 여부
    loadUserErrorReason : '', // 회원가입 실패 사유
    editUserErrorReason : '', // 회원가입 실패 사유
    me : null, // 내 정보
    user : {},
};
// 로그인 액션
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
// 회원가입 액션
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
// 로그아웃 액션
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
// 사용자 불러오기 액션
export const LOAD_USER_REQUEST =  'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS =  'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE =  'LOAD_USER_FAILURE';
// 사용자 정보 수정 액션
export const EDIT_USER_REQUEST =  'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS =  'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE =  'EDIT_USER_FAILURE';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST : {
            return {
                ...state,
                isLoggedIn : false,
                logInErrorReason : '',
            }
        }
        case LOGIN_SUCCESS : {
            return {
                ...state,
                isLoggedIn : true,
                me : action.data,
            }
        }
        case LOGIN_FAILURE : {
            return {
                ...state,
                isLoggedIn : false,
                logInErrorReason : action.error,
            }
        }

        case SIGNUP_REQUEST : {
            return {
                ...state,
                isSignedUp : false,
                signUpErrorReason : '',
            }
        }
        case SIGNUP_SUCCESS : {
            return {
                ...state,
                isSignedUp : true,
                me : action.data,
            }
        }
        case SIGNUP_FAILURE : {
            return {
                ...state,
                isSignedUp : false,
                signUpErrorReason : action.error,
            }
        }

        case LOGOUT_REQUEST : {
            return {
                ...state,
                isLoggedOut : false,
            }
        }
        case LOGOUT_SUCCESS : {
            return {
                ...state,
                isLoggedOut : true,
                me : null,
            }
        }

        case LOAD_USER_REQUEST : {
            return {
                ...state,
                loadUserErrorReason : '',
            }
        }
        case LOAD_USER_SUCCESS : {
            return {
                ...state,
                me : action.data,
            }
        }
        case LOAD_USER_FAILURE : {
            return {
                ...state,
                loadUserErrorReason : action.error,
            }
        }

        case EDIT_USER_REQUEST : {
            return {
                ...state,
                editUserErrorReason : '',
            }
        }
        case EDIT_USER_SUCCESS : {
            return {
                ...state,
                me : {
                    ...state.me,
                    // id : action.data.id,
                    nickname : action.data.nickname
                }
            }
        }
        case EDIT_USER_FAILURE : {
            return {
                ...state,
                editUserErrorReason : action.error,
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