
import { Card } from "antd";
import { PrivateLayout } from "../components/layout";
import { Tabs } from 'antd';
import ProTable from '@ant-design/pro-table';
import { useState } from "react";
const { TabPane } = Tabs;


export default function AdministratorPage() {

    const [activeTab, setActiveTab] = useState('books');

    return <PrivateLayout>
        <Card style={{ margin: '10px', marginTop: '20px' }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} centered size="large"> 
                <TabPane tab="书籍管理" key="books">
                    <ProTable
                    // ...
                    />
                </TabPane>

                <TabPane tab="用户管理" key="users">
                    <ProTable
                    // ...
                    />
                </TabPane>

                <TabPane tab="订单管理" key="orders">
                    <ProTable
                    // ...
                    />
                </TabPane>
            </Tabs>
        </Card>
    </PrivateLayout>;
}