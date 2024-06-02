import React, { useEffect, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { DatePicker } from 'antd';
import { searchOrdersAdmin } from '../service/order';
import moment from 'moment';


import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { searchBooks, getBookById, postBook, deleteBook } from '../service/book';
import { Upload } from 'antd';
import { handleBaseApiResponse } from "../utils/message";

const { RangePicker } = DatePicker;

export function SalesProtable() {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            hideInSearch: true,
        },
        {
            title: '封面',
            dataIndex: 'cover',
            valueType: 'image',
            hideInSearch: true,
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            hideInSearch: true,
        },
        {
            title: '书名',
            dataIndex: 'title',
        },
        {
            title: '作者',
            dataIndex: 'author',
            hideInSearch: true,
        },
        {
            title: '销量',
            dataIndex: 'sales',
            hideInSearch: true,
        },
        {
            title: '价格',
            dataIndex: 'price',
            hideInSearch: true,
            // 由于价格是以分为单位的，所以需要转换为元
            render: (_, record) => (record.price / 100).toFixed(2),
        },
        {
            title: '库存',
            dataIndex: 'stock',
            hideInSearch: true,
        },
        
        
        

    ];

    return (
        <>
            <ProTable
                columns={columns}
                request={async (params) => {
                    const { current, pageSize, ...rest } = params;
                    console.log('params', params);
                    const data = await searchBooks(rest.title || "", current - 1, pageSize, "title");
                    console.log('data', data);
                    return {
                        data: data.bookList.map(book => ({
                            ...book,
                            key: book.id
                        })),
                        total: data.total,
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
                headerTitle="书籍管理"

               
            />
            
        </>
    );
}