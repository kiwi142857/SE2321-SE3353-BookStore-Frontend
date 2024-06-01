import { Table } from "antd";
import { formatTime } from "../utils/time";
import { List, Avatar } from "antd";
import { getOrders } from "../service/order";
import { useState } from "react";


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

export default function OrderTable({ orders, setOrders, total, setTotal }) {

    const [currentPage, setCurrentPage] = useState(1);  
    // 获取所有的书本名称
    const bookTitles = [...new Set(orders.flatMap(order => order.items.map(item => item.book.title)))];

    // 创建过滤器数组
    const bookTitleFilters = bookTitles.map(title => ({ text: title, value: title }));

    const columns = [
        {
            title: '订单号', dataIndex: 'id', key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: '收货人',
            dataIndex: 'receiver',
            key: 'receiver',
            sorter: (a, b) => a.receiver.localeCompare(b.receiver),
        },
        {
            title: '书本名称',
            key: 'bookTitle',
            filters: bookTitleFilters,
            onFilter: (value, record) => record.items.some(item => item.book.title === value),
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
                { text: '最近十分钟', value: '0.007' },
                { text: '最近一天内', value: '1' },
                { text: '最近一周内', value: '7' },
                { text: '最近一个月', value: '30' },
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
        pagination={{
            current: currentPage,
            total: total,
            pageSize: 10,
            onChange: async(page, pageSize) => {
                setCurrentPage(page);
                const orders = await getOrders(page, pageSize);
                setOrders(orders.orders);
                setTotal(orders.total);
            },
        }}
    />;
}