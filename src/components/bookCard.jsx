import { Card, Divider, Typography } from "antd";
import { Link } from "react-router-dom";
import BookTags from "./bookTag";
const { Meta } = Card;

export default function BookCard({ book }) {
    return <Link to={'./book/' + book.id}>
        <Card hoverable cover={<img alt={book.title} src={book.cover} style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'top' }} />}>
            <Meta title={book.title} />
            <Typography.Text style={{ color: 'gray', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', width: '100%', marginTop: '5px' }}>作者：{book.author}</Typography.Text>
            <Typography.Text style={{ color: 'gray', fontSize: '12px', marginBottom: '-10px' }}>
                价格： {(book.price / 1000 * (book.discount ? book.discount : 7)).toFixed(2)}<br />
            </Typography.Text>
            <Typography.Text style={{ color: 'gray', fontSize: '12px', marginBottom: '-10px' }}>
                库存： {book.stock}<br />
            </Typography.Text>
            <Typography.Text style={{ color: 'gray', fontSize: '12px', marginBottom: '-10px' }}>
                ISBN: {book.isbn}<br />
            </Typography.Text>
            <Divider style={{ margin: '10px', marginTop: '0' }} />
            <BookTags tags={book.tag} style={{ padding: '5px' }} />
        </Card>
    </Link>;
}