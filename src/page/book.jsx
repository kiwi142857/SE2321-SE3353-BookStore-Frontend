import { PrivateLayout } from "../components/layout";
import React from "react";
import getBooks from "../service/books";
import { Row, Col, Typography, Image, Divider, Card, Space, Rate, Tabs, Input, List } from "antd";
import UsernameAvatar from "antd/lib/avatar/avatar";
import { Button } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Paragraph } = Typography;
const { TextArea } = Input;

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
    return (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ backgroundColor: "#fcfaf7", padding: "20px", width: "100%", borderRadius: '20px' }}>
                <Paragraph style={{ marginBottom: 0 }} type="secondary">抢购价</Paragraph>
                <div><Space>
                    <div style={{ color: "#dd3735", fontSize: "16px" }}>¥</div>
                    <div style={{ color: "#dd3735", fontSize: "30px" }}>{book.price / 100 * 0.7}</div>
                    <div style={{ color: "#dd3735", fontSize: "18px" }}>（7折）</div>
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
                        <Paragraph style={{ marginBottom: 0 }} type="secondary">满¥18减¥1，满¥48减¥3，满¥98减¥5，满¥198减¥10</Paragraph>
                    </Space>
                </div>
                <Space>
                    <ExclamationCircleOutlined />
                    <Paragraph style={{ marginBottom: 0 }} type="secondary">部分促销不可共享，请以购物车能享受的促销为准</Paragraph>
                </Space>
            </div>
            <Space>
                <Button size="large" >加入购物车</Button>
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

function BookCommentList({ book }) {
    /* 评论列表 先采用固定数据*/
    const comments = [
        {
            id: 1,
            username: "张三",
            content: "这本书很好看"
        },
        {
            id: 2,
            username: "李四",
            content: "这本书不好看"
        }
    ];
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <List
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={comment => <BookComment comment={comment} />}
            />
        </Space>
    );
}

function BookComment({ comment }) {
    return (
        <List.Item key={comment.id}>
            <List.Item.Meta
                avatar={<UsernameAvatar username={comment.username} />}
                title={<div style={{ color: "grey" }}>{comment.username}</div>}
                description={comment.content}
            />
        </List.Item>
    );
}

function CommentArea({ book }) {
    return (
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="全部评论" key="1">
                <BookCommentList book={book} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="我要评论" key="2">
                <CommentInput placeholder="请输入您的评论" />
            </Tabs.TabPane>
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
                <Typography.Text style={{color:'gray'}}>五星：{Math.round((numberOfFiveStar / numberInTotal) * 100)}%<br /></Typography.Text>
                <Typography.Text style={{color:'gray'}}>四星：{Math.round((numberOfFourStar / numberInTotal) * 100)}%<br /></Typography.Text>
                <Typography.Text style={{color:'gray'}}>三星：{Math.round((numberOfThreeStar / numberInTotal) * 100)}%<br /></Typography.Text>
                <Typography.Text style={{color:'gray'}}>二星：{Math.round((numberOfTwoStar / numberInTotal) * 100)}%<br /></Typography.Text>
                <Typography.Text style={{color:'gray'}}>一星：{Math.round((numberOfOneStar / numberInTotal) * 100)}%<br /></Typography.Text>
            </div>
            <Divider />
            <Typography.Text level={4} style={{ fontSize: '16px', fontWeight: 'bold' }}>您的喜好程度<br /></Typography.Text>
            <Rate allowHalf defaultValue={2.5} allowClear={false} style={{marginTop:'10px'}}/>
        </div>
    );
}

export default function BookPage() {
    const { books } = getBooks();

    const book = books[0];
    return (
        <PrivateLayout>
            <Card style={{ marginLeft: '2%', marginRight: '2%', marginTop: '1%' }}>
                <Row gutter={[16, 16]}>
                    <Col span={9}>
                        <Card style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', marginTop: '30px' }}>
                            <Image style={{ width: '100%', height: 'auto' }} alt={book.title} src={book.cover} />
                        </Card>
                    </Col>
                    <Col span={10}>
                        <BookInfo book={book} />
                        <div style={{ marginTop: '20px', borderRadius: '20px' }}>
                            <BookDiscount book={book} />
                        </div>
                    </Col>
                    <Col span={0.5}>
                        <Divider type="vertical" style={{ marginTop: '10vh', height: '80%' }} />
                    </Col>
                    <Col span={4.5}>
                        <div style={{ backgroundColor: "#fcfaf7", padding: "20px", width: "100%", marginTop: '80px', borderRadius: '20px' }}>
                            <BookRate book={book} />
                        </div>
                    </Col>
                </Row>
                <div style={{ marginTop: '20px', borderRadius: '20px' }}>
                    <CommentArea book={book} />
                </div>
            </Card>
        </PrivateLayout>
    );
}