import { Button, Form, Input, Modal } from "antd";
import React from "react";
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { changePassword } from "../service/user";

const { Password } = Input;

export default function ChangePasswordModal({
    onOk,
    onCancel,
    user }) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = useMessage();

    const handleSubmit = async ({ oldPassword, newPassword, confirm }) => {
        if (!newPassword || !confirm) {
            messageApi.error("请填写完整信息！");
            return;
        }
        if (newPassword !== confirm) {
            messageApi.error("新密码和确认新密码不一致！");
            return;
        }
        let request = {
            oldPassword,
            newPassword
        }
        let res = await changePassword(request);
        handleBaseApiResponse(res, messageApi, onOk);
    };

    return (
        <Modal
            title={"修改密码"}
            open
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            {contextHolder}
            <p>
                修改用户 <span style={{ color: 'blue' }}>{user.nickname}</span> 的密码
            </p>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                preserve={false}
            >
                <Form.Item
                    name="oldPassword"
                    label="旧密码"
                    required
                    rules={[{ required: true, message: '请输入旧密码！' }]}
                >
                    <Password placeholder="请输入旧密码" />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    label="新密码"
                    required
                    rules={[
                        {
                            required: true,
                            message: '请输入新密码！',
                        },
                    ]}
                >
                    <Password placeholder="请输入新密码" />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="确认新密码"
                    required
                    dependencies={['newPassword']}
                    rules={[
                        {
                            required: true,
                            message: '请再次输入新密码！',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('新密码和确认新密码不一致！'));
                            },
                        }),
                    ]}
                >
                    <Password placeholder="请再次输入新密码" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};