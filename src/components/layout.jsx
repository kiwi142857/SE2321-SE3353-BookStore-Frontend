import { Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import NavBar from "./navbar";
import { Link } from "react-router-dom";
import '../css/global.css';

// Layout for the whole website
export function BasicLayout({ children }) {
    return (
        <Layout className="basic-layout">
            <Header className="header"><NavBar className="navbar" user={null} /></Header>
            <Content>
                {children}
            </Content>
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
        </Layout>
    );
}
