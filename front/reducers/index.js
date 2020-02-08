import { combineReducers } from 'redux';
import user from './user';
import post from './post';
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    user, post, form: formReducer
});

export default rootReducer;