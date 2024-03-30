import React from 'react';
import { Card, Row, Col, Divider } from 'antd';
import Typography from 'antd/es/typography/Typography';
import NavBar from '../components/navbar';
import { PrivateLayout } from '../components/layout';
import useMessage from 'antd/es/message/useMessage';
import { useEffect, useState } from 'react';
import { getTop10BestSellingBooks } from "../service/book";
import BookTags from '../components/bookTag';

const { Meta } = Card;

function RankHeader() {
    return (
        <Row justify="center">
            <Col>
                <img src={process.env.PUBLIC_URL + '/riceEarLeft.svg'} style={{ height: '8em' }} />
            </Col>
            <Col>
                <Typography.Title className='rank-header'>畅销榜前十图书</Typography.Title>
            </Col>
            <Col>
                <img src={process.env.PUBLIC_URL + '/riceEarRight.svg'} style={{ height: '8em' }} />
            </Col>
        </Row>
    );
}

function RankBookCard({ book }) {
    return (
        <Card
            hoverable
            style={{ width: '100%', marginBottom: '20px' }}
        >
            <Row style={{ marginLeft: '-10%', marginRight: '-10%' }}>
                <Col span={14}>
                    <img alt="example" src={book.cover} style={{ width: '100%' }} />
                </Col>
                <Col span={10}>
                    <Typography.Text style={{
                        color: 'black',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        display: 'block',
                        width: '100%',
                        marginTop: '5px',
                    }}>
                        {book.title}<br />
                    </Typography.Text>
                    <Typography.Text style={{ color: 'gray', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', width: '100%', marginTop: '5px' }}>作者：{book.author}<br /></Typography.Text>
                    <Divider style={{ margin: '10px', marginTop: '0' }} />
                    <BookTags tags={book.tag} style={{ padding: '5px' }} />
                </Col>
            </Row>
        </Card>
    );
}

function FirstRankCard({ book }) {
    return (
        <Card
            hoverable
            style={{ width: '100%', marginBottom: '20px',backgroundColor:'transparent'}}
        >
            <Row>
                <Col span={12}>
                    <img alt="example" src={book.cover} style={{ width: '100%' }} />
                </Col>
                <Col span={12}>
                    <Typography.Text style={{
                        color: 'black',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        display: 'block',
                        width: '100%',
                        marginTop: '5px',
                    }}>
                        {book.title}<br />
                    </Typography.Text>
                    <Typography.Text style={{
                        color: 'gray',
                        fontSize: '12px',
                        overflow: 'auto',
                        textOverflow: 'ellipsis',
                        display: 'block',
                        width: '100%',
                        marginTop: '5px',
                        maxHeight: '60px'
                    }}>
                        作者：{book.author}<br />
                    </Typography.Text>
                    <Divider style={{ margin: '10px', marginTop: '0' }} />
                    <BookTags tags={book.tag} style={{ padding: '5px' }} />
                </Col>
            </Row>
        </Card>
    );
}


function RankList({ books }) {
    console.log(books);
    const book = books[0];
    books = books.slice(1);
    return (
        <Row justify="left" >
            <Col span={8}>
                <FirstRankCard book={book} />
            </Col>
            <Col span={16}>
                <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {books.map((book) => {
                        return (
                            <Col span={8}>
                                <RankBookCard book={book} />
                            </Col>
                        );
                    })}
                </Row>
            </Col>
        </Row>
    );
}

export default function RankPage() {
    const [messageApi, contextHolder] = useMessage();
    const [books, setBooks] = useState([]);
    const getTop10Books = async () => {
        let books = await getTop10BestSellingBooks();
        setBooks(books);
    };

    useEffect(() => {
        getTop10Books();
    }, []);

    return (
        <PrivateLayout>
            {contextHolder}
            <Card style={{ margin: '10px', marginTop: '20px',backgroundColor: '#e6f7ff' }}>
                <div style={{ marginLeft: '1%', marginRight: '1%' }}>
                    <RankHeader />
                    <div style={{ margin: '10px', marginTop: '20px' }}>
                        <RankList books={books} />
                    </div>
                </div>
            </Card>
        </PrivateLayout>
    );
};