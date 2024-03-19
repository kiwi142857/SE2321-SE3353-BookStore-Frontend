import { Button, Card, Checkbox } from "antd";
import { PrivateLayout } from "../components/layout";
import { useEffect, useState } from "react";
import { getCartItems } from "../service/cart";
import { Table, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { InputNumber } from "antd";
import CountUp from 'react-countup';
import { Statistic } from 'antd';
import useMessage from "antd/es/message/useMessage";
import { changeCartItemNumber, deleteCartItem } from "../service/cart";
import { handleBaseApiResponse } from "../utils/message";
import { message } from "antd";

function CartTable({ cartItems, setCartItems, onMutate }) {

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'This is a success message',
        });
      };
    
      const error = () => {
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
      };

    const [messageApi, contextHolder] = useMessage();
    const [items, setItems] = useState(cartItems);
    const [showModal, setShowModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleNumberChange = async (id, number) => {
        await changeCartItemNumber(id, number);
        setItems(items.map(item => item.id === id ? { ...item, number } : item));
        setSelectedItems(selectedItems.map(item => item.id === id ? { ...item, number } : item));
    };

    useEffect(() => {
        setItems(cartItems);
    }, [cartItems]);

    useEffect(() => {

        setItems(items);
    }, [items]);

    const computeTotalPrice = () => {

        const prices = selectedItems.map(item => (item.book.price * ((item.book.discount === undefined) ? 0.7 : item.book.discount)) * item.number);
        return prices.length > 0 ?
            prices.reduce((prev, cur) => prev + cur) / 100 : 0;
    };

    const columns = [
        {
            title: '书名', dataIndex: 'book', key: 'bookTitle',
            render: (book) => <Link to={`/book/${book.id}`}>{book.title}</Link>,
        },
        {
            title: '单价', dataIndex: 'book', key: 'bookPrice',
            render: (book) => (book.price / 100 * (book.discount === undefined ? 0.7 : book.discount)).toFixed(2),
        },
        {
            title: '数量', dataIndex: 'number', key: 'quantity',
            render: (number, item) => <InputNumber min={1} defaultValue={number} value={item.value} onChange={(newNumber) => {
                handleNumberChange(item.id, newNumber);
            }} />
        },
        {
            title: '小计', dataIndex: 'book', key: 'subtotal',
            render: (book, item) => (book.price / 100 * (book.discount === undefined ? 0.7 : book.discount) * item.number).toFixed(2),
        },
    ];

    useEffect(() => {
        computeTotalPrice();
    }, [selectedItems]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedItems(selectedRows);
        },
    };


    const formatter = (value) => <CountUp end={value} separator="," decimals={2} />;
    /* console.log('book.discount', cartItems[0].book.discount) */;
    return (
        <>
            <Table rowSelection={rowSelection}
                columns={columns}
                dataSource={items.map(item => ({
                    ...item,
                    key: item.id
                }))}
            />
            <Card style={{ margin: '10px' }}>
                <Row>
                    <Col span={12}>
                        <Button type="primary" onClick={async () => {
                            if (selectedItems.length === 0) {
                                messageApi.error('请选择要删除的商品');
                                return;
                            }
                            const newItems = items.filter(item => !selectedItems.some(selectedItem => selectedItem.id === item.id));
                            const id = selectedItems.map(item => item.id);
                            let res;
                            for (const id of selectedItems.map(item => item.id)) {
                                const res = await deleteCartItem(id);
                                success();
                            }
                            /* handleBaseApiResponse(res, '删除成功'); */

                            setItems(newItems);
                            setSelectedItems([]);
                            setCartItems(newItems);
                        }}>删除选中书籍</Button>
                        {/* 购买选中书籍 */}
                        <Button type="primary" style={{ marginLeft: '10px' }} onClick={() => {
                            if (selectedItems.length === 0) {
                                messageApi.error('请选择要购买的商品');
                                return;
                            }
                            const newItems = items.filter(item => !selectedItems.some(selectedItem => selectedItem.id === item.id));
                            const id = selectedItems.map(item => item.id);
                            let res;
                            for (const id of selectedItems.map(item => item.id)) {
                                success();
                            }
                            /* handleBaseApiResponse(res, '删除成功'); */

                            setItems(newItems);
                            setSelectedItems([]);
                            setCartItems(newItems);
                        }}>购买选中书籍</Button>
                    </Col>
                    <Col span={12}>
                        <Statistic title="总价" value={computeTotalPrice()} precision={2} formatter={formatter} />
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    const initCartItems = async () => {
        let cartItems = await getCartItems();
        setCartItems(cartItems);
    };

    useEffect(() => {
        initCartItems();
    }, []);


    return (
        <PrivateLayout>
            <Card style={{ margin: '10px', marginTop: '20px' }}>
                <CartTable cartItems={cartItems} setCartItems={setCartItems} onMutate={initCartItems} />
            </Card>
        </PrivateLayout>
    );
}