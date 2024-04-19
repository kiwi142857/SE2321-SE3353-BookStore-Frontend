import { Space, Flex, Row , Col} from "antd";
import { PrivateLayout } from "../components/layout";
import BookList from "../components/bookList";
import HomePageAd from "../components/homePageAd";
import NavMenu from "../components/navMenu";
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
    const keyword = searchParams.get("keyword") || "";
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 10;

    const getBooks = async () => {
        let pagedBooks = await searchBooks(keyword, pageIndex, pageSize);
        let books = pagedBooks.items;
        let totalPage = pagedBooks.total;
        setBooks(books);
        setTotalPage(totalPage);
    };

    useEffect(() => {
        getBooks();
    }, [keyword, pageIndex, pageSize])

    const handleSearch = (keyword) => {
        setSearchParams({
            "keyword": keyword,
            "pageIndex": 0,
            "pageSize": 10
        });
    };

    const handlePageChange = (page) => {
        setSearchParams({ ...searchParams, pageIndex: page - 1 });
    }
    
    const [searchType, setSearchType] = useState('title');
    
    return <PrivateLayout>
        <div className="home-main" >
            <Space direction="vertical" size="large" style={{ width: "98%", marginTop: '10px' }}>
                <Flex style={{height:'35px'}}>
                    <Tabs className="home-table-font" centered style={{ marginLeft:'40px', marginRight: '15px' }} defaultActiveKey="Title"
                    onChange={(key) => {setSearchType(key);}} activeKey={searchType}>
                        <Tabs.TabPane key={'title'} tab={'书名'} />
                        <Tabs.TabPane key={'author'} tab={'作者'} />
                    </Tabs>
                    <Search style={{height:'30px',marginRight:'20px'}} placeholder={searchType === 'title' ? '请输入查询的书名' : '请输入查询的作者名'} onSearch={handleSearch} enterButton size="large" />
                </Flex>
                <Row style={{marginLeft:'3%'}}>
                    <Col span={3}>
                    <NavMenu/></Col>
                    <Col span={21}>
                    <HomePageAd /></Col>
                </Row>
                <BookList books={books} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex + 1} onPageChange={handlePageChange} />
            </Space>
        </div>
    </PrivateLayout>;
}