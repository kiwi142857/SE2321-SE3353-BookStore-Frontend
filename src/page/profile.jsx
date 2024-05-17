import React, { useState, useEffect } from 'react';
import { Avatar, Input, Row, Col, Typography, Card, Button, Statistic, message } from 'antd';
import useMessage from 'antd/es/message/useMessage';
import { WalletOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router';
import { getMe } from '../service/user';
import { logout } from '../service/logout';
import { handleBaseApiResponse } from '../utils/message';
import { PrivateLayout } from '../components/layout';
import ChangePasswordModal from '../components/changePasswordModal';
import { updateProfile } from '../service/user';
import '../css/global.css';

function UserCard({ avatarSrc, handleAvatarChange, user }) {

    const [messageApi, contextHolder] = useMessage();
    const [username, setUsername] = useState(user.name);
    const [description, setDescription] = useState(user.description);
    const handleCommit = async () => {
        const updatedUser = {
            name: username,
            description: description,
        };

        let res = await updateProfile(updatedUser);
        handleBaseApiResponse(res, messageApi);

    };

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
                <Input.TextArea
                    className='user-name'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={"名称，最多20字"}
                    maxLength={20}
                    autoSize={{ maxRows: 1 }}
                    style={{ width: '100%', marginTop: '20px', marginLeft: 10, marginBottom: 10}}
                />
                <Typography className='email' style={{ marginLeft: 10 }}>{user.sid ? user.sid : 'ID:522031910000'}</Typography>
                <Input.TextArea
                    className='description-input'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={"个人简介,最多128字"}
                    maxLength={128}
                    autoSize={{ maxRows: 5 }}
                    style={{ width: '100%', marginTop: '20px', marginLeft: 10 }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    size='medium'
                    style={{ width: '25%', marginTop: '10px', marginLeft: 10 }}
                    onClick={handleCommit}
                >
                    保存
                </Button>

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
                <UserCard avatarSrc={avatarSrc} handleAvatarChange={handleAvatarChange} user={user} />
                <Row style={{ marginTop: '30px', marginLeft: '5%' }}>
                    <ProfileButton clickChangePassword={clickChangePassword} clickLogout={clickLogout} />
                    <UserBlance user={user} />
                </Row>
                {showModal && <ChangePasswordModal onOk={handleOk} onCancel={handleCancel} user={user} />}
            </Card>
        </PrivateLayout >
    );
};