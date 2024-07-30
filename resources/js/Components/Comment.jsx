import React, { useEffect, useState } from 'react';
import { Button, Form, Input, List } from 'antd';
import axios from 'axios';
const { TextArea } = Input;
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Comment = ({ page, auth }) => {

    const [form] = Form.useForm();
    const [commentsData, setCommentsDaata] = useState([]);

    useEffect(() => {
        console.log('PPP', page, 'Auth', auth);
        getComments();
    }, []);

    async function getComments() {
        try {
            const response = await axios.get(route('Comment.index', { page_id: page.id }));
            // setDesc(response.data);
            console.log('ddds', response);
            setCommentsDaata(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        const obj = {
            content: values.content,
            page_id: page.id,
            user_id: auth.user? auth.user.id: null,
            name: auth.user ? null : values.name,
        }
        axios.post(route('Comment.store'), obj)
            .then(function (response) {
                console.log(response);
                getComments();
                form.resetFields();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className='comments' style={{
            margin: '80px 0 0 0',
        }}>

            <div className="comment-list">
                <List
                locale={{emptyText: 'No comment yet'}}
                    itemLayout="horizontal"
                    dataSource={commentsData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<p className='p1'>{item.content}</p>}
                                description={<p className='p2'> <span className='s1'>{item.user? item.user.name: item.name}</span> <span>{dayjs(item.updated_at).fromNow()}</span> </p>}
                            />
                        </List.Item>
                    )}
                />
            </div>


            <Form
                form={form}
                name="wrap"
                labelAlign="left"
                labelWrap
                onFinish={onFinish}
                wrapperCol={{
                    flex: 1,
                }}
                colon={false}
                style={{
                    maxWidth: 600,
                }}
            >
            {!auth.user && (
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>
            )}

                <Form.Item
                    label=""
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TextArea
                        showCount
                        maxLength={100}
                        placeholder="Comment..."
                        style={{ height: 120, resize: 'none' }}
                    />
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Comment;