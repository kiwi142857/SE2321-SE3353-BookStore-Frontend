import { Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import NavBar from "./navbar";
import { Link } from "react-router-dom";
import '../css/global.css';
import { getMe } from "../service/user";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";


function PageFooter() {
    return (
        <Footer className="footer">
            <Space direction="vertical">
                <div>
                    <Link className="bottom-link-font" target="_blank" to="https://github.com/kiwi142857">关于作者 </Link>
                    {'|'}
                    <Link className="bottom-link-font" target="_blank" to="https://kiwi142857.github.io/kiwi142857.githhub.io/">  作者博客</Link>
                </div>
                <div>
                    <Link to='/' color="#003a8c">BookStore Demo</Link>
                </div>
            </Space>
        </Footer>
    );
}

// Layout for the whole website
export function BasicLayout({ children }) {
    return (
        <Layout className="basic-layout">
            <Header className="header" ><NavBar className="navbar" user={null} /></Header>
            <Content>
                {children}
            </Content>
            <PageFooter />
        </Layout>
    );
}


export function PrivateLayout({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const checkLogin = async () => {
        let me = await getMe();
        if (!me) {
            navigate("/login");
        } else {
            setUser(me);
        }
    }

    useEffect(() => {
        checkLogin();
        // eslint-disable-next-line
    }, []);

    /* console.log(user); */
    return (
        <Layout className="basic-layout">
            <Header className="header"><NavBar user={user} /></Header>
            <Content>
                {user && children}
            </Content>
            <PageFooter />
        </Layout>
    );
}