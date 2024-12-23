import { Table } from "antd";
import { formatTime } from "../utils/time";
import { List, Avatar } from "antd";
import { searchOrders } from "../service/order";
import { useState } from "react";
import React, { useEffect, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { DatePicker } from 'antd';
import { searchOrdersAdmin } from '../service/order';
import moment from 'moment';

const { RangePicker } = DatePicker;

export function OrderItemList({ orderItems }) {
    return <List
        dataSource={orderItems}
        renderItem={(item, _) => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar shape="square" size={80} src={`data:image/jpeg;base64,${item.book.coverContent}`} />}
                    title={item.book.title}
                    description={`数量：${item.number}`}
                />
            </List.Item>
        )}
    />;
}

export default function OrderTable({ orders, setOrders, total, setTotal }) {

    const columns = [
        {
            title: '订单号', dataIndex: 'id', key: 'id',
            sorter: (a, b) => a.id - b.id,
            hideInSearch: true,
        },
        {
            title: '收货人',
            dataIndex: 'receiver',
            key: 'receiver',
            sorter: (a, b) => a.receiver.localeCompare(b.receiver),
            hideInSearch: true,
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
        { title: '联系方式', dataIndex: 'tel', key: 'tel', hideInSearch: true, },
        { title: '收货地址', dataIndex: 'address', key: 'address', hideInSearch: true, },
        {
            title: '下单时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            valueType: 'dateRange',
            render: (_, record) => moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        },
    ];

    return <ProTable
        columns={columns}
        request={async (params) => {
            const { current, pageSize, createdAt, ...rest } = params;
            console.log('params', params);

            let startTime, endTime;
            if (createdAt && createdAt.length === 2) {
                startTime = moment(createdAt[0]).startOf('day').toISOString();
                endTime = moment(createdAt[1]).endOf('day').toISOString();
            } else {
                startTime = "2022-01-01T00:00:00Z";
                endTime = "2028-01-01T00:00:00Z";
            }
            console.log('startTime', startTime);
            console.log('endTime', endTime);
            const data = await searchOrders(rest.bookTitle || "", current, pageSize, startTime, endTime);
            const orders = data.orders;
            console.log('data', data);
            return {
                data: orders.map(order => ({
                    ...order,
                    key: order.id,
                })),
            };
        }}
        rowKey="id"
        search={{
            labelWidth: 'auto',
        }}
        pagination={{
            pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="订单管理"
    />;

}