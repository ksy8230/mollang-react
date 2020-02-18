import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

const AdminMenu = () => {
    return (
        <div className='admin-menu'>
            <ul>
                <li><Link href='/admin/blog'><a>포스팅</a></Link></li>
                <li><Link href=''><a>일정관리</a></Link></li>
            </ul>
        </div>
    );
};

export default AdminMenu;