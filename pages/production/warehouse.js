import Navbar from '~/components/Navbar';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Navbar from '~/components/Navbar';
import { createUser, getAllUsers } from '~/redux/actions/userAction';
import { useRouter } from 'next/router';

import { Button, Table, Modal, Form, Input, Select } from 'antd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';


const warehouse = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-[88px] px-16">
                <h2 className="font-bold">warehouse co so sx</h2>
            </div>
        </div>
    );
};

export default warehouse;
