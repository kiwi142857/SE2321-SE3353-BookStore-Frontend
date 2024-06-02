import React, { useEffect, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { DatePicker } from 'antd';
import { searchOrdersAdmin } from '../service/order';
import moment from 'moment';
import { getSalesRankList } from '../service/user';


import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { searchBooks, getBookById, postBook, deleteBook, getBooksBySalesRank } from '../service/book';
import { Upload } from 'antd';
import { handleBaseApiResponse } from "../utils/message";
import { get } from '../service/common';

const { RangePicker } = DatePicker;

export function UserSalesProtable() {

    const columns = [
        {
            title: 'ID', dataIndex: 'id', key: 'id',
            sorter: (a, b) => a.id - b.id,
            hideInSearch: true,
        },
        {
            title: '身份', dataIndex: 'role', key: 'role',
            sorter: (a, b) => a.role.localeCompare(b.role),
            hideInSearch: true,
            render: (_, record) => {
                if (record.role == 1) {
                    return '管理员';
                } else {
                    return '用户';
                }
            }
        },
        {
            title: '用户名', dataIndex: 'name', key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            hideInSearch: true,
        },
        {
            title: '邮箱', dataIndex: 'email', key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            hideInSearch: true,
        },
        {
            title: '选定时间范围内消费',
            dataIndex: 'consumeInTime',
            hideInSearch: true,
            render: (_, record) => {
                return (record.consumeInTime / 100).toFixed(2);
            }
        },
        {
            title: '余额', dataIndex: 'balance', key: 'balance',
            sorter: (a, b) => a.balance - b.balance,
            hideInSearch: true,
            // 由于余额是以分为单位的，所以需要除以100
            render: (_, record) => {
                return (record.balance / 100).toFixed(2);
            }
        },
        {
            title: '用户状态',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <>
                    {record.status === 0 ? '正常' : '禁用'}

                </>
            ),
            hideInSearch: true,
        },
        {
            title: '时间范围',
            dataIndex: 'dateRange',
            valueType: 'dateRange',
            hideInTable: true,
            search: {
                transform: (value) => {
                    return {
                        startTime: value[0] ? moment(value[0]).startOf('day').toISOString() : null,
                        endTime: value[1] ? moment(value[1]).endOf('day').toISOString() : null,
                    };
                },
            },
        },



    ];

    return (
        <>
            <ProTable
                columns={columns}
                request={async (params) => {
                    const { current, pageSize, startTime, endTime, ...rest } = params;
                    console.log('params', params);
                    const data = await getSalesRankList(current - 1, pageSize, startTime, endTime);
                    const total = data.total;
                    const users = data.users;
                    return {
                        data: users,
                        total: total,
                        success: true,
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
                headerTitle="Hot 热销榜"


            />

        </>
    );
}