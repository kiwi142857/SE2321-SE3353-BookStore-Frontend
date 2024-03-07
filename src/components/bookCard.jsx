import { Card, Divider } from "antd"
import { Link } from "react-router-dom";
import BookTags from "./bookTag";
const { Meta } = Card;

export default function BookCard({ book }) {
    return <Link to='./'>
        <Card hoverable cover={<img alt={book.title} src={book.cover} />}>
            <Meta title={book.title} description={'作者：'+book.author+"  价格： ￥"+book.price/100} />
            <Divider style={{margin:'10px'}} />
            <BookTags tags={book.tag} style={{pedding:'5px'}} />
        </Card>
    </Link>
}