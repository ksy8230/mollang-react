import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import AdminMenu from '../../Components/AdminMenu';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const Admin = () => {
    const { me } = useSelector(state => state.user);
    useEffect(() => {
        if ( me == null || me.id !== 1 ){
            alert('관리자 권한이 없습니다.');
            Router.push('/');
        }
    }, [me && me.id]);
    
    return (
        <div className='admin'>
            <AdminMenu />
            <div className='admin-content'>
                admin main
            </div>
        </div>
    );
};

export default Admin;