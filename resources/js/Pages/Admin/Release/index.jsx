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
import TextEditor from "@/Components/TextEditor"

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
        Inertia.post(route('pages.store'), data, {
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
                    {/* <Input.TextArea /> */}

                    <TextEditor />
                </Form.Item>


                <Form.Item
                    label="Category"
                    name="categories"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                        options={
                            categories.map(item => {
                                return { value: item.id, label: item.name, key: item.id }
                            }
                            )
                        }
                    / >
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