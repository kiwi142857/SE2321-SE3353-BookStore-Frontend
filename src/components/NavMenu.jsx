import React from 'react';
import { BookTwoTone } from '@ant-design/icons';
import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('理科', 'sub1', <BookTwoTone />, [
        getItem('数学', '1'),
        getItem('物理', '2'),
        // getItem('化学', '3'),
        // getItem('生物', '4'),
    ]),
    getItem('工科', 'sub2', <BookTwoTone />, [
        getItem('计算机', '5'),
        // getItem('电子', '6'),
        // getItem('机械', '7'),
        // getItem('土木', '8'),
        getItem("AI", '6'),
        getItem("大数据", '7'),
        getItem("人工智能", '8'),
    ]),
    getItem('社科', 'sub3', <BookTwoTone />, [
        getItem('儿童', '9'),
        getItem('育儿', '10'),
        getItem('心理学', '11'),
        getItem('法学', '12'),
    ]),
    getItem('文科', 'sub4', <BookTwoTone />, [
        getItem('语言学', '13'),
        getItem('文学', '14'),
        getItem('历史', '15'),
        getItem('哲学', '16'),
    ]),
    getItem('商科', 'sub5', <BookTwoTone />, [
        getItem('管理', '17'),
        getItem('会计', '18'),
        getItem('金融', '19'),
        getItem('市场营销', '20'),
    ]),
    getItem('医学', 'sub6', <BookTwoTone />, [
        getItem('临床医学', '21'),
        getItem('药学', '22'),
        getItem('护理学', '23'),
        getItem('公共卫生', '24'),
    ]),
    getItem('艺术', 'sub7', <BookTwoTone />, [
        getItem('音乐', '25'),
        getItem('美术', '26'),
        getItem('舞蹈', '27'),
        getItem('戏剧', '28'),
    ]),
    getItem('农林', 'sub8', <BookTwoTone />, [
        getItem('农业', '29'),
        getItem('林业', '30'),
        getItem('园林', '31'),
        getItem('畜牧', '32'),
    ]),
    getItem('特价书', 'sub9', <BookTwoTone />, [
        getItem('特价书', '33'),
    ]),
    getItem('进口书', 'sub10', <BookTwoTone />, [
        getItem('英语书', '34'),
        getItem('日语书', '35'),
        getItem('法语书', '35'),
    ]),
    getItem('经典名著', 'sub11', <BookTwoTone />, [
        getItem('四大名著', '36'),
        getItem('莎士比亚', '37'),
    ]),
];

const onClick = (setSearchType, setTag) => (e) => {
    const { keyPath } = e;
    const key = keyPath[0];

    let label;
    for (let item of items) {
        if (item.key === key) {
            label = item.label;
            break;
        }
        for (let child of item.children) {
            if (child.key === key) {
                label = child.label;
                break;
            }
        }
        if (label) break;
    }

    if (label) {
        setTag(label);
        setSearchType('tag');
    }
};

export default function NavMenu({ setSearchType, setTag }) {
    return (
        <Menu
            onClick={onClick(setSearchType, setTag)}
            style={{
                width: '120%',
                height: '100%',
                fontSize: '18px',
                borderRadius: '10px',
            }}
            mode="vertical"
            items={items}
        />
    );
}