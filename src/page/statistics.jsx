
import { Card } from "antd";
import { PrivateLayout } from "../components/layout";
import { Tabs } from 'antd';
import { useEffect, useState } from "react";
import { SalesProtable } from "../components/salesProtable";
import { UserSalesProtable } from "../components/userSalesProtable";
import { OrderDetailProtable} from "../components/orderDetailProtable";
import { getMe } from "../service/user";
const { TabPane } = Tabs;


export default function StatisticsPage() {

    const [activeTab, setActiveTab] = useState('myOrders');
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // check if user is admin, if so, sales and users tab will be shown
    const checkAdmin = async () => {
        let me = await getMe();
        console.log("me",me);
        if (!me) {
            return;
        } else {
            setUser(me);
            setIsAdmin(me.role != 0);
            setActiveTab('sales');
        }
    };

    useEffect(() => {
        checkAdmin();
        // eslint-disable-next-line
    }, []);


    return <PrivateLayout>
        <Card style={{ margin: '10px', marginTop: '20px' }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} centered size="large">
                {isAdmin && <TabPane tab="热销榜" key={"sales"}>
                    <SalesProtable />
                </TabPane>}

                {isAdmin && <TabPane tab="消费榜" key="users">
                    <UserSalesProtable />
                </TabPane>}

                <TabPane tab="消费情况" key="myOrders">
                    <OrderDetailProtable />
                </TabPane>
            </Tabs>
        </Card>
    </PrivateLayout>;
}