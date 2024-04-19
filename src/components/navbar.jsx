import { Col, Menu, Row } from "antd";
import { Link, useLocation } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';


export default function NavBar({ user }) {

    const location = useLocation();
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[1]; // The last part of the path
    console.log(selectedKey);
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
                <Link to="/profile" className="nav-profile">
                    <UserOutlined />
                </Link>
            </Col>}
        </Row>
    );
}