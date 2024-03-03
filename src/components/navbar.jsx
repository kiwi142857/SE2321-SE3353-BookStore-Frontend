import { Col, Menu, Row, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    UserOutlined,
} from '@ant-design/icons';
import { useState } from "react";
import ChangePasswordModal from "./change_password_modal";


export default function NavBar({ user }) {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[parts.length - 1]; // The last part of the path

    const navItems = [  // Items in the navigation bar
        { label: "Home", value: "/home" },
        { label: "Cart", value: "/cart" },
        { label: "Order", value: "/order" },
        { label: "Rank", value: "/rank" },
    ];

    const navMenuItems = navItems.map(item => ({
        key: item.value,
        label: <Link className="navbar-font" to={item.value}>{item.label}</Link>
    }));

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Row className="navbar" justify="start" style={{margin:'15px', height:'50px', marginBottom:'0'}}>
            <Col flex='0.2'>
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
            <Col flex={2.5} style={{ marginRight: '3em', marginLeft: '0em' }}>
                <Link className="title-font" to="./home">Book store</Link>
            </Col>
            <Col flex="1" style={{ textAlign: 'right' }}>
                <Menu mode="horizontal"
                    defaultSelectedKeys={[selectedKey]}
                    items={navMenuItems}
                    selectedKeys={[selectedKey]}
                />
            </Col>
            {user===undefined && <Col>
                <Link to='./login'>
                    <Button shape="circle" icon={<UserOutlined />} />
                </Link>
            </Col>} 
            {user===undefined &&showModal && <ChangePasswordModal onOk={handleCloseModal} onCancel={handleCloseModal} />}
        </Row>
    );
}