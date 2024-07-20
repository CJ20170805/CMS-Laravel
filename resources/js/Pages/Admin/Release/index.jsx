import './release.scss'
import DashboardLayout from "@/Layouts/DashboardLayout"
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm, Head } from '@inertiajs/react';
import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};

const AdminRelase = ({ auth, categories }) => {

    const handleSubmit = (data) => {
        let d = {...data, categories: [data.category_id]};
        Inertia.post(route('pages.store'), d, {
            onSuccess: () => reset(),
        });
    };



    return (
        <DashboardLayout user={auth.user} title={['Admin', 'release']}>
            <Head title="Release" />
            <Form
                {...formItemLayout}
                onFinish={handleSubmit}
                variant="filled"
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>


                <Form.Item
                    label="Category"
                    name="category_id"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Select>
                        {
                            categories.map((category) => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </DashboardLayout>
    )
}

export default AdminRelase