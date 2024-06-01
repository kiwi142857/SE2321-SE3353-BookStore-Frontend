
import { Card } from "antd";
import { PrivateLayout } from "../components/layout";
import { Tabs } from 'antd';
import ProTable from '@ant-design/pro-table';
import { useState } from "react";
import { BookManaProtable } from "../components/bookManaProtable";
import { UserManaProtable } from "../components/UserManaProtable";
import { OrderManaProtable } from "../components/OrderManaProtable";
const { TabPane } = Tabs;


export default function StatisticsPage() {

    const [activeTab, setActiveTab] = useState('sales');

    return <PrivateLayout>
        <Card style={{ margin: '10px', marginTop: '20px' }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} centered size="large"> 
                <TabPane tab="热销榜" key={"sales"}>
                    <BookManaProtable />
                </TabPane>

                <TabPane tab="消费榜" key="users">
                    <UserManaProtable />
                </TabPane>

                <TabPane tab="消费情况" key="myOrders">
                    <OrderManaProtable />
                </TabPane>
            </Tabs>
        </Card>
    </PrivateLayout>;
}