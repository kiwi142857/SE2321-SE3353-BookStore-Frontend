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

    const bookcover = [{ title: "C++ Primer Plus", author: "Stephen Parata", price: 20000, tag:["计算机","编程","进口书"] },
    { title: "Excel 函数与公式速查手册（第2版）", author: "赛贝尔咨询", price: 3000, tag:["计算机","办公软件"] },
    { title: "Java轻松学", author: "AAA", price: 1000, tag:["计算机","编程","进口书"] }, { title: "MySQL必知必会", author: "AAA", price: 1000, tag:["计算机","数据库","进口书"] },
    { title: "Python编程 从入门到实践", author: "AAA", price: 1050, tag:["计算机","编程","进口书"] },
    { title: "千字文", author: "AAA", price: 1000,  tag:["文学","名著","教育"] }, { title: "史记", author: "AAA", price: 1000,  tag:["文学","名著"] }, { title: "声律启蒙", author: "AAA", price: 1000,  tag:["文学","名著"] },
    { title: "悲惨世界", author: "AAA", price: 1000,  tag:["文学","名著"] }, { title: "活着", author: "AAA", price: 1000,  tag:["文学","名著"] },
    { title: "现代C++编程", author: "AAA", price: 1000, tag:["计算机","编程"] }, { title: "许三观卖血记", author: "AAA", price: 1000, tag:["文学","名著"] }];

    const books = bookcover.map((item, index) => {
        return { title: item.title, cover: process.env.PUBLIC_URL + './BookCover/' + item.title + '.jpg', author: item.author, price: item.price, tag: item.tag};
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
        <div className="home-main" >
            <Space direction="vertical" size="large" style={{ width: "98%", marginTop: '10px' }}>
                <Flex style={{height:'35px'}}>
                    <Tabs className="home-table-font" centered style={{ marginLeft:'40px', marginRight: '15px', marginBottom: '0px' }} defaultActiveKey="Title"
                    onChange={(key) => {setSearchType(key);}} activeKey={searchType}>
                        <Tabs.TabPane key={'title'} tab={'书名'} />
                        <Tabs.TabPane key={'nnthor'} tab={'作者'} />
                    </Tabs>
                    <Search style={{height:'30px',marginRight:'20px'}} placeholder={searchType === 'title' ? '请输入查询的书名' : '请输入查询的作者名'} onSearch={handleSearch} enterButton size="large" />
                </Flex>
                <Row style={{marginLeft:'3%'}}>
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