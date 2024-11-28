import { Card, Divider, Typography } from "antd";
import { Link } from "react-router-dom";
import BookTags from "./bookTag";
import { useEffect, useState } from "react";
const { Meta } = Card;

export default function BookCard({ book }) {
    const [coverSrc, setCoverSrc] = useState('');

    useEffect(() => {
        console.log('Book:', book);
        if (book.coverContent) {
            console.log('Cover content length:', book.coverContent.length);
            // 将 Base64 编码的字符串设置为图片的 src
            const base64Image = `data:image/jpeg;base64,${book.coverContent}`;
            setCoverSrc(base64Image);
            console.log('Base64 Image URL:', base64Image);
        } else {
            console.log('No cover content');
        }
    }, [book.coverContent]);

    return <Link to={'./book/' + book.id}>
        <Card hoverable cover={<img alt={book.title} src={coverSrc} style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'top' }} />}>
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
            <BookTags tags={book.tags} style={{ padding: '5px' }} />
        </Card>
    </Link>;
}