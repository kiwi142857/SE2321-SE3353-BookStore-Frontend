import { Card, Divider } from "antd"
import { Link } from "react-router-dom";
import BookTags from "./bookTag";
import {Typography} from "antd";
const { Meta } = Card;

export default function BookCard({ book }) {
    return <Link to='./book'>
        <Card hoverable cover={<img alt={book.title} src={book.cover} />}>
            <Meta title={book.title} />
            <Typography.Text style={{color:'gray', fontSize:'12px'}}>作者：{book.author}<br /></Typography.Text>
            <Typography.Text style={{color:'gray', fontSize:'12px', marginBottom:'-10px'}}>价格： {book.price/100}<br /></Typography.Text>
            <Divider style={{margin:'10px', marginTop:'0'}} />
            <BookTags tags={book.tag} style={{pedding:'5px'}} />
        </Card>
    </Link>
}