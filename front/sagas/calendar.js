import { all, fork, put, takeLatest, call, throttle } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_SCHEDULES_REQUEST, LOAD_SCHEDULES_SUCCESS, LOAD_SCHEDULES_FAILURE, ADD_SCHEDULE_REQUEST, ADD_SCHEDULE_SUCCESS, ADD_SCHEDULE_FAILURE, EDIT_SCHEDULE_REQUEST, EDIT_SCHEDULE_SUCCESS, EDIT_SCHEDULE_FAILURE, DELETE_SCHEDULE_REQUEST, DELETE_SCHEDULE_SUCCESS, DELETE_SCHEDULE_FAILURE } from '../reducers/calendar';

function loadSchedulesAPI() {
    return axios.get('/calendars'); // server:GET /api/calendars
}
function* loadSchedules() {
    try {
        const result = yield call(loadSchedulesAPI);
        yield put({
            type : LOAD_SCHEDULES_SUCCESS,
            data : result.data,
        })
    } catch(e) {
        yield put({
            type : LOAD_SCHEDULES_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchloadSchedules() {
    yield takeLatest(LOAD_SCHEDULES_REQUEST, loadSchedules);
}
//
function addSchedulesAPI(data) { // server:GET /api/calendars
    return axios.post('/calendar', data, {
        withCredentials : true,
    }); 
}
function* addSchedules(action) {
    try {
        const result = yield call(addSchedulesAPI, action.data);
        yield put({
            type : ADD_SCHEDULE_SUCCESS,
            data : result.data,
        });
        //console.log('reducer',action.data)
    } catch(e) {
        yield put({
            type : ADD_SCHEDULE_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchAddSchedule() {
    yield takeLatest(ADD_SCHEDULE_REQUEST, addSchedules);
}
//
function editSchedulesAPI(data) { // server:PATCH /api/calendars
    return axios.patch(`/calendar/${data.id}/edit`, data, {
        withCredentials : true,
    }); 
}
function* editSchedules(action) {
    try {
        const result = yield call(editSchedulesAPI, action.data);
        yield put({
            type : EDIT_SCHEDULE_SUCCESS,
            data : result.data,
        });
        console.log('reducer',action.data)
    } catch(e) {
        yield put({
            type : EDIT_SCHEDULE_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchEditSchedule() {
    yield takeLatest(EDIT_SCHEDULE_REQUEST, editSchedules);
}
//
function deleteSchedulesAPI(data) { // server:DELETE /api/calendar/:id/delete
    return axios.delete(`/calendar/${data}/delete`, {
        withCredentials : true,
    }); 
}
function* deleteSchedules(action) {
    try {
        const result = yield call(deleteSchedulesAPI, action.data);
        yield put({
            type : DELETE_SCHEDULE_SUCCESS,
            data : result.data,
        });
    } catch(e) {
        yield put({
            type : DELETE_SCHEDULE_FAILURE,
            error : e.response && e.response.data,
        })
    }
}
function* watchDeleteSchedule() {
    yield takeLatest(DELETE_SCHEDULE_REQUEST, deleteSchedules);
}

export default function* calendartSaga() {
    yield all([
        fork(watchloadSchedules),
        fork(watchAddSchedule),
        fork(watchEditSchedule),
        fork(watchDeleteSchedule),
    ])
}