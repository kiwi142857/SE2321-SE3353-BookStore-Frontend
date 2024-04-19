import React, { useState, useEffect } from 'react';
import { Avatar, Input, Row, Col, Typography, Card, Button, Statistic } from 'antd';
import useMessage from 'antd/es/message/useMessage';
import { WalletOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router';
import { getMe } from '../service/user';
import { logout } from '../service/logout';
import { handleBaseApiResponse } from '../utils/message';
import { PrivateLayout } from '../components/layout';
import ChangePasswordModal from '../components/changePasswordModal';
import '../css/global.css';

function UserCard({ avatarSrc, handleAvatarChange, user, description, handleDescriptionChange }) {
    return (
        <Row gutter={18} style={{ marginLeft: '5%' }}>
            <Col span={3}>
                <div style={{ position: 'relative', marginTop: '20%', width: '100px', height: '100px' }}>
                    <Avatar alt="user-default" src={avatarSrc} size={100} />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                        id="avatar-input"
                    />
                    <label htmlFor="avatar-input" className="avatar-overlay-profile">{"更换头像"}</label>
                </div>
            </Col>
            <Col span={10}>
                <Typography.Text className='user-name' >
                    {user && user.nickname}
                </Typography.Text>
                <Typography className='email' style={{ marginLeft: 10 }}>{user.sid ? user.sid : 'ID:522031910000'}</Typography>
                <Input.TextArea
                    className='description-input'
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder={"个人简介,最多128字"}
                    maxLength={128}
                    autoSize={{ maxRows: 5 }}
                    style={{ width: '100%', marginTop: '20px', marginLeft: 10 }}
                />
            </Col>
        </Row>
    );
};

function UserBlance({ user }) {

    const formatter = (value) => <CountUp end={value} separator="," decimals={2} />;

    return (
        <Col span={12}>
            <Statistic
                title="余额"
                value={user.balance}
                precision={2}
                formatter={formatter}
                prefix={<WalletOutlined />}
            />
        </Col>
    );
}

function ProfileButton({ clickChangePassword, clickLogout }) {
    return (
        <Col span={6} style={{ marginTop: '10px' }}>
            <Button type="default" onClick={clickChangePassword} style={{ marginRight: '10px' }}>修改密码</Button>
            <Button type="default" style={{ color: 'red' }} onClick={clickLogout}>登出</Button>
        </Col>
    );
};

export default function ProfilePage() {
    const [description, setDescription] = useState('我是简介~~');
    const [messageApi, contextHolder] = useMessage();
    const [user, setUser] = useState(null);
    const [avatarSrc, setAvatarSrc] = useState('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png');
    const [showModal, setShowModal] = useState(false);

    const handleOk = () => {
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const navigate = useNavigate();

    const checkLogin = async () => {
        let me = await getMe();
        if (!me) {
            navigate("/login");
        } else {
            setUser(me);
        }
    };

    useEffect(() => {
        checkLogin();
        // eslint-disable-next-line
    }, []);

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAvatarChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAvatarSrc(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleLogout = async () => {
        let res = await logout();
        handleBaseApiResponse(res, messageApi, () => navigate("/login"));
        navigate("/login");
        return;
    };

    const clickChangePassword = () => {
        setShowModal(true);
    };

    const clickLogout = () => {
        handleLogout();
    };

    return (
        user &&
        <PrivateLayout>
            {contextHolder}
            <Card className='user-card'>
                <UserCard avatarSrc={avatarSrc} handleAvatarChange={handleAvatarChange} user={user} description={description} handleDescriptionChange={handleDescriptionChange} />
                <Row style={{ marginTop: '30px', marginLeft: '5%' }}>
                    <ProfileButton clickChangePassword={clickChangePassword} clickLogout={clickLogout} />
                    <UserBlance user={user} />
                </Row>
                {showModal && <ChangePasswordModal onOk={handleOk} onCancel={handleCancel} user={user} />}
            </Card>
        </PrivateLayout >
    );
};