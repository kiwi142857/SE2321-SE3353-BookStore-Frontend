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
import PlaceOrderModal from "../components/placeOrder";

function CartTable({ cartItems, setCartItems, onMutate, messageApi, setShowModal, setSelectedItems, selectedItems }) {

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

    const handleNumberChange = async (id, number) => {
        await changeCartItemNumber(id, number);
        setCartItems(cartItems.map(item => item.id === id ? { ...item, number } : item));
        setSelectedItems(selectedItems.map(item => item.id === id ? { ...item, number } : item));
    };

    const computeTotalPrice = () => {
        const prices = selectedItems.map(item => (item.book.price * ((item.book.discount === undefined) ? 0.7 : item.book.discount)) * item.number);
        return prices.length > 0 ?
            prices.reduce((prev, cur) => prev + cur) / 100 : 0;
    };

    useEffect(() => {
        computeTotalPrice();
    }, [selectedItems]);

    // 选择行
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedItems(selectedRows);
        },
    };

    // 显示总价的格式
    const formatter = (value) => <CountUp end={value} separator="," decimals={2} />;

    const handleDelete = async () => {
        if (selectedItems.length === 0) {
            messageApi.error('请选择要删除的商品');
            return;
        }
        const newCartItems = cartItems.filter(item => !selectedItems.some(selectedItem => selectedItem.id === item.id));
        for (const id of selectedItems.map(item => item.id)) {
            const res = await deleteCartItem(id);
            console.log('res', res);
            if (res.ok) {
                messageApi.success('删除成功');
            }
            else {
                messageApi.error('删除失败');
            }
        }
        setCartItems(newCartItems);
        setSelectedItems([]);
    };

    const handleBuy = async () => {
        if (selectedItems.length === 0) {
            messageApi.error('请选择要购买的商品');
            return;
        }
        console.log('selectedItems', selectedItems);
        setShowModal(true);
    };

    return (
        <>
            <Table rowSelection={rowSelection}
                columns={columns}
                dataSource={cartItems.map(item => ({
                    ...item,
                    key: item.id
                }))}
            />
            <Card style={{ margin: '10px' }}>
                <Row>
                    <Col span={12}>
                        <Button type="primary" onClick={handleDelete}>删除选中书籍</Button>
                        <Button type="primary" style={{ marginLeft: '10px' }} onClick={handleBuy}>购买选中书籍</Button>
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

    const [messageApi, contextHolder] = useMessage();
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const initCartItems = async () => {
        let cartItems = await getCartItems();
        setCartItems(cartItems);
    };

    useEffect(() => {
        initCartItems();
    }, []);

    const handleCloseModal = () => {
        initCartItems();
        setShowModal(false);
    };

    return (
        <PrivateLayout>
            {contextHolder}
            {showModal && <PlaceOrderModal setShowModal={setShowModal} onMutate={initCartItems} messageApi={messageApi} onCancel={handleCloseModal} onOk={handleCloseModal}
                selectedItems={selectedItems} setSelectedItems={setSelectedItems} handleCloseModal={handleCloseModal}/>}
            <Card style={{ margin: '10px', marginTop: '20px' }}>
                <CartTable cartItems={cartItems} setCartItems={setCartItems} onMutate={initCartItems} messageApi={messageApi} setShowModal={setShowModal}
                    selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            </Card>
        </PrivateLayout>
    );
}