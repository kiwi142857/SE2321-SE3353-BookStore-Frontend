import { likeComment, unlikeComment } from "../service/comment";
import { replyComment } from "../service/comment";
import { Pagination } from "antd";
import { formatTime } from "../utils/time";
import React, { useState } from "react";
import { Row, Col, Space, Tabs, List, Button } from "antd";
import useMessage from "antd/es/message/useMessage";
import { addBookComment } from "../service/book";
import { handleBaseApiResponse } from "../utils/message";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect } from "react";

const { TextArea } = Input;

function UsernameAvatar({ username }) {
    const firstChar = [...username].slice(0)[0];
    return <div style={{
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#f56a00',
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    }}>
        {firstChar}
    </div>;
}

function LikeButton({ defaultNumber, liked, onLike, onUnlike }) {
    const [isLiked, setIsLiked] = useState(liked);
    const [number, setNumber] = useState(defaultNumber);
    useEffect(() => {
        setIsLiked(liked);
        setNumber(defaultNumber);
    }, [liked, defaultNumber]);

    const handleLikeOrUnlike = async (e) => {
        e.preventDefault();
        if (!isLiked) {
            if (await onLike?.()) {
                setIsLiked(true);
                setNumber(number => number + 1);
            }
        } else if (await onUnlike?.()) {
            setIsLiked(false);
            setNumber(number => number - 1);
        }
    };

    return <Space size="small">
        <a onClick={handleLikeOrUnlike}>
            {isLiked && <LikeFilled />}
            {!isLiked && <LikeOutlined />}
        </a>
        {number}
    </Space>;
}

export function CommentInput({ placeholder, onSubmit, autoFocus }) {
    const handleSubmit = () => {
        onSubmit?.(text);
        setText('');
    };

    const [text, setText] = useState('');

    return <Space direction="vertical" style={{ width: "100%" }}>
        <TextArea autoFocus={autoFocus} placeholder={placeholder}
            value={text}
            onChange={e => setText(e.target.value)}
        />
        <Row justify="end">
            <Col><Button type="primary" onClick={handleSubmit}>发布</Button></Col>
        </Row>
    </Space>;
}

export function BookCommentList({ comments, onMutate }) {
    const [replying, setReplying] = useState(-1);
    const handleMutate = () => {
        onMutate?.();
        setReplying(-1);
    };
    return <Space direction="vertical" style={{ width: '100%' }}>
        <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={comment => <BookComment comment={comment}
                isReplying={replying === comment.id}
                onMutate={handleMutate}
                onReply={() => setReplying(comment.id)} />}
        />
    </Space>;
}

export function BookComment({ comment, isReplying, onReply, onMutate }) {
    const content = comment.content;
    const [messageApi, contextHolder] = useMessage();
    const replyMessage = comment.reply ? `回复 ${comment.reply}：` : '';
    const handleReply = (e) => {
        e.preventDefault();
        onReply();
    };

    const handleSubmitReply = async (content) => {
        if (content === "") {
            messageApi.error("回复不得为空！");
            return;
        }
        let res = await replyComment(comment.id, content);
        handleBaseApiResponse(res, messageApi, onMutate);
    };

    const handleLikeComment = async () => {
        let res = await likeComment(comment.id);
        handleBaseApiResponse(res, messageApi);
        return res.ok;
    };

    const handleUnlikeComment = async () => {
        let res = await unlikeComment(comment.id);
        handleBaseApiResponse(res, messageApi);
        return res.ok;
    };

    const contentComponent = <Space direction="vertical" style={{ width: '100%' }}>
        <p style={{ fontSize: 16, color: "black", margin: 0 }}>{replyMessage}{content}</p>
        <Space>
            {formatTime(comment.createdAt)}
            <LikeButton defaultNumber={comment.like} liked={comment.liked}
                onLike={handleLikeComment}
                onUnlike={handleUnlikeComment}
            />
            <a style={{ color: "grey", fontSize: 14 }}
                onClick={handleReply}>回复
            </a>
        </Space>
        {isReplying && <CommentInput placeholder={`回复 ${comment.username}：`}
            onSubmit={handleSubmitReply}
            autoFocus
        />}
    </Space>;

    return <>
        {contextHolder}
        <List.Item key={comment.id}>
            <List.Item.Meta
                avatar={<UsernameAvatar username={comment.username} />}
                title={<div style={{ color: "grey" }}>{comment.username}</div>}
                description={contentComponent}
            />
        </List.Item>
    </>;
}

export default function CommentArea({ comments, onMutate, book, pageIndex, onPageChange, onSortChange, total }) {
    const [messageApi, contextHolder] = useMessage();
    console.log("pageIndex", pageIndex);
    console.log("comments", comments);
    const handleAddComment = async (comment) => {
        if (comment === "") {
            messageApi.error("评论不得为空！");
            return;
        }
        
        let res = await addBookComment(book.id, comment);
        handleBaseApiResponse(res, messageApi, onMutate);
    };

    return (
        <>
            {contextHolder}
            <Tabs defaultActiveKey="createdTime" onChange={onSortChange}>
                <items tab="最新评论" key="createdTime">
                    <CommentInput placeholder="发布一条友善的评论" onSubmit={handleAddComment} />
                    <BookCommentList comments={comments} onMutate={onMutate} />
                </items>
                <items tab="最热评论" key="like">
                    <CommentInput placeholder="发布一条友善的评论" onSubmit={handleAddComment} />
                    <BookCommentList comments={comments} onMutate={onMutate} />
                </items>
            </Tabs>
            <Pagination
                current={pageIndex + 1}
                pageSize={5}
                total={5 * total}
                onChange={onPageChange} />
        </>
    );
}