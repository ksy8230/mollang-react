// 달력 정보 담고 있는 캘린더 store
export const initialState = {
    schedules : [{
        id: 1,
        calendarId: 0,
        title: '더미 데이터 입니다',
        category: 'time',
        start : new Date(),
        end : new Date(new Date().setHours(new Date().getHours() + 1)),
    },{
        id: 2,
        calendarId: 1,
        title: '더미2.. 데이터 입니다',
        category: 'time',
        start : new Date(),
        end : new Date(new Date().setHours(new Date().getHours() + 1)),
    }],
    isAddingSchedules : false,
    scheduleEdited : false,
    scheduleDeleted : false,
    loadSchedulesErrorReason : '',
    addScheduleErrorReason : '',
    editScheduleErrorReason : '',
    deleteScheduleErrorReason : '',
};

const dummy = {
    id: 1,
    calendarId: 0,
    title: '추가한 더미 데이터 입니다',
    category: 'time',
    start : new Date(),
    end : new Date(new Date().setHours(new Date().getHours() + 1)),
};
// 스케쥴들 불러오기 액션
export const LOAD_SCHEDULES_REQUEST = 'LOAD_SCHEDULES_REQUEST';
export const LOAD_SCHEDULES_SUCCESS = 'LOAD_SCHEDULES_SUCCESS';
export const LOAD_SCHEDULES_FAILURE = 'LOAD_SCHEDULES_FAILURE';
// 스케쥴 추가하기 액션
export const ADD_SCHEDULE_REQUEST = 'ADD_SCHEDULE_REQUEST';
export const ADD_SCHEDULE_SUCCESS = 'ADD_SCHEDULE_SUCCESS';
export const ADD_SCHEDULE_FAILURE = 'ADD_SCHEDULE_FAILURE';
// 스케쥴 수정하기 액션
export const EDIT_SCHEDULE_REQUEST = 'EDIT_SCHEDULE_REQUEST';
export const EDIT_SCHEDULE_SUCCESS = 'EDIT_SCHEDULE_SUCCESS';
export const EDIT_SCHEDULE_FAILURE = 'EDIT_SCHEDULE_FAILURE';
// 스케쥴 삭제하기 액션
export const DELETE_SCHEDULE_REQUEST = 'DELETE_SCHEDULE_REQUEST';
export const DELETE_SCHEDULE_SUCCESS = 'DELETE_SCHEDULE_SUCCESS';
export const DELETE_SCHEDULE_FAILURE = 'DELETE_SCHEDULE_FAILURE';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SCHEDULES_REQUEST : {
            return {
                ...state,
            }
        }
        case LOAD_SCHEDULES_SUCCESS : {
            return {
                ...state,
                schedules : action.data,
            }
        }
        case LOAD_SCHEDULES_FAILURE : {
            return {
                ...state,
                loadSchedulesErrorReason : action.error,
            }
        }
        //
        case ADD_SCHEDULE_REQUEST : {
            return {
                ...state,
            }
        }
        case ADD_SCHEDULE_SUCCESS : {
            return {
                ...state,
                schedules : [action.data, ...state.schedules],
            }
        }
        case ADD_SCHEDULE_FAILURE : {
            return {
                ...state,
                addScheduleErrorReason : action.error,
            }
        }
        //
        case EDIT_SCHEDULE_REQUEST : {
            return {
                ...state,
                scheduleEdited : false,
            }
        }
        case EDIT_SCHEDULE_SUCCESS : {
            const scheduleIndex = state.schedules.findIndex( v => v.id === action.data.id );
            const schedule = state.schedules[scheduleIndex];
            schedule.title = action.data.title;
            schedule.category = action.data.category;
            schedule.start = action.data.start;
            schedule.end = action.data.end;
            return {
                ...state,
                scheduleEdited : true,
            }
        }
        case EDIT_SCHEDULE_FAILURE : {
            return {
                ...state,
                editScheduleErrorReason : action.error,
                scheduleEdited : false,
            }
        }
        //
        case DELETE_SCHEDULE_REQUEST : {
            return {
                ...state,
                scheduleDeleted : false,
            }
        }
        case DELETE_SCHEDULE_SUCCESS : {
            return {
                ...state,
                schedules : state.schedules.filter( v => v.id !== action.data ),
                scheduleDeleted : true,
            }
        }
        case DELETE_SCHEDULE_FAILURE : {
            return {
                ...state,
                deleteScheduleErrorReason : action.error,
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