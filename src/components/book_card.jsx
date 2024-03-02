import { Card } from "antd"
import { Link } from "react-router-dom";

const { Meta } = Card;

export default function BookCard({ book }) {
    return <Link to='./'>
        <Card
            hoverable
            cover={<img alt={book.title} src={book.cover} />}
        >
            <Meta title={book.title} description='￥100' />
        </Card>
    </Link>
}