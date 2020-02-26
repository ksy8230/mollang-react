import React, { useEffect, useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import AdminMenu from '../../Components/AdminMenu';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
//import TUICalendar from "@toast-ui/react-calendar";
// const TUICalendar = dynamic(() => import("@toast-ui/react-calendar").then(mod => mod.TUICalendar), {
//   ssr: false
// });
import { LOAD_SCHEDULES_REQUEST, ADD_SCHEDULE_REQUEST, EDIT_SCHEDULE_REQUEST, DELETE_SCHEDULE_REQUEST } from '../../reducers/calendar';

const ToastCalendar = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndate] = useState('');
  const { schedules, scheduleEdited } = useSelector(state => state.calendar);

  useEffect(() => {
      if ( me == null || me.id !== 1 ){
          alert('관리자 권한이 없습니다.');
          Router.push('/');
      }
  }, [me && me.id]);

  const start = new Date();
  const end = new Date(new Date().setHours(start.getHours() + 1));

  function getDate(startValue, endValue, setStartState, setEndState, setStartState2, setEndState2) {
    setStartState(startValue.toString().split(' ')[1].replace(/Jan/gi, '01').replace(/Feb/gi, '02').replace(/Mar/gi, '03').replace(/Apr/gi, '04').replace(/May/gi, '05').replace(/Jun/gi, '06').replace(/Jul/gi, '07').replace(/Aug/gi, '08').replace(/Sep/gi, '09').replace(/Oct/gi, '10').replace(/Nov/gi, '11').replace(/Dec/gi, '12')); // 시작 월
    setEndState(endValue.toString().split(' ')[1].replace(/Jan/gi, '01').replace(/Feb/gi, '02').replace(/Mar/gi, '03').replace(/Apr/gi, '04').replace(/May/gi, '05').replace(/Jun/gi, '06').replace(/Jul/gi, '07').replace(/Aug/gi, '08').replace(/Sep/gi, '09').replace(/Oct/gi, '10').replace(/Nov/gi, '11').replace(/Dec/gi, '12')); // 끝 월
    setStartState2(startValue.toString().split(' ')[2]); // 시작 일
    setEndState2(endValue.toString().split(' ')[2]); // 시작 일
  }

  useEffect(() => {
    if (typeof window !== 'undefined') { 
      console.log('we are running on the client')
      let Calendarjs = require('tui-calendar'); 
      const view_week = document.getElementById('view_week');
      const view_month = document.getElementById('view_month');
      const next_calendar = document.getElementById('next_calendar');
      const prev_calendar = document.getElementById('prev_calendar');
      const calendars = [
        {
          id: "1",
          name: "프로젝트",
          color: "#ffffff",
          bgColor: "#9e5fff",
          dragBgColor: "#9e5fff",
          borderColor: "#9e5fff"
        },
        {
          id: "2",
          name: "공부",
          color: "#00a9ff",
          bgColor: "#00a9ff",
          dragBgColor: "#00a9ff",
          borderColor: "#00a9ff"
        }
      ];

      let calendar = new Calendarjs('#calendar_container', {
        defaultView: 'month',
        taskView: false,
        //template: templates,
        //scheduleView : true,
        calendars : calendars,
        //schedules : schedules,
        useCreationPopup: true,
        useDetailPopup: true,
        month : {
          daynames : ['일', '월', '화', '수', '목', '금', '토'],
          startDayOfWeek: 0,narrowWeekend: true,
        },
        week : {
          daynames : ['일', '월', '화', '수', '목', '금', '토'],
          narrowWeekend: true,
        },
      });
      
      // dispatch({ 
      //   type : LOAD_SCHEDULES_REQUEST,
      // });
      // 스케쥴들 불러오기
      calendar.createSchedules(schedules);
      
      let rangeStartDate = calendar._renderRange.start._date;
      let rangeEndDate = calendar._renderRange.end._date;
      getDate(rangeStartDate, rangeEndDate, setStartMonth, setEndMonth, setStartDate, setEndate); // 현재 달력 범위 불러오기


      calendar.on('beforeCreateSchedule', scheduleData => { // 스케줄 추가
        const schedule = {
          calendarId: scheduleData.calendarId,
          title: scheduleData.title,
          isAllDay: scheduleData.isAllDay,
          start: scheduleData.start,
          end: scheduleData.end,
          category: scheduleData.isAllDay ? 'allday' : 'time'
        };
        
        dispatch({
          type : ADD_SCHEDULE_REQUEST,
          data : {
            calendarId : scheduleData.calendarId,
            title : scheduleData.title,
            category : scheduleData.isAllDay ? "allday" : "time",
            start: scheduleData.start._date,
            end: scheduleData.end._date,
          } 
        });
        
        calendar.createSchedules([schedule]);

      });

      calendar.on('beforeDeleteSchedule', (scheduleData) => { // 스케줄 삭제
        const { schedule } = scheduleData;
        console.log('schedule.id',schedule.id)
        dispatch({
          type : DELETE_SCHEDULE_REQUEST,
          data : schedule.id
        });
        calendar.deleteSchedule(schedule.id, schedule.calendarId);
      });

      calendar.on('beforeUpdateSchedule', (event) => { // 스케줄 수정 
        const { schedule, changes } = event;
        // console.log('changes',changes)
        dispatch({
          type : EDIT_SCHEDULE_REQUEST,
          data : {
            id : schedule.id,
            calendarId : changes.calendarId,
            title : changes.title,
            category : schedule.isAllDay ? "allday" : "time",
            start: changes.start && changes.start._date ? changes.start._date : schedule.start._date,
            end: changes.end && changes.end._date || schedule.end._date,
          }
        });
        calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
      });
      
      view_week.addEventListener('click', () => { // 주 단위로 보기
        calendar.changeView('week', true);
      });

      view_month.addEventListener('click', () => { // 월 단위로 보기
        calendar.changeView('month', true);
      });

      next_calendar.addEventListener('click', () => { // 다음 달력 보기
        calendar.next();
        let rangeStartDate = calendar._renderRange.start._date;
        let rangeEndDate = calendar._renderRange.end._date;
        getDate(rangeStartDate, rangeEndDate, setStartMonth, setEndMonth, setStartDate, setEndate);
      });
      
      prev_calendar.addEventListener('click', () => { // 이전 달력 보기
        calendar.prev();
        let rangeStartDate = calendar._renderRange.start._date;
        let rangeEndDate = calendar._renderRange.end._date;
        getDate(rangeStartDate, rangeEndDate, setStartMonth, setEndMonth, setStartDate, setEndate);
      });
    }
  }, []);



  return (
    <div className='admin'> 
      <AdminMenu />
      <div className='admin-content calendar'>
        <div className='calendar_head'>
          <span id='view_week'>week</span>
          <span id='view_month'>month</span>
          <div className='navigation'>
            <button id='prev_calendar'><FontAwesomeIcon icon={faAngleLeft} /></button>
            <button id='next_calendar'><FontAwesomeIcon icon={faAngleRight} /></button>
          </div>
          <div className='date'>2020.{startMonth}.{startDate} - {endMonth}.{endDate}</div>
        </div>
        <div id="calendar_container" style={{height:"90%"}} ></div>
      </div>
    </div>
  )
};

ToastCalendar.getInitialProps = async (context) => {
  context.store.dispatch({
    type : LOAD_SCHEDULES_REQUEST,
  })
};

export default ToastCalendar;