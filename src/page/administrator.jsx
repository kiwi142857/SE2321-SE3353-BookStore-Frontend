// @ts-nocheck

import { Card } from "antd";
import { PrivateLayout } from "../components/layout";
import { Tabs } from 'antd';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { BookManaProtable } from "../components/bookManaProtable";
import { UserManaProtable } from "../components/UserManaProtable";
import { OrderManaProtable } from "../components/OrderManaProtable";
import { getMe } from "../service/user";
const { TabPane } = Tabs;


export default function AdministratorPage() {

    const [activeTab, setActiveTab] = useState('books');

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const checkLogin = async () => {
        let me = await getMe();

        if (!me) {
            navigate("/login");
        } else {
            setUser(me);
        }
        if (me.role != 1) {
            navigate("/home");
        }
    }

    useEffect(() => {
        checkLogin();
        // eslint-disable-next-line
    }, []);



    // @ts-ignore
    return <PrivateLayout>
        <Card style={{ margin: '10px', marginTop: '20px' }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} centered size="large">
                <TabPane tab="书籍管理" key="books">
                    <BookManaProtable />
                </TabPane>

                <TabPane tab="用户管理" key="users">
                    <UserManaProtable />
                </TabPane>

                <TabPane tab="订单管理" key="orders">
                    <OrderManaProtable />
                </TabPane>
            </Tabs>
        </Card>
    </PrivateLayout>;
}