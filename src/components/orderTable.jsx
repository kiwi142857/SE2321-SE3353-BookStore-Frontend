import { Table } from "antd";
import { formatTime } from "../utils/time";
import { List, Avatar } from "antd";

export function OrderItemList({ orderItems }) {
    return <List
        dataSource={orderItems}
        renderItem={(item, _) => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar shape="square" size={80} src={item.book.cover} />}
                    title={item.book.title}
                    description={`数量：${item.number}`}
                />
            </List.Item>
        )}
    />;
}

export default function OrderTable({ orders }) {
    const columns = [
        { title: '订单号', dataIndex: 'id', key: 'id', 
        sorter: (a, b) => a.id - b.id, },
        {
            title: '收货人',
            dataIndex: 'receiver',
            key: 'receiver',
            sorter: (a, b) => a.receiver.localeCompare(b.receiver),
        },
        {
            title: '书本名称',
            key: 'bookTitle',
            render: (text, record) => (
                <div>
                    {record.items.map(item => <div key={item.id}>{item.book.title}</div>)}
                </div>
            ),
        },
        { title: '联系方式', dataIndex: 'tel', key: 'tel', },
        { title: '收货地址', dataIndex: 'address', key: 'address', },
        {
            title: '下单时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (time) => formatTime(time),
            filters: [
                { text: 'Last 10 minutes', value: '0.007' },
                { text: 'Last 24 hours', value: '24' },
                { text: 'Last 7 days', value: '7' },
                { text: 'Last 30 days', value: '30' },
            ],
            onFilter: (value, record) => {
                const days = (new Date() - new Date(record.createdAt)) / (1000 * 60 * 60 * 24);
                return days <= value;
            },
        },
    ];
    
    return <Table style={{ textAlign: 'left' }}
        columns={columns}
        expandable={{
            expandedRowRender: (order) => (
                <OrderItemList orderItems={order.items} />
            ),
        }}
        dataSource={orders.map(order => ({
            ...order,
            key: order.id,
        }))}
    />;
}