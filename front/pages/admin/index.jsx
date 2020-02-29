import React, { useEffect, useState, useCallback } from 'react';
import AdminMenu from '../../Components/AdminMenu';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { Doughnut } from 'react-chartjs-2';
import { countDays, makeUniqueTagList } from '../../Components/FunctionalComponent';
import { LOAD_POSTS_REQUEST, LOAD_TAG_POSTS_REQUEST } from '../../reducers/post';
import moment from 'moment';
import { LOAD_SCHEDULES_REQUEST } from '../../reducers/calendar';

function calculateAWSTotalCost() {
    const ec2hourCost = 0.0144; // 시간당 달러
    const route53Cost = 0.5; // 시간당 달러
    const route53Length = 2; // 호스팅 갯수
    const ec2KeyLength = 2; // 
    const feb = moment('2020-02-01');
    const mar = moment('2020-03-01');
    const apri = moment('2020-04-01');
    const may = moment('2020-05-01');
    const jun = moment('2020-06-01');
    const jul = moment('2020-07-01');
    const aug = moment('2020-08-01');
    const sep = moment('2020-09-01');
    const oct = moment('2020-10-01');
    const nov = moment('2020-11-01');
    const dec = moment('2020-12-01');

    // (매달 변경해야되는 곳)
    let startMonth = mar;
    let endMonth = apri;
    // 해당 날짜부터 오늘까지 시간 
    const instanceRgProject = moment().diff(moment('2020-02-22'),"hours"); 
    const instanceMollog = moment().diff(startMonth,"hours");
    
    const totalMonthCost = ec2hourCost * endMonth.diff(startMonth,"hours"); // 한달뒤를 생각하자
    const ec2CurrentCost = ec2hourCost * (instanceRgProject + instanceMollog); // 현재까지 청구비
    const expectEc2TotalMonthCost = (totalMonthCost * ec2KeyLength) + (route53Cost * route53Length); // 예상 이번달 청구비
    
    return {
        total : expectEc2TotalMonthCost,
        current : ec2CurrentCost
    };

}

const Admin = () => {
    const { me } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);
    const { schedules } = useSelector(state => state.calendar);
    const options = {
        legend: {
          display: false,
          position: "right"
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      };
    const data = {
        labels: [
            '남은 일수',
            '사용 일수',
        ],
        datasets: [{
            data: [- countDays('2021.02.22'), countDays('2020.02.22')],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            ]
        }]
    };
    

    useEffect(() => {
        if ( me == null || me.id !== 1 ){
            alert('관리자 권한이 없습니다.');
            Router.push('/');
        }
    }, [me && me.id]);
    

    return (
        <div className='admin'> 
        <style>
        </style>
            <AdminMenu />
            <div className='admin-content'>
                <section className='admin-box'>
                    <h2>정보 요약</h2>
                    <div>
                        <p className='title'>오늘 일정</p>
                        <p>
                            <span>
                                {
                                    schedules
                                    .map( v => v.start.split('T')[0])
                                    .filter( v => v === moment(new Date()).format().split('T')[0]).length
                                }
                            </span>건</p>
                    </div>
                    <div>
                        <p className='title'>포스트 수</p>
                        <p><span>{mainPosts.length}</span>개</p>
                    </div>
                    <div>
                        <p className='title'>태그 수</p>
                        <p><span>
                            {makeUniqueTagList(mainPosts).length
                            }</span>개</p>
                    </div>
                </section>
                <section className='admin-box'>
                    <h2>시스템 현황</h2>
                    <div>
                        <div className='chartjs'><Doughnut data={data} options={options} /></div>
                    </div>
                    <div className='info'>
                            <ul>
                                <li>
                                    <p className='title'>도메인 결제일</p>
                                    <p><span>2021.02.22</span></p>
                                </li>
                                <li>
                                    <p className='title'>도메인 남은 기간</p>
                                    <p><span>{Number(- countDays('2021.02.22'))}</span>일</p>
                                </li>
                                <li>
                                    <p className='title'>현재 AWS 서버 청구비</p>
                                    <p><span>${calculateAWSTotalCost().current}</span></p>
                                </li>
                                <li>
                                    <p className='title'>이번 달 예상 AWS 서버 청구비</p>
                                    <p><span>${calculateAWSTotalCost().total}</span></p>
                                </li>
                            </ul>
                        </div>
                    
                </section>
            </div>
        </div>
    );
};

Admin.getInitialProps = async (context) => {
    //console.log(Object.keys(context));
    context.store.dispatch({
        type : LOAD_POSTS_REQUEST,
        lastId : 0,
        limit : 0,
    });
    context.store.dispatch({
        type : LOAD_SCHEDULES_REQUEST,
    });
};

export default Admin;