import { Tag } from 'antd';

function BookTags({ tags }) {
    if(!tags) tags = ["畅销"];
    return (
        <>
            {tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
            ))}
        </>
    );
}

export default BookTags;