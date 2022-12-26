import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiUserGroup, HiWrenchScrewdriver } from 'react-icons/hi2';
import { MdCategory, MdPendingActions } from 'react-icons/md';
import { ImStatsDots } from 'react-icons/im';
import { Button } from 'antd';
import { FaWarehouse } from 'react-icons/fa';
import Link from 'next/link';
import { logout } from '~/redux/actions/authAction';

const Navbar = () => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [html, setHtml] = useState('');

    const handleLogout = (e) => {
        dispatch(logout(auth.user));
    };

    useEffect(() => {
        if (auth.user.role === 'executive') {
            setHtml(
                <>
                    <h1 className="text-color1 ml-8 mr-10">Logo</h1>
                    <ul className="w-full flex justify-center">
                        <li className="mx-16 hover:cursor-pointer w-[80px] hover:bg-color3">
                            <Link href="/executive/management">
                                <HiUserGroup className="text-color1 h-8 w-8 mt-2 ml-6 hover:text-color1" />
                            </Link>
                            <p className="text-color1 w-full text-center">Staff</p>
                        </li>
                        <li className="mx-16 hover:cursor-pointer w-[80px]  hover:bg-color3">
                            <Link href="/executive/model">
                                <MdCategory className="text-color1 h-8 w-8 mt-2 ml-6 hover:text-color1" />
                            </Link>
                            <p className="text-color1 w-full text-center">Model</p>
                        </li>
                        <li className="mx-16 hover:cursor-pointer w-[80px]  hover:bg-color3">
                            <Link href="/executive/statistics">
                                <ImStatsDots className="text-color1 h-8 w-8 mt-2 ml-6 hover:text-color1" />
                            </Link>
                            <p className="text-color1 w-full text-center">Statistics</p>
                        </li>
                    </ul>
                    <h3 className="text-color1 mx-6">{auth.user.name}</h3>
                    <Button
                        type="primary"
                        className="inline-block mr-10 border-color1 bg-color3 
                    hover:bg-color1 hover:text-color4"
                        onClick={(e) => handleLogout(e)}
                    >
                        Logout
                    </Button>
                </>,
            );
        } else if (auth.user.role === 'distribution') {
            setHtml(
                <>
                    <h1 className="text-color1 ml-8 mr-10">Logo</h1>
                    <ul className="w-full flex justify-center">
                        <li className="mx-16 hover:cursor-pointer w-[80px] hover:bg-color3">
                            <Link href="/distribution/warehouse">
                                <FaWarehouse className="text-color1 h-8 w-8 mt-2 ml-6 hover:text-color1" />
                            </Link>
                            <p className="text-color1 w-full text-center">Warehouse</p>
                        </li>
                        <li className="mx-16 hover:cursor-pointer w-[80px] hover:bg-color3">
                            <Link href="/distribution/pending">
                                <MdPendingActions className="text-color1 h-8 w-8 mt-2 ml-6 hover:text-color1" />
                            </Link>
                            <p className="text-color1 w-full text-center">Pending</p>
                        </li>
                        <li className="mx-16 hover:cursor-pointer w-[80px] hover:bg-color3">
                            <Link href="/distribution/statistics">
                                <ImStatsDots className="text-color1 h-8 w-8 mt-2 ml-6 hover:text-color1" />
                            </Link>
                            <p className="text-color1 w-full text-center">Statistics</p>
                        </li>
                    </ul>
                    <h3 className="text-color1 mx-6">{auth.user.name}</h3>
                    <Button
                        type="primary"
                        className="inline-block mr-10 border-color1 bg-color3 
                    hover:bg-color1 hover:text-color4"
                        onClick={(e) => handleLogout(e)}
                    >
                        Logout
                    </Button>
                </>,
            );
        } else if (auth.user.role === 'production') {
            setHtml(
                <>
                    <h1 className="text-color1 ml-8 mr-10">Logo</h1>
                    <ul className="w-full flex justify-center">
                        <li className="mx-16 hover:cursor-pointer w-[80px] hover:bg-color3">
                            <Link href="/production/warehouse">
                                <FaWarehouse className="text-color1 h-8 w-8 mt-2 ml-6 hover:text-color1" />
                            </Link>
                            <p className="text-color1 w-full text-center">Warehouse</p>
                        </li>
                        <li className="mx-16 hover:cursor-pointer w-[80px] hover:bg-color3">
                            <Link href="/production/pending">
                                <MdPendingActions className="text-color1 h-8 w-8 mt-2 ml-6 hover:text-color1" />
                            </Link>
                            <p className="text-color1 w-full text-center">Pending</p>
                        </li>
                        <li className="mx-16 hover:cursor-pointer w-[80px] hover:bg-color3">
                            <Link href="/production/statistics">
                                <ImStatsDots className="text-color1 h-8 w-8 mt-2 ml-6 hover:text-color1" />
                            </Link>
                            <p className="text-color1 w-full text-center">Statistics</p>
                        </li>
                    </ul>
                    <h3 className="text-color1 mx-6">{auth.user.name}</h3>
                    <Button
                        type="primary"
                        className="inline-block mr-10 border-color1 bg-color3 
                    hover:bg-color1 hover:text-color4"
                        onClick={(e) => handleLogout(e)}
                    >
                        Logout
                    </Button>
                </>,
            );
        } else if (auth.user.role === 'warranty') {
            setHtml(
                <>
                    <h1 className="text-color1 ml-8 mr-10">Logo</h1>
                    <ul className="w-full flex justify-center">
                        <li className="mx-16 hover:cursor-pointer w-[80px] hover:bg-color3">
                            <Link href="/warranty/warranting">
                                <HiWrenchScrewdriver className="text-color1 h-8 w-8 mt-2 ml-6 hover:text-color1" />
                            </Link>
                            <p className="text-color1 w-full text-center">Warranting</p>
                        </li>
                        <li className="mx-16 hover:cursor-pointer w-[80px] hover:bg-color3">
                            <Link href="/warranty/pending">
                                <MdPendingActions className="text-color1 h-8 w-8 mt-2 ml-6 hover:text-color1" />
                            </Link>
                            <p className="text-color1 w-full text-center">Pending</p>
                        </li>
                        <li className="mx-16 hover:cursor-pointer w-[80px] hover:bg-color3">
                            <Link href="/warranty/statistics">
                                <ImStatsDots className="text-color1 h-8 w-8 mt-2 ml-6 hover:text-color1" />
                            </Link>
                            <p className="text-color1 w-full text-center">Statistics</p>
                        </li>
                    </ul>
                    <h3 className="text-color1 mx-6">{auth.user.name}</h3>
                    <Button
                        type="primary"
                        className="inline-block mr-10 border-color1 bg-color3 
                    hover:bg-color1 hover:text-color4"
                        onClick={(e) => handleLogout(e)}
                    >
                        Logout
                    </Button>
                </>,
            );
        }
    }, []);

    return (
        <div
            className="h-[68px] w-100 bg-color4 flex items-center 
                fixed top-0 right-0 left-0 drop-shadow-lg z-10"
        >
            {html}
        </div>
    );
};

export default Navbar;
