import React from 'react';
import { Card, Row, Col, Divider } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { PrivateLayout } from '../components/layout';
import { useEffect, useState } from 'react';
import { getTop10BestSellingBooks } from "../service/book";
import BookTags from '../components/bookTag';
import { Link } from 'react-router-dom';

function RankHeader() {
    return (
        <Row justify="center">
            <Col>
                <img src={process.env.PUBLIC_URL + '/riceEarLeft.svg'} style={{ height: '8em' }} alt='riceEarLeft' />
            </Col>
            <Col>
                <Typography.Title className='rank-header'>畅销榜前十图书</Typography.Title>
            </Col>
            <Col>
                <img src={process.env.PUBLIC_URL + '/riceEarRight.svg'} style={{ height: '8em' }} alt='riceEarRight' />
            </Col>
        </Row>
    );
}

function RankBookCard({ book, rank }) {
    const SecondBorderStyle = {
        border: '2px solid #d1e1e9',
        styleClassNames: 'book-rank-second-cover',
    };

    const ThirdBorderStyle = {
        border: '2px solid #b3a84b',
        styleClassNames: 'book-rank-third-cover',
    };

    const OtherBorderStyle = {
        border: '2px solid rgba(46,55,66, 0.5)',
        styleClassNames: 'book-rank-other-cover',
    };

    const BorderStyle = rank === 2 ? SecondBorderStyle : rank === 3 ? ThirdBorderStyle : OtherBorderStyle;
    const rankStyle = rank === 2 ? 'book-rank-second-cover' : rank === 3 ? 'book-rank-third-cover' : 'book-rank-other-cover';
    return (
        <Link to={'.././book/' + book.id}>
            <Card
                hoverable
                style={{ width: '100%', marginBottom: '20px' }}
            >
                <Row style={{ marginLeft: '-10%', marginRight: '-10%' }} gutter={{ xs: 3, sm: 4, md: 6, lg: 8 }}>
                    <Col span={14} >
                        <div style={{ position: 'relative' }}>
                            <img alt="bookCover" src={`data:image/jpeg;base64,${book.coverContent}`} style={{ width: '100%', border: BorderStyle.border }} />
                            <label htmlFor="bookCoverRank" className={rankStyle} style={{ color: 'white' }}></label>
                            <div className="book-rank-number" style={{ zIndex: 1 }}>{rank}</div>
                        </div>
                    </Col>
                    <Col span={10}>
                        <Typography.Text style={{
                            color: 'black',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'block',
                            width: '100%',
                            marginTop: '5px',
                        }}>
                            {book.title}<br />
                        </Typography.Text>
                        <Typography.Text style={{ color: 'gray', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', width: '100%', marginTop: '5px' }}>作者：{book.author}<br /></Typography.Text>
                        <Divider style={{ margin: '10px', marginTop: '0' }} />
                        <BookTags tags={book.tags} style={{ padding: '5px' }} />
                    </Col>
                </Row>
                <Typography.Text>销量：{book.sales}</Typography.Text>
            </Card>
        </Link>
    );
}

function FirstRankCard({ book }) {
    return (
        <Link to={'.././book/' + book.id}>
            <Card
                hoverable
                style={{ width: '100%', marginBottom: '20px' }}
            >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <div style={{ position: 'relative' }}>
                        <img alt="bookCover" src={`data:image/jpeg;base64,${book.coverContent}`} style={{ width: '100%', border: '2px solid #eed895' }} />
                        <label htmlFor="bookCoverRank" className="book-rank-cover" style={{ color: 'white' }}></label>
                        <div className="book-rank-number" style={{ zIndex: 1 }}>1</div>
                    </div>
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
                    <BookTags tags={book.tags} style={{ padding: '5px' }} />

                </Row>
                <Divider />
                <Typography.Text>销量：{book.sales} 本</Typography.Text>
            </Card>
        </Link>
    );
}


function RankList({ books }) {

    const book = books[0];
    books = books.slice(1);
    return (
        <Row justify="left" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8}>
                <FirstRankCard book={book} />
            </Col>
            <Col span={16}>
                <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {books.map((book, index) => {
                        return (
                            <Col span={8}>
                                <RankBookCard book={book} rank={index + 2} />
                            </Col>
                        );
                    })}
                </Row>
            </Col>
        </Row>
    );
}

export default function RankPage() {

    const [books, setBooks] = useState(null);
    const getTop10Books = async () => {

        let response = await getTop10BestSellingBooks();
        if (!response) return;
        let books = response.bookList;
        setBooks(books);
    };

    useEffect(() => {
        getTop10Books();
    }, []);

    return (
        <PrivateLayout>

            <Card style={{ margin: '10px', marginTop: '20px' }}>
                <div style={{ marginLeft: '1%', marginRight: '1%' }}>
                    <RankHeader />
                    <div style={{ margin: '10px', marginTop: '20px', backgroundColor: 'white' }}>
                        {books && <RankList books={books} />}
                    </div>
                </div>
            </Card>
        </PrivateLayout>
    );
};