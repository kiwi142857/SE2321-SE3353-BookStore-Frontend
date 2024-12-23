import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Row, Col, Typography, Image, Divider, Card, Space, Rate, Button } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useMessage from "antd/es/message/useMessage";
import { PrivateLayout } from "../components/layout";
import { getBookById, getBookComments } from "../service/book";
import { getCartItems, addCartItem } from "../service/cart";
import { handleBaseApiResponse } from "../utils/message";
import BookTags from "../components/bookTag";
import PlaceOrderModal from "../components/placeOrder";
import CommentArea from "../components/bookComment";
import { getBookRate, rateBook } from "../service/book";
const { Paragraph } = Typography;

function BookInfo({ book }) {
    return (
        <div>
            <Typography.Title level={1}>{book.title}</Typography.Title>
            <Divider orientation="left"> 基本信息 </Divider>
            <Typography.Text>作者：{book.author}</Typography.Text>
            <Divider orientation="left"> 作品简介 </Divider>
            <Typography.Text>{book.description}</Typography.Text>
        </div>
    );
}

function BookDiscount({ book }) {
    const discount = book.discount || 7;
    return (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ backgroundColor: "#fcfaf7", padding: "20px", width: "100%", borderRadius: '20px' }}>
                <Paragraph style={{ marginBottom: 0 }} type="secondary">抢购价</Paragraph>
                <Space>
                    <div style={{ color: "#dd3735", fontSize: "16px" }}>¥</div>
                    <div style={{ color: "#dd3735", fontSize: "30px" }}>{(book.price / 1000 * discount).toFixed(2)}</div>
                    <div style={{ color: "#dd3735", fontSize: "18px" }}>({discount}折)</div>
                </Space>
                <Space style={{ marginLeft: 10 }}>
                    <div style={{
                        backgroundColor: "#f48484",
                        padding: "0px 4px 0px 4px",
                        borderRadius: "5px",
                        color: "white"
                    }}>店铺促销</div>
                    <Paragraph style={{ marginBottom: 0 }} type="secondary">满¥38减¥3,满¥48减¥5</Paragraph>
                </Space>
                <Space>
                    <ExclamationCircleOutlined />
                    <Paragraph style={{ marginBottom: 0 }} type="secondary">部分促销不可共享，请以购物车能享受的促销为准</Paragraph>
                </Space>
            </div>

        </Space>
    );
}


function BookRate({ book, handleRateBook }) {

    const numberOfFiveStar = book.fiveStarNumber;
    const numberOfFourStar = book.fourStarNumber;
    const numberOfThreeStar = book.threeStarNumber;
    const numberOfTwoStar = book.twoStarNumber;
    const numberOfOneStar = book.oneStarNumber;
    const numberInTotal = numberOfFiveStar + numberOfFourStar + numberOfThreeStar + numberOfTwoStar + numberOfOneStar;
    const rateOfBook = numberInTotal === 0 ? 0 : ((numberOfFiveStar * 5 + numberOfFourStar * 4 + numberOfThreeStar * 3 + numberOfTwoStar * 2 + numberOfOneStar) / numberInTotal).toFixed(1);

    // 获取用户对书籍的评分
    const [rate, setRate] = useState(0);
    const [isRated, setIsRated] = useState(false);
    const [messageApi] = useMessage();
    useEffect(() => {
        const getRate = async () => {
            let rate = await getBookRate(book.id);
            if (rate !== null) {
                setRate(rate.rate);
                setIsRated(true);
            }
        };
        getRate();
    }, [book.id]);

    const handleRateChange = async (value) => {
        const result = await rateBook(book.id, value);
        console.log('result', result);
        if (result.ok) {
            console.log('success');
            setRate(value);
            setIsRated(true);
            messageApi.success('评分成功！');
        } else {
            console.log('failed');
            messageApi.error('评分失败，请稍后再试。');
        }
        handleRateBook(value);
    };

    return (
        <div style={{ borderRadius: '20px' }}>
            <Typography.Title level={4}>评分</Typography.Title>
            <Rate allowHalf defaultValue={rateOfBook} allowClear={false} disabled />
            <br />
            <Typography.Text style={{ fontSize: '20px' }}>{rateOfBook}<br /></Typography.Text>
            <div style={{ marginTop: '10px' }}>
                <Typography.Text style={{ color: 'gray' }}>五星：{Math.round((numberOfFiveStar / numberInTotal) * 100)}%<br /></Typography.Text>
                <Typography.Text style={{ color: 'gray' }}>四星：{Math.round((numberOfFourStar / numberInTotal) * 100)}%<br /></Typography.Text>
                <Typography.Text style={{ color: 'gray' }}>三星：{Math.round((numberOfThreeStar / numberInTotal) * 100)}%<br /></Typography.Text>
                <Typography.Text style={{ color: 'gray' }}>二星：{Math.round((numberOfTwoStar / numberInTotal) * 100)}%<br /></Typography.Text>
                <Typography.Text style={{ color: 'gray' }}>一星：{Math.round((numberOfOneStar / numberInTotal) * 100)}%<br /></Typography.Text>
            </div>
            <Divider />
            <Typography.Text level={4} style={{ fontSize: '16px', fontWeight: 'bold' }}>您的喜好程度<br /></Typography.Text>
            <Rate value={rate} allowClear={false} style={{ marginTop: '10px' }} onChange={handleRateChange} />
        </div>
    );
}

