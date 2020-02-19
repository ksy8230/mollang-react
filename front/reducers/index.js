import { combineReducers } from 'redux';
import user from './user';
import post from './post';
import calendar from './calendar';
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    user, post, form: formReducer, calendar,
});

export default rootReducer;