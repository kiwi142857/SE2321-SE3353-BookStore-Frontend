import JAccountQR from "./jaccountQR";
import { Form, Input, Row, Col } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-form';
import { Flex } from 'antd';

// JAccount login form
export default function JAccountLogin({ captcha, captchaIndex, setCaptchaIndex, userCaptcha, setUserCaptcha }) {
    return (
        <>
            <Row>
                <Col span={12}>
                    <JAccountQR url="https://api.sjtu.edu.cn/oauth2/authorize?response_type=code&scope=&client_id=ov3SLrO4HyZSELxcHiqS&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin" />
                </Col>
                <Col span={12}>
                    <Flex gap="small" vertical>
                        <ProFormText
                            className="form-opacity"
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'Username'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'Password'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        />
                        <button
                            style={{ border: 'none' }}
                            onClick={(event) => {
                                event.preventDefault();
                                console.log(captchaIndex);
                                console.log(typeof (setCaptchaIndex));
                                setCaptchaIndex((prevIndex) => (prevIndex + 1) % 3);
                            }}
                        >
                            <img src={process.env.PUBLIC_URL + 'cap_' + captcha[captchaIndex] + '.png'} alt="Captcha" />
                        </button>
                        <Form.Item
                            name="captcha"
                            rules={[{ required: true, message: 'Please input your captcha!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="text"
                                placeholder="Captcha"
                                value={userCaptcha}

                                onChange={(e) => { console.log(typeof (setUserCaptcha)); setUserCaptcha(e.target.value); }}
                            />
                        </Form.Item>
                    </Flex>
                </Col>
            </Row>
        </>
    );
}