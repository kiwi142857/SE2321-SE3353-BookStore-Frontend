import { List, Pagination, Space } from "antd"
import BookCard from "./bookCard"

export default function BookList({ books, pageSize, current, total, onPageChange }) {
    console.log(books)
    const paginationProp = {
        current,
        pageSize,
        total,
        onChange: onPageChange,  
    }
    return <Space direction="vertical" style={{width:'100%'}}>
        <List style={{marginLeft:'15px', width:'100%'}}
            grid={{gutter: 16, column: 5}}
            dataSource={books.map(b => ({
                ...b,
                key: b.id
            }))}
            renderItem={(book) => (
                <List.Item>
                    <BookCard book={book} />
                </List.Item>
            )}
        />
        <Pagination {...paginationProp} style={{textAlign:"center"}} />
    </Space>
}