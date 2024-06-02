import React, { useEffect, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { DatePicker, Divider } from 'antd';
import { searchOrdersAdmin } from '../service/order';
import moment from 'moment';

const { RangePicker } = DatePicker;

export function OrderManaProtable() {

    const columns = [
        {
            title: '订单号', dataIndex: 'id', key: 'id',
            sorter: (a, b) => a.id - b.id,
            hideInSearch: true,
        },
        {
            title: '用户ID', dataIndex: 'userId', key: 'userId',
            sorter: (a, b) => a.userId - b.userId,
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
            title: '书本详情',
            key: 'booktitle',
            render: (text, record) => {
                let totalAmount = 0;
                return (
                    <div>
                        {record.items.map(item => {
                            const subtotal = item.book.price /100 * item.number * (item.book.discount / 10);
                            totalAmount += subtotal;
                            return (
                                <div key={item.id}>
                                    <div>书名: {item.book.title}</div>
                                    <div>数量: {item.number}</div>
                                    <div>小计: {subtotal.toFixed(2)}</div>
                                    <Divider />
                                </div>
                            );
                        })}
                        <div>总金额: {totalAmount.toFixed(2)}</div>
                    </div>
                );
            }
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
            const data = await searchOrdersAdmin(rest.bookTitle || "", current, pageSize, startTime, endTime);
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