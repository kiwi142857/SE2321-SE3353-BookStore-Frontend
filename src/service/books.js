export default function getBooks(page, pageSize) {
    const bookcover = [{ title: "C++ Primer Plus", author: "Stephen Parata", price: 20000, tag: ["计算机", "编程", "进口书"], description: "这本久负盛名的 C++ 经典教程，时隔八年之久，终迎来史无前例的重大升级。除令全球无数程序员从中受益，甚至为之迷醉的——C++ 大师 Stanley B. Lippman 的丰富实践经验，C++标准委员会原负责人 Josée Lajoie 对C++标准的深入理解，以及C+ + 先驱 Barbara E. Moo 在 C++教学方面的真知灼见外，更是基于全新的 C++11标准进行了全面而彻底的内容更新。非常难能可贵的是，本书所有示例均全部采用 C++11 标准改写，这在经典升级版中极其罕见——充分体现了 C++ 语言的重大进展及其全面实践。书中丰富的教学辅助内容、醒目的知识点提示，以及精心组织的编程示范，让这本书在 C++ 领域的权威地位更加不可动摇。无论是初学者入门，或是中、高级程序员提升，本书均为不容置疑的首选。" },
    { title: "Excel 函数与公式速查手册（第2版）", author: "赛贝尔咨询", price: 3000, tag: ["计算机", "办公软件"], description: "Excel" },
    { title: "Java轻松学", author: "AAA", price: 1000, tag: ["计算机", "编程", "进口书"], description: "java" }, { title: "MySQL必知必会", author: "AAA", price: 1000, tag: ["计算机", "数据库", "进口书"], description: "MySQL" },
    { title: "Python编程 从入门到实践", author: "AAA", price: 1050, tag: ["计算机", "编程", "进口书"], description: "Python" },
    { title: "千字文", author: "AAA", price: 1000, tag: ["文学", "名著", "教育"], description: "Chinese books " }, { title: "史记", author: "AAA", price: 1000, tag: ["文学", "名著"], description: "Chinese books " }, { title: "声律启蒙", author: "AAA", price: 1000, tag: ["文学", "名著"], description: "Chinese books " },
    { title: "悲惨世界", author: "AAA", price: 1000, tag: ["文学", "名著"], description: "Chinese books " }, { title: "活着", author: "AAA", price: 1000, tag: ["文学", "名著"], description: "Chinese books " },
    { title: "现代C++编程", author: "AAA", price: 1000, tag: ["计算机", "编程"], description: "Chinese books " }, { title: "许三观卖血记", author: "AAA", price: 1000, tag: ["文学", "名著"], description: "Chinese books " }];

    const books = bookcover.map((item, index) => {
        return { title: item.title, cover: process.env.PUBLIC_URL + './BookCover/' + item.title + '.jpg', author: item.author, price: item.price, tag: item.tag, description: item.description };
    });

    return { books };
}