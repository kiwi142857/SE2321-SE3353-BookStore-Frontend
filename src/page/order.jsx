import { useEffect, useState } from "react";
import { Card } from "antd";
import { PrivateLayout } from "../components/layout";
import OrderTable from "../components/orderTable";
import { getOrders } from "../service/order";

export default function OrderPage() {
    const [orders, setOrders] = useState([]);

    const initOrders = async () => {
        let orders = await getOrders();
        setOrders(orders);
    }

    useEffect(() => {
        initOrders();
    }, []);

    return <PrivateLayout>
        <Card style={{margin:'10px', marginTop:'20px'}}>
            <OrderTable orders={orders} />
        </Card>
    </PrivateLayout>
}