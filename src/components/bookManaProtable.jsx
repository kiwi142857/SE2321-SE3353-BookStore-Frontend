// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Modal, Form, Input, InputNumber, Row, Col, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { searchBooksAdmin, getBookById, postBook, deleteBook } from '../service/book';
import { Upload } from 'antd';
import { uploadFile } from '../service/uploadFile';
import { handleBaseApiResponse } from "../utils/message";


function BookEditModal({ isModalVisible, handleCancel, form, currentRow, actionRef }) {

    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        setImageUrl(`data:image/jpeg;base64,${form.getFieldValue('coverContent')}`);
    }, [form.getFieldValue('coverContent')]);

    async function handleOk() {
        form.validateFields()
            .then(async (values) => {
                // 两个参数一个id,一个book
                values.tags = values.tag.split(' ');
                console.log("in fun handleOk");

                values.cover = values.title + '.jpg';
                const res = await postBook(values.id, values);

                handleBaseApiResponse(res, message, () => {
                    console.log('Book posted successfully');
                    actionRef.current.reload();
                    handleCancel();
                }, () => {
                    handleCancel();
                    console.log('Failed to post book');
                });
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    /* const handleFileChange = async (event) => {
        console.log('handleFileChange');
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            try {
                const data = await uploadFile('/api/image/upload', file);
                console.log('Upload successfully:', data);
                form.setFieldsValue({ cover: data.imageUrl }); // 假设返回的 data 中有一个 imageUrl 字段包含了图片的 URL
            } catch (error) {
                console.error('Upload failed:', error);
                message.error('Upload failed');
            }
        }
    }; */
    const handleFileChange = async (event) => {
        console.log('handleFileChange');
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result.split(',')[1]; // 获取 Base64 编码的图片数据
                form.setFieldsValue({ coverContent: base64Image }); // 将 Base64 编码的数据存储在表单字段中
                setImageUrl(reader.result); // 显示图片
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <Modal title="修改书籍" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout="vertical">
                <Row gutter={16}>

                    <Col span={6}>
                        <Form.Item name="coverContent" label="封面" rules={[{ required: true }]} hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item label="封面">
                            <div style={{ position: 'relative', marginTop: '20%', width: '100px', height: '100px' }}>
                                {imageUrl ? (
                                    <img src={imageUrl} alt="cover" style={{ width: '100%' }} />
                                ) : (
                                    <PlusOutlined />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    id="cover-input"
                                />
                                <label htmlFor="cover-input" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}></label>
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="id" label="ID" rules={[{ required: true }]} hidden>
                            <Input disabled />
                        </Form.Item>

                        <Form.Item name="title" label="书名" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="author" label="作者" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="描述" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="isbn" label="ISBN" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="printYear" label="印刷年份" rules={[{ required: true }]}>
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="price" label="价格" rules={[{ required: true }]}>
                            <InputNumber
                                min={0}
                                formatter={value => `￥ ${value ? (value / 100).toFixed(2) : 0}`}
                                parser={value => value ? value.replace(/￥\s?|(,*)/g, '') * 100 : 0}
                            />
                        </Form.Item>
                        <Form.Item name="discount" label="折扣" rules={[{ required: true }]}>
                            <InputNumber min={1} max={10} />
                        </Form.Item>
                        <Form.Item name="sales" label="销量" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item name="tag" label="标签" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="stock" label="库存" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="fiveStarNumber" label="五星数" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item name="fourStarNumber" label="四星数" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item name="threeStarNumber" label="三星数" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item name="twoStarNumber" label="二星数" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item name="oneStarNumber" label="一星数" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export function BookManaProtable() {
    console.log('BookManaProtable');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const [form] = Form.useForm();

    const actionRef = useRef();

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            hideInSearch: true,
        },
        {
            title: '封面',
            dataIndex: 'coverContent',
            valueType: 'image',
            hideInSearch: true,
            render: (_, record) => (
                <img
                    src={`data:image/jpeg;base64,${record.coverContent}`}
                    alt={record.title}
                    style={{ width: '50px', height: 'auto' }}
                />
            ),
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
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        修改
                    </Button>
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} style={{ marginLeft: '10px', color: 'red' }}>
                        删除
                    </Button>
                </>
            ),
        },

    ];

    const handleEdit = async (record) => {
        setCurrentRow(record);
        const book = await getBookById(record.id);
        // 将 book.tags 数组转换为用空格拼接的字符串
        const tagsString = book.tags.join(' ');
        // 设置表单字段的初始值
        form.setFieldsValue({ ...book, tag: tagsString });

        // setImageUrl(`data:image/jpeg;base64,${book.coverContent}`);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleNew = () => {
        form.resetFields(); // 清空表单
        form.setFieldsValue({ id: -1 });
        setIsModalVisible(true); // 打开模态框
    };

    const handleDelete = async (record) => {
        // 这里添加删除记录的代码
        const res = await deleteBook(record.id);
        handleBaseApiResponse(res, message, () => {
            // 在这里添加成功的回调函数
            console.log('Book deleted successfully');
            actionRef.current.reload();
        }, () => {
            // 在这里添加失败的回调函数
            console.log('Failed to delete book');
        });
        // 重新加载数据
        actionRef.current.reload();
    };

    return (
        <>
            <ProTable
                columns={columns}
                request={async (params) => {
                    const { current, pageSize, ...rest } = params;
                    console.log('params', params);
                    const data = await searchBooksAdmin(rest.title || "", current - 1, pageSize, "title");
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

                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={handleNew}>
                        新建
                    </Button>
                ]}
                actionRef={actionRef}
            />
            <BookEditModal isModalVisible={isModalVisible} handleCancel={handleCancel} form={form} currentRow={currentRow} actionRef={actionRef} />
        </>
    );
}