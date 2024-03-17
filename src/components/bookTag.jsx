import { Tag } from 'antd';

function BookTags({ tags }) {
    if(!tags) tags = ["经典","优质","畅销","新书","推荐"];
    return (
        <>
            {tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
            ))}
        </>
    );
}

export default BookTags;