// 유저 정보만 담고 있는 유저 store
export const initialState = {
    isLoggedIn : false, // 로그인 여부
    logInErrorReason : '', // 로그인 에러 사유
    user : {},
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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
                user : action.data,
            }
        }
        case LOGIN_FAILURE : {
            return {
                ...state,
                isLoggedIn : false,
                user : {},
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