function BookPageCard({ book, messageApi, setShowModal, item, setItem, handleAddCartItem, handleBuyBook, handleRateBook }) {

    return (
        <Row gutter={[16, 16]}>
            <Col span={9}>
                <Card style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', marginTop: '30px' }}>
                    <Image style={{ width: '100%', height: 'auto' }} alt={book.title} src={`data:image/jpeg;base64,${book.coverContent}`} />                </Card>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                    <BookTags tags={book.tags} style={{ padding: '5px' }} />
                </div>
            </Col>
            <Col span={10}>
                <BookInfo book={book} />
                <div style={{ marginTop: '20px', borderRadius: '20px' }}>
                    <BookDiscount book={book} messageApi={messageApi} setShowModal={setShowModal} item={item} setItem={setItem} />
                    <Space style={{ marginTop: '10px' }}>
                        <Button size="large" onClick={handleAddCartItem}>加入购物车</Button>
                        <Button type="primary" size="large" onClick={handleBuyBook}>立即购买</Button>
                    </Space>
                </div>
            </Col>
            <Col span={0.5}>
                <Divider type="vertical" style={{ marginTop: '10vh', height: '80%' }} />
            </Col>
            <Col span={4}>
                <div style={{ backgroundColor: "#fcfaf7", padding: "20px", width: "100%", marginTop: '80px', borderRadius: '20px' }}>
                    <BookRate book={book} handleRateBook={handleRateBook} />
                </div>
            </Col>
        </Row>
    );
}

export default function BookPage() {

    const [book, setBook] = useState(null);
    const [comments, setComments] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState(null);
    const pageIndex = Number.parseInt(searchParams.get("pageIndex") ?? '0');
    const pageSize = Number.parseInt(searchParams.get("pageSize") ?? '5');
    const sort = searchParams.get("sort") ?? "createdTime";
    const [messageApi, contextHolder] = useMessage();

    let { id } = useParams();
    if (id === undefined) {
        id = 1;
    }

    const getBook = async () => {
        let book = await getBookById(id);
        console.log("book", book);
        setBook(book);
    };

    const getComments = async () => {
        let comments = await getBookComments(id, pageIndex, pageSize, sort);
        setComments(comments);
    };

    useEffect(() => {
        // eslint-disable-next-line
        getBook();
        // eslint-disable-next-line
        getComments();
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        getComments();
        // eslint-disable-next-line
    }, [pageIndex, pageSize, sort]);

    const handleMutate = () => {
        getComments();
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handlePageChange = (page) => {
        setSearchParams({
            pageIndex: page - 1,
            pageSize,
            sort
        });
    };

    const handleSortChange = (sort) => {
        setSearchParams({
            pageIndex: 0,
            pageSize,
            sort
        });
    };

    const handleAddCartItem = async () => {
        let res = await addCartItem(book.id);

        handleBaseApiResponse(res, messageApi);

    };

    const handleBuyBook = async () => {

        await addCartItem(book.id);
        let response = await getCartItems();
        let cartItems = response.cartItems;
        console.log('cartItems', cartItems);
        let item = cartItems.find(item => item.book.id === book.id);
        if (item === undefined) {
            messageApi.error("购物车中未找到该商品！");
            return;
        }
        item = [item];

        setItem(item);
        setShowModal(true);

    };

    const handleRateBook = async (rate) => {
        getBook(); // 重新获取书籍数据
    };

    return (
        <PrivateLayout>
            {contextHolder}
            {showModal && <PlaceOrderModal selectedItems={item} onCancel={handleCloseModal} onOk={handleCloseModal} onMutate={handleMutate} />}
            {book && comments &&
                <Card style={{ marginLeft: '2%', marginRight: '2%', marginTop: '1%' }}>
                    <BookPageCard book={book} messageApi={messageApi} setShowModal={setShowModal} item={item} setItem={setItem} handleAddCartItem={handleAddCartItem} handleBuyBook={handleBuyBook} handleRateBook={handleRateBook} />
                    <div style={{ marginTop: '20px', borderRadius: '20px' }}>
                        <CommentArea comments={comments.items} onMutate={handleMutate} pageIndex={pageIndex} onPageChange={handlePageChange} onSortChange={handleSortChange} total={comments.total} book={book} />
                    </div>
                </Card>
            }
        </PrivateLayout>
    );
}