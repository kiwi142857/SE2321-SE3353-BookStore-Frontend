import { Tag } from 'antd';

function BookTags({ tags }) {
    return (
        <>
            {tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
            ))}
        </>
    );
}

export default BookTags;