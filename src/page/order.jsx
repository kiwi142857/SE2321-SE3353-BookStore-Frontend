import { useEffect, useState } from "react";
import { Card } from "antd";
import { PrivateLayout } from "../components/layout";
import OrderTable from "../components/orderTable";
import { getOrders } from "../service/order";

export default function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const initOrders = async () => {
        let orders = await getOrders();
        setOrders(orders.orders);
        setTotal(orders.total);
    }

    useEffect(() => {
        initOrders();
    }, []);

    return <PrivateLayout>
        <Card style={{margin:'10px', marginTop:'20px'}}>
            <OrderTable orders={orders} setOrders={setOrders} total={total}/>
        </Card>
    </PrivateLayout>
}