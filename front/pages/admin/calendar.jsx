import React, { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import AdminMenu from '../../Components/AdminMenu';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import TUICalendar from "@toast-ui/react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { LOAD_SCHEDULES_REQUEST, ADD_SCHEDULE_REQUEST, EDIT_SCHEDULE_REQUEST, DELETE_SCHEDULE_REQUEST } from '../../reducers/calendar';
//import "tui-calendar/dist/tui-calendar.css";
//import "tui-date-picker/dist/tui-date-picker.css";
//import "tui-time-picker/dist/tui-time-picker.css";

const ToastCalendar = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  useEffect(() => {
      if ( me == null || me.id !== 1 ){
          alert('관리자 권한이 없습니다.');
          Router.push('/');
      }
  }, [me && me.id]);
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndate] = useState('');
  const { schedules, scheduleEdited } = useSelector(state => state.calendar);

  const start = new Date();
  const end = new Date(new Date().setHours(start.getHours() + 1));
    
  /*const schedules = [
      {
          calendarId: "1",
          category: "time",
          isVisible: true,
          isPending: false,
          title: "Study1111",
          id: "1",
          body: "Test",
          start,
          end
      },
      {
          id: '4',
          calendarId: '1',
          title: 'second schedule',
          category: 'time',
          dueDateClass: '',
          start: '2020-02-18T17:30:00+09:00',
          end: '2020-02-19T17:31:00+09:00',
          isReadOnly: true    // schedule is read-only
      }
  ];*/
  
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
  
  const cal = useRef(null);

  const onClickSchedule = useCallback(e => {
    console.log('onClickSchedule',e);
  }, []);
  
  const onBeforeCreateSchedule = useCallback(scheduleData => { // 스케줄 추가
    console.log('onBeforeCreateSchedule',scheduleData);
    const schedule = {
      id: Number(Math.random()),
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? "allday" : "time",
      dueDateClass: "",
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw["class"]
      },
      state: scheduleData.state
    };
    dispatch({
      type : ADD_SCHEDULE_REQUEST,
      data : {
        title : scheduleData.title,
        category : scheduleData.isAllDay ? "allday" : "time",
        start: scheduleData.start._date,
        end: scheduleData.end._date,
      } 
    })

    //cal.current.calendarInst.createSchedules([schedule]);
  }, []);
  
  const onBeforeDeleteSchedule = useCallback(res => { // 스케줄 삭제
    console.log('delete', res);
    const { id, calendarId } = res.schedule;
    console.log('delete', id, )
    dispatch({
      type : DELETE_SCHEDULE_REQUEST,
      data : id,
    });

    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);
  
  const onBeforeUpdateSchedule = useCallback(e => { // 스케줄 수정 
    const { schedule, changes } = e;
    console.log('changes', changes);
    console.log('schedule', schedule); 
    dispatch({
      type : EDIT_SCHEDULE_REQUEST,
      data : {
        id : schedule.id,
        calendarId : schedule.calendarId,
        title : changes.title,
        category : schedule.isAllDay ? "allday" : "time",
        start: changes.start && changes.start._date ? changes.start._date : schedule.start._date,
        end: changes.end && changes.end._date || schedule.end._date,
      }
    });
    
    cal.current.calendarInst.updateSchedule(
      schedule.id,
      schedule.calendarId,
      changes
    );

  }, [scheduleEdited]);
  
  function _getFormattedTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule, isAllDay) {
    var html = [];
    console.log('_getTimeTemplate',schedule);
    if (!isAllDay) {
      html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(" Private");
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(" " + schedule.title);
    }

    return html.join("");
  }

  const templates = {
    time: function(schedule) {  
      return _getTimeTemplate(schedule, false);
    }
  };

  function getDate(startValue, endValue, setStartState, setEndState, setStartState2, setEndState2) {
    setStartState(startValue.toString().split(' ')[1].replace(/Jan/gi, '01').replace(/Feb/gi, '02').replace(/Mar/gi, '03').replace(/Apr/gi, '04').replace(/May/gi, '05').replace(/Jun/gi, '06').replace(/Jul/gi, '07').replace(/Aug/gi, '08').replace(/Sep/gi, '09').replace(/Oct/gi, '10').replace(/Nov/gi, '11').replace(/Dec/gi, '12')); // 시작 월
    setEndState(endValue.toString().split(' ')[1].replace(/Jan/gi, '01').replace(/Feb/gi, '02').replace(/Mar/gi, '03').replace(/Apr/gi, '04').replace(/May/gi, '05').replace(/Jun/gi, '06').replace(/Jul/gi, '07').replace(/Aug/gi, '08').replace(/Sep/gi, '09').replace(/Oct/gi, '10').replace(/Nov/gi, '11').replace(/Dec/gi, '12')); // 끝 월
    setStartState2(startValue.toString().split(' ')[2]); // 시작 일
    setEndState2(endValue.toString().split(' ')[2]); // 시작 일
  }

  // 다음 달력보기 
  const handleClickNextCalendarButton = useCallback(() => {
    cal.current.calendarInst.next();
    let rangeStartDate = cal.current.calendarInst._renderRange.start._date;
    let rangeEndDate = cal.current.calendarInst._renderRange.end._date;
    /*setStartMonth(rangeStartDate.toString().split(' ')[1]); // 시작 월
    setEndMonth(rangeEndDate.toString().split(' ')[1]); // 끝 월
    setStartDate(rangeStartDate.toString().split(' ')[2]); // 시작 일
    setEndate(rangeEndDate.toString().split(' ')[2]); // 시작 일*/
    getDate(rangeStartDate, rangeEndDate, setStartMonth, setEndMonth, setStartDate, setEndate);
    console.log('next startMonth',rangeStartDate)
  }, [startMonth, endMonth, startDate, endDate, cal.current]);

  // 이전 달력보기 
  const handleClickPrevCalendarButton = useCallback(() => {
    cal.current.calendarInst.prev();
    let rangeStartDate = cal.current.calendarInst._renderRange.start._date;
    let rangeEndDate = cal.current.calendarInst._renderRange.end._date;
    getDate(rangeStartDate, rangeEndDate, setStartMonth, setEndMonth, setStartDate, setEndate);
    
  }, [startMonth, endMonth, startDate, endDate, cal.current]);

  // 주단위로 보기 
  const handleClickWeekCalendarButton = () => {
    cal.current.calendarInst.changeView('week', true);
  }
  // 주단위로 보기 월단위로 보기
  const handleClickMonthCalendarButton = () => {
    cal.current.calendarInst.changeView('month', true);
  }
  const handleClickDayname = (e) => {
    //console.group('onClickDayname');
    console.log(e.date);
  }

  useEffect(() => {
    dispatch({
      type : LOAD_SCHEDULES_REQUEST,
      //data : schedules
    });
  }, []);

  useEffect(() => {
    let rangeStartDate = cal.current.calendarInst._renderRange.start._date;
    let rangeEndDate = cal.current.calendarInst._renderRange.end._date;
    getDate(rangeStartDate, rangeEndDate, setStartMonth, setEndMonth, setStartDate, setEndate); // 첫 렌더링시 보이는 날짜
  }, [])

  return (
    <div className='admin'> 
      <AdminMenu />
      <div className='admin-content calendar'>
        <div className='calendar_head'>
          <span onClick={handleClickWeekCalendarButton}>week</span>
          <span onClick={handleClickMonthCalendarButton}>month</span>
          <div className='navigation'>
            <button onClick={handleClickPrevCalendarButton}><FontAwesomeIcon icon={faAngleLeft} /></button>
            <button onClick={handleClickNextCalendarButton}><FontAwesomeIcon icon={faAngleRight} /></button>
          </div>
          <div className='date'>2020.{startMonth}.{startDate} - {endMonth}.{endDate}</div>
        </div>

        <TUICalendar
            ref={cal}
            onClickDayname={handleClickDayname}
            usageStatistics={false}
            height="90%"
            //taskView={true}
            useCreationPopup={true}
            useDetailPopup={true}
            //defaultView='month'
            template={templates}
            calendars={calendars}
            schedules={schedules}
            scheduleView
            timezones={[
                {
                    timezoneOffset: 540,
                    displayLabel: 'GMT+09:00',
                    tooltip: 'Seoul'
                },
            ]}
            useDetailPopup
            useCreationPopup
            view='month'
            month={{
              daynames: ['일', '월', '화', '수', '목', '금', '토'],
              startDayOfWeek: 0,
              narrowWeekend: true
            }}
            week={{
              daynames: ['일', '월', '화', '수', '목', '금', '토'],
              //startDayOfWeek: 0,
              narrowWeekend: true,
            }}
            onClickSchedule={onClickSchedule}
            onBeforeCreateSchedule={onBeforeCreateSchedule}
            onBeforeDeleteSchedule={onBeforeDeleteSchedule}
            onBeforeUpdateSchedule={onBeforeUpdateSchedule}
        />
      </div>
    </div>
  );
};

export default ToastCalendar;