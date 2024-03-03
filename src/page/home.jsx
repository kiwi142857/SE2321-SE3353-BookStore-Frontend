import { Space, Flex, Row , Col} from "antd";
import { PrivateLayout } from "../components/layout";
import BookList from "../components/bookList";
import HomePageAd from "../components/homePageAd";
import NavMenu from "../components/NavMenu";
import '../css/global.css';
import { Tabs } from 'antd';
import { Input } from 'antd';
import { useState } from "react";
const { Search } = Input;

export default function HomePage() {

    const bookcover = [{ title: "C++ Primer Plus", author: "Stephen Parata", price: 20000 },
    { title: "Excel 函数与公式速查手册（第2版）", author: "赛贝尔咨询", price: 3000 },
    { title: "Java轻松学", author: "AAA", price: 1000 }, { title: "MySQL必知必会", author: "AAA", price: 1000 },
    { title: "Python编程 从入门到实践", author: "AAA", price: 1050 },
    { title: "千字文", author: "AAA", price: 1000 }, { title: "史记", author: "AAA", price: 1000 }, { title: "声律启蒙", author: "AAA", price: 1000 },
    { title: "悲惨世界", author: "AAA", price: 1000 }, { title: "活着", author: "AAA", price: 1000 },
    { title: "现代C++编程", author: "AAA", price: 1000 }, { title: "许三观卖血记", author: "AAA", price: 1000 }];

    const books = bookcover.map((item, index) => {
        return { title: item.title, cover: process.env.PUBLIC_URL + './BookCover/' + item.title + '.jpg', author: item.author, price: item.price };
    });

    const [pageIndex, setPageIndex] = useState(1);

    const handlePageChange = (page, pageSize) => {
        setPageIndex(page);
    };

    const handleSearch = (value) => {
        console.log(value);
    };

    const [searchType, setSearchType] = useState('title');

    return <PrivateLayout>
        <div className="card-container" >
            <Space direction="vertical" size="large" style={{ width: "98%", marginTop: '10px' }}>
                <Flex>
                    <Tabs className="home-table-font" centered style={{ marginRight: '8px', marginBottom: '0px' }} defaultActiveKey="Title"
                    onChange={(key) => {setSearchType(key);}} activeKey={searchType}>
                        <Tabs.TabPane key={'title'} tab={'Title'} />
                        <Tabs.TabPane key={'nnthor'} tab={'Anthor'} />
                    </Tabs>
                    <Search placeholder={searchType === 'title' ? 'Input the book\' title ' : 'Input the anthor\' name'} onSearch={handleSearch} enterButton size="large" />
                </Flex>
                <Row>
                    <Col span={3}>
                    <NavMenu/></Col>
                    <Col span={21}>
                    <HomePageAd /></Col>
                </Row>
                <BookList books={books} pageSize='1' total='2' current={pageIndex} onPageChange={handlePageChange} />
            </Space>
        </div>
    </PrivateLayout>;
}