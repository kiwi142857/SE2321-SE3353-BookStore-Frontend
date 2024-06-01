
import { Card } from "antd";
import { PrivateLayout } from "../components/layout";
import { Tabs } from 'antd';
import ProTable from '@ant-design/pro-table';
import { useState } from "react";
import { BookManaProtable } from "../components/bookManaProtable";
import { UserManaProtable } from "../components/UserManaProtable";
import { OrderManaProtable } from "../components/OrderManaProtable";
const { TabPane } = Tabs;


export default function AdministratorPage() {

    const [activeTab, setActiveTab] = useState('books');

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