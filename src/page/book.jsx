import { PrivateLayout } from "../components/layout";
import React from "react";
import { getBookById, getBookComments } from "../service/book";
import { Row, Col, Typography, Image, Divider, Card, Space, Rate, Tabs, Input, List } from "antd";
import UsernameAvatar from "antd/lib/avatar/avatar";
import { Button } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { formatTime } from "../utils/time";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import BookTags from "../components/bookTag";
import { addBookComment } from "../service/book";
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { addCartItem } from "../service/cart";
const { Paragraph } = Typography;
const { TextArea } = Input;



export function LikeButton({ defaultNumber, liked, onLike, onUnlike }) {
    const [isLiked, setIsLiked] = useState(liked);
    const [number, setNumber] = useState(defaultNumber);
    useEffect(() => {
        setIsLiked(liked);
        setNumber(defaultNumber);
    }, [liked, defaultNumber]);
    
    const handleLikeOrUnlike = async (e) => {
        e.preventDefault();
        if (!isLiked) {
            if (await onLike?.()) {
                setIsLiked(true);
                setNumber(number => number + 1);
            }
        } else if (await onUnlike?.()) {
            setIsLiked(false);
            setNumber(number => number - 1);
        }
    };

    return <Space size="small">
        <a onClick={handleLikeOrUnlike}>
            {isLiked && <LikeFilled />}
            {!isLiked && <LikeOutlined />}
        </a>
        {number}
    </Space>;
}

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

function BookDiscount({ book, onMutate }) {
    const discount = book.discount || 0.7;
    const [messageApi, contextHolder] = useMessage();
    const handleAddCartItem = async () => {
        let res = await addCartItem(book.id);
        console.log(res);
        let temp = handleBaseApiResponse(res, messageApi);
        console.log(temp);
    };
    return (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ backgroundColor: "#fcfaf7", padding: "20px", width: "100%", borderRadius: '20px' }}>
                <Paragraph style={{ marginBottom: 0 }} type="secondary">抢购价</Paragraph>
                <div><Space>
                    <div style={{ color: "#dd3735", fontSize: "16px" }}>¥</div>
                    <div style={{ color: "#dd3735", fontSize: "30px" }}>{(book.price / 100 * 0.7).toFixed(2)}</div>
                    <div style={{ color: "#dd3735", fontSize: "18px" }}>({10 * discount}折)</div>
                </Space>
                </div>
                <div>
                    <Space>
                        <div style={{
                            backgroundColor: "#f48484",
                            padding: "0px 4px 0px 4px",
                            borderRadius: "5px",
                            color: "white"
                        }}>店铺促销</div>
                        <Paragraph style={{ marginBottom: 0 }} type="secondary">满¥38减¥3,满¥48减¥5</Paragraph>
                    </Space>
                </div>
                <Space>
                    <ExclamationCircleOutlined />
                    <Paragraph style={{ marginBottom: 0 }} type="secondary">部分促销不可共享，请以购物车能享受的促销为准</Paragraph>
                </Space>
            </div>
            <Space>
                <Button size="large" onClick={handleAddCartItem}>加入购物车</Button>
                <Button type="primary" size="large">立即购买</Button>
            </Space>
        </Space>
    );
}

function CommentInput({ placeholder }) {
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <TextArea placeholder={placeholder} />
            <Row justify="end">
                <Col><Button type="primary">发布</Button></Col>
            </Row>
        </Space>
    );
}

function BookCommentList({ comments }) {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <List
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={comment => <BookComment comment={comment}
                />}
            />
        </Space>
    );
}

function BookComment({ comment }) {
    console.log(comment);
    /* comment = { content: "评论内容", username: "用户名", id: "评论id" , like: 0, dislike: 0, createdTime: "评论时间" } */
    const contentComponent = <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
            {formatTime(comment.createdAt)}
            <LikeButton defaultNumber={comment.like} liked={comment.liked} />
        </Space>
        {<CommentInput placeholder={`回复 ${comment.username}：`} />}
    </Space>;
    return (
        <List.Item key={comment.id}>
            <List.Item.Meta
                avatar={<UsernameAvatar username={comment.username} />}
                title={<div style={{ color: "grey" }}>{comment.username}</div>}
                description={contentComponent}
            />
        </List.Item>
    );
}

function CommentArea({ comments }) {
    return (
        <Tabs defaultActiveKey="1">
            <items tab="全部评论" key="1">
                <BookCommentList comments={comments} />
            </items>
            <items tab="我要评论" key="2">
                <CommentInput placeholder="请输入您的评论" />
            </items>
        </Tabs>
    );
}

function BookRate({ book }) {
    const rateOfBook = 2.5;
    const numberOfFiveStar = 5;
    const numberOfFourStar = 4;
    const numberOfThreeStar = 3;
    const numberOfTwoStar = 4;
    const numberOfOneStar = 5;
    const numberInTotal = numberOfFiveStar + numberOfFourStar + numberOfThreeStar + numberOfTwoStar + numberOfOneStar;

    return (
        <div style={{ borderRadius: '20px' }}>
            <Typography.Title level={4}>评分</Typography.Title>
            <Rate allowHalf defaultValue={rateOfBook} allowClear={false} disabled />
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
            <Rate allowHalf defaultValue={2.5} allowClear={false} style={{ marginTop: '10px' }} />
        </div>
    );
}

export default function BookPage() {

    const [book, setBook] = useState(null);
    const [comments, setComments] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = Number.parseInt(searchParams.get("pageIndex") ?? '0');
    const pageSize = Number.parseInt(searchParams.get("pageSize") ?? '5');
    const sort = searchParams.get("sort") ?? "createdTime";

    let { id } = useParams();
    if (id === undefined) {
        id = 1;
    }

    const getBook = async () => {
        let book = await getBookById(id);
        setBook(book);
    };

    const getComments = async () => {
        let comments = await getBookComments(id, pageIndex, pageSize, sort);
        setComments(comments);
    };

    useEffect(() => {
        getBook();
        getComments();
    }, [id]);

    useEffect(() => {
        getComments();
    }, [pageIndex, pageSize, sort]);

    const handleMutate = () => {
        getComments();
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

    console.log("id", id);
    console.log(book);
    console.log(comments);
    return (
        <PrivateLayout>
            
            {book && comments && <Card style={{ marginLeft: '2%', marginRight: '2%', marginTop: '1%' }}>
                <Row gutter={[16, 16]}>
                    <Col span={9}>
                        <Card style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', marginTop: '30px' }}>
                            <Image style={{ width: '100%', height: 'auto' }} alt={book.title} src={book.cover} />

                        </Card>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'5%' }}>
                            <BookTags tags={book.tag} style={{ padding: '5px' }} />
                        </div>
                    </Col>
                    <Col span={10}>
                        <BookInfo book={book} />
                        <div style={{ marginTop: '20px', borderRadius: '20px' }}>
                            <BookDiscount book={book} onMutate={handleMutate}/>
                        </div>
                    </Col>
                    <Col span={0.5}>
                        <Divider type="vertical" style={{ marginTop: '10vh', height: '80%' }} />
                    </Col>
                    <Col span={4}>
                        <div style={{ backgroundColor: "#fcfaf7", padding: "20px", width: "100%", marginTop: '80px', borderRadius: '20px' }}>
                            <BookRate book={book} />
                        </div>
                    </Col>
                </Row>
                <div style={{ marginTop: '20px', borderRadius: '20px' }}>
                    <CommentArea comments={comments.items} />
                </div>
            </Card>}
        </PrivateLayout>
    );
}