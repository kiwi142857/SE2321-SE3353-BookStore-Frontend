import React, { useEffect, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { getUserList, toggleUserStatus } from '../service/user';
import { render } from '@testing-library/react';
import { Button, message } from 'antd';
import { handleBaseApiResponse } from '../utils/message';


export function UserManaProtable() {

    const actionRef = useRef();
    const handleToggleStatus = async (record) => {
        // 这里添加切换用户状态的代码

        const res = await toggleUserStatus(record.id);
        console.log(`Toggling status for user with id ${record.id}`);
        // 重新加载数据
        handleBaseApiResponse(res, message, () => {
            console.log('User status toggled successfully');

            actionRef.current.reload();

        }, () => {
            console.log('Failed to toggle user status');
        });
    };

    const columns = [
        {
            title: 'ID', dataIndex: 'id', key: 'id',
            sorter: (a, b) => a.id - b.id,
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
        },
        {
            title: '邮箱', dataIndex: 'email', key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            hideInSearch: true,
        },
        /* {
            title: '电话号码', dataIndex: 'tel', key: 'tel',
            sorter: (a, b) => a.tel.localeCompare(b.tel),
            hideInSearch: true,
        },
        {
            title: '注册时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            valueType: 'dateRange',
        }, */
        {
            title: '简介', dataIndex: 'description', key: 'description',
            hideInSearch: true,
        },
        {
            title: '用户状态',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <>
                    {record.status === 0 ? '正常' : '禁用'}
                    <Button onClick={() => handleToggleStatus(record)} style={{ marginLeft: '10px', color: 'red' }} >
                        {record.status === 0 ? '封禁' : '解禁'}
                    </Button>
                </>
            ),
        },
    ];

    return <ProTable
        columns={columns}
        request={async (params) => {
            const { current, pageSize, ...rest } = params;
            const data = await getUserList(current, pageSize, rest.username, rest.id);
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
        actionRef={actionRef}
    />;
}