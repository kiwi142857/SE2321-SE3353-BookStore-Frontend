import { Button, Card } from "antd";
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
import { createWebSocketConnection } from "../service/websocket";
import { handleBaseApiResponse } from "../utils/message";

function CartTable({ cartItems, setCartItems, messageApi, setShowModal, setSelectedItems, selectedItems, totalItems, setTotalItems }) {

    const columns = [
        {
            title: '书名', dataIndex: 'book', key: 'bookTitle',
            render: (book) => <Link to={`/book/${book.id}`}>{book.title}</Link>,
        },
        {
            title: '单价', dataIndex: 'book', key: 'bookPrice',
            render: (book) => (book.price / 1000 * (book.discount === undefined ? 7 : book.discount)).toFixed(2),
        },
        {
            title: '数量', dataIndex: 'number', key: 'quantity',
            render: (number, item) => <InputNumber min={1} defaultValue={number} value={item.value} onChange={(newNumber) => {
                handleNumberChange(item.id, newNumber);
            }} />
        },
        {
            title: '小计', dataIndex: 'book', key: 'subtotal',
            render: (book, item) => (book.price / 1000 * (book.discount === undefined ? 7 : book.discount) * item.number).toFixed(2),
        },
    ];



    const handleNumberChange = async (id, number) => {
        await changeCartItemNumber(id, number);
        setCartItems(cartItems.map(item => item.id === id ? { ...item, number } : item));
        setSelectedItems(selectedItems.map(item => item.id === id ? { ...item, number } : item));
    };

    const [currentPage, setCurrentPage] = useState(1);

    const computeTotalPrice = () => {
        const prices = selectedItems.map(item => (item.book.price * ((item.book.discount === undefined) ? 7 : item.book.discount)) * item.number / 10);
        return prices.length > 0 ?
            prices.reduce((prev, cur) => prev + cur) / 100 : 0;
    };

    useEffect(() => {
        computeTotalPrice();
    }, [selectedItems]);

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
                pagination={{
                    current: currentPage,
                    total: totalItems,
                    pageSize: 10,
                    onChange: async (page, pageSize) => {
                        setCurrentPage(page);
                        const cartItems = await getCartItems(page, pageSize);
                        setCartItems(cartItems.cartItems);
                        setTotalItems(cartItems.total);
                        console.log('totalItems', cartItems.total);
                    },
                }}
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
    const [totalItems, setTotalItems] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [socket, setSocket] = useState(null);

    const initCartItems = async () => {
        let cartItems = await getCartItems();
        console.log('cartItems', cartItems);
        setCartItems(cartItems.cartItems);
        setTotalItems(cartItems.total);
    };

    useEffect(() => {
        initCartItems();
    }, []);

    /**
    * WebSocket连接建立后，处理来自服务器的消息
    */
    useEffect(() => {
        if (socket) {
            // 新的WebSocket连接被创建
            // 处理来自服务器的消息
            socket.onmessage = (event) => {
                console.log('WebSocket message: ', event.data);
                const message = JSON.parse(event.data);
                handleBaseApiResponse(message, messageApi);
                if (message.ok === true) {
                    console.log('WebSocket message: ', message);
                } else {
                    console.error('WebSocket message: ', message);
                }
                // Close the WebSocket connection
                // TODO: 测试用先关闭断开连接的操作，后续开启断开操作
                // socket.close();
            };
            socket.onerror = (error) => {
                console.error('WebSocket Error: ', error);
            };
        }
    }, [socket]);

    const handleCloseModal = () => {
        initCartItems();
        setShowModal(false);
    };

    const createWebSocketConnectionForOrder = async (orderId) => {
        console.log("WebSocketConnection start: ", orderId);
        try {
            const socket_ = await createWebSocketConnection(orderId);
            setSocket(socket_);
            console.log("WebSocketConnection: ", socket_);
        } catch (error) {
            console.error(error);
        }
    };

    const modalProps = {
        setShowModal,
        onMutate: initCartItems,
        messageApi,
        onCancel: handleCloseModal,
        onOk: handleCloseModal,
        selectedItems,
        setSelectedItems,
        handleCloseModal,
        createWebSocketConnectionForOrder
    };

    const cartTableProps = {
        cartItems,
        setCartItems,
        onMutate: initCartItems,
        messageApi,
        setShowModal,
        selectedItems,
        setSelectedItems,
        totalItems,
        setTotalItems
    };

    return (
        <PrivateLayout>
            {contextHolder}
            {showModal && <PlaceOrderModal {...modalProps} />}
            <Card style={{ margin: '10px', marginTop: '20px' }}>
                <CartTable {...cartTableProps} />
            </Card>
        </PrivateLayout>
    );
}