import { Space, Flex, Row, Col } from "antd";
import { PrivateLayout } from "../components/layout";
import BookList from "../components/bookList";
import HomePageAd from "../components/homePageAd";
import NavMenu from "../components/NavMenu";
import '../css/global.css';
import { Tabs } from 'antd';
import { Input } from 'antd';
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchBooks } from "../service/book";
const { Search } = Input;

export default function HomePage() {

    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const [keyword, setKeyword] = useState(searchParams.get("keyword") || '');
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 10;

    const getBooks = async () => {
        console.log("keyword", keyword);
        let pagedBooks = await searchBooks(keyword, pageIndex, pageSize, searchType);
        console.log("pagedBooks", pagedBooks);
        let books = pagedBooks.bookList;
        let totalItem = pagedBooks.total;
        setBooks(books);
        console.log("totalItem", totalItem);
        setTotalPage(totalItem % pageSize === 0 ? totalItem / pageSize : Math.floor(totalItem / pageSize) + 1);
        console.log("totalPage", totalItem % pageSize === 0 ? totalItem / pageSize : Math.floor(totalItem / pageSize) + 1);
    };

    const [searchType, setSearchType] = useState('title');

    useEffect(() => {
        console.log("useEffect: getBooks");
        getBooks();
    }, [keyword, pageIndex, pageSize, searchType, searchParams]);

    const handleSearch = (keyword) => {
        console.log("keyword", keyword);
        setSearchParams({
            "keyword": keyword,
            "pageIndex": 0,
            "pageSize": 10
        });
        setKeyword(keyword);
    };

    const handlePageChange = (page) => {
        setSearchParams({ ...searchParams, pageIndex: page - 1 });
    };

    return <PrivateLayout>
        <div className="home-main" >
            <Space direction="vertical" size="large" style={{ width: "98%", marginTop: '10px' }}>
                <Flex style={{ height: '35px' }}>
                    <Tabs className="home-table-font" centered style={{ marginLeft: '40px', marginRight: '15px' }} defaultActiveKey="Title"
                        onChange={(key) => {
                            setSearchType(key);
                            
                        }} activeKey={searchType}>
                        <Tabs.TabPane key={'title'} tab={'书名'} />
                        <Tabs.TabPane key={'author'} tab={'作者'} />
                    </Tabs>
                    <Search style={{ height: '30px', marginRight: '20px' }} placeholder={searchType === 'title' ? '请输入查询的书名' : '请输入查询的作者名'} onSearch={handleSearch} enterButton size="large" />
                </Flex>
                <Row style={{ marginLeft: '3%' }}>
                    <Col span={3}>
                        <NavMenu setSearchType={setSearchType} setTag={setKeyword} /></Col>
                    <Col span={21}>
                        <HomePageAd /></Col>
                </Row>
                <BookList books={books} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex + 1} onPageChange={handlePageChange} />
            </Space>
        </div>
    </PrivateLayout>;
}