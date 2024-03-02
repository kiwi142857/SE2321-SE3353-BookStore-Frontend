import { Card, Space } from "antd";
import { PrivateLayout } from "../components/layout";
import BookList from "../components/book_list";

import { Input } from 'antd';
const { Search } = Input;

export default function HomePage() {
    const books = [{ title: "book1", cover: "https://img3.doubanio.com/view/subject/l/public/s29869264.jpg" },
    { title: "book2", cover: "https://img3.doubanio.com/view/subject/l/public/s29869265.jpg" },
    { title: "book3", cover: "https://img3.doubanio.com/view/subject/l/public/s29869266.jpg" },
    { title: "book4", cover: "https://img3.doubanio.com/view/subject/l/public/s29869267.jpg" },];

    const handlePageChange = (page, pageSize) => {
        console.log(page, pageSize);
    }

    const handleSearch = (value) => {
        console.log(value);
    }

    return <PrivateLayout>
        <Card className="card-container">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Search placeholder="输入关键字" onSearch={handleSearch} enterButton size="large" />
                <BookList books={books} pageSize='1' total='10' current='1' onPageChange={handlePageChange} />
            </Space>
        </Card>
    </PrivateLayout>
}