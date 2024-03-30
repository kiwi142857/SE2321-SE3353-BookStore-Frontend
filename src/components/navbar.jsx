import { Col, Menu, Row, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { Dropdown } from "antd";
import { useState } from "react";
import { useRef } from "react";
import { logout } from "../service/logout";
import { handleBaseApiResponse } from "../utils/message";
import useMessage from "antd/es/message/useMessage";
import { FormOutlined, AccountBookOutlined, LogoutOutlined } from '@ant-design/icons';
import ChangePasswordModal from "./changePasswordModal";


export default function NavBar({ user }) {

    const location = useLocation();
    const parts = location.pathname.split('/');
    const [showModal, setShowModal] = useState(false);
    const [avatar, setAvatar] = useState(user? (user.profile ? user.profile: null): null);
    const selectedKey = '/' + parts[parts.length - 1]; // The last part of the path
    const navigate = useNavigate();
    const [messageApi, contextHolder] = useMessage();
    const fileInputRef = useRef(null);

    const navItems = [  // Items in the navigation bar
        { label: "主页", value: "/home" },
        { label: "购物车", value: "/cart" },
        { label: "订单", value: "/order" },
        { label: "排名", value: "/rank" },
    ];

    const navMenuItems = navItems.map(item => ({
        key: item.value,
        label: <Link className="navbar-font" to={item.value}>{item.label}</Link>
    }));

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleMenuClick = async (e) => {
        if (e.key === "/logout") {
            let res = await logout();
            handleBaseApiResponse(res, messageApi, () => navigate("/login"));
            navigate("/login");
            return;
        }
        if (e.key === "password") {
            handleOpenModal();
            return;
        }
        if (e.key === "profile") {
            fileInputRef.current.click();
        }
        if (e.key.startsWith("/")) {
            navigate(e.key);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            user.profile = URL.createObjectURL(file);
            setAvatar(URL.createObjectURL(file));

        }
    };

    const dropMenuItems = [
        {
            key: "nickname",
            label: user?.nickname,
            icon: <UserOutlined />,
        },
        {
            key: "password",
            label: "修改密码",
            icon: <FormOutlined />,
        },
        {
            key: "profile",
            label: "修改头像",
            icon: <UserOutlined />,
        },
        {
            key: "balance",
            label: `余额：${user?.balance / 100}元`,
            icon: <AccountBookOutlined />,
        },
        { key: "/logout", label: "登出", icon: <LogoutOutlined />, danger: true },
    ];

    const handleOk = () => {
        setShowModal(false);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    return (
        <Row className="navbar" justify="start" style={{ margin: '15px', height: '50px', marginBottom: '0' }}>
            <Col flex={0.1}>
                <Link to='./home'>
                    <div style={{ paddingTop: '10px' }}>
                        <img
                            style={{ width: '45px', height: '45px' }}
                            src={process.env.PUBLIC_URL + '/icon.svg'}
                            alt="icon"
                        />
                    </div>
                </Link>
            </Col>
            <Col flex={10}>
                <Link className="title-font" to="./home">Book store</Link>
            </Col>
            <Col flex={1} style={{ textAlign: 'right' }}>
                <Menu mode="horizontal"
                    defaultSelectedKeys={[selectedKey]}
                    items={navMenuItems}
                    selectedKeys={[selectedKey]}
                />
            </Col>
            {user && <Col>
                <Dropdown menu={{ onClick: handleMenuClick, items: dropMenuItems }}>
                    <Button 
                        shape="circle" 
                        style={{ position: 'relative', overflow: 'hidden' }}
                        icon={avatar ? 
                            <img
                                src={avatar}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%'
                                }}
                            /> 
                            : 
                            <UserOutlined />
                        } 
                    />
                </Dropdown>
            </Col>}
            <input
                type="file"
                accept=".jpg,.png"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            {showModal && <ChangePasswordModal onOk={handleOk} onCancel={handleCancel} user={user}/>}
        </Row>
    );
}