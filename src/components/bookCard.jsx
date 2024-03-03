import { Card } from "antd"
import { Link } from "react-router-dom";

const { Meta } = Card;

export default function BookCard({ book }) {
    return <Link to='./'>
        <Card hoverable cover={<img alt={book.title} src={book.cover} />}>
            <Meta title={book.title} description={'作者：'+book.author+"  价格： ￥"+book.price/100} />
        </Card>
    </Link>
}