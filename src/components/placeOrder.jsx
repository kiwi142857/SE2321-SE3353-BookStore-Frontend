import { Button, Form, Input, Modal } from "antd";
import React from "react";
import useMessage from "antd/es/message/useMessage";
import { placeOrder } from "../service/order";
import { handleBaseApiResponse } from "../utils/message";

const { TextArea } = Input;
export default function PlaceOrderModal({
    selectedItems, 
    onOk,
    onCancel, }) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = useMessage();

    const handleSubmit = async ({ address, receiver, tel }) => {
        if (!address || !receiver || !tel) {
            messageApi.error("请填写完整信息！");
            return;
        }
        let orderInfo = {
            address,
            receiver,
            tel,
            itemIds: selectedItems.map(item => item.id)
        }
        let res = await placeOrder(orderInfo);
        handleBaseApiResponse(res, messageApi, onOk, onCancel);
    };

    return (
        <Modal
            title={"确认下单"}
            open
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                preserve={false}
            >
                <Form.Item
                    name="receiver"
                    label="收货人"
                    required
                >
                    <Input placeholder="请输入收货人姓名"/>
                </Form.Item>
                <Form.Item
                    name="tel"
                    label="联系电话"
                    required
                    rules={[
                        {
                            required: true,
                            message: '请输入你的电话号码!',
                        },
                        {
                            pattern: /^1[3-9]\d{9}$/,
                            message: '请输入正确的电话号码!',
                        },
                    ]}
                >
                    <Input placeholder="请输入你的电话号码"/>
                </Form.Item>
                <Form.Item
                    name="address"
                    label="收货地址"
                    required
                >
                    <TextArea rows={2} maxLength={817} placeholder="请输入收货地址"/>
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