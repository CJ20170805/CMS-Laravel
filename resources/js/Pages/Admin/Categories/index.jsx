import DashboardLayout from "@/Layouts/DashboardLayout"
import { useForm, Head } from '@inertiajs/react';
import React from 'react';
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

const CategoriesRelase = ({ auth, pages }) => {

    console.log('pagesss');
    const { data, setData, post, processing, reset, errors } = useForm({
        content: '',
    });
    
    const submit = (e) => {
        //e.preventDefault();
        console.log('eeeee', e);
        //post(route('chirps.store'), { onSuccess: () => reset() });
    };


    return (
        <DashboardLayout user={auth.user} title={['Admin', 'categories']}>

            <Form
                {...formItemLayout}
                variant="filled"
                style={{
                    maxWidth: 600,
                }}
                onFinish={submit}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

{/* 
                <Form.Item
                    label="Select"
                    name="Select"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Select />
                </Form.Item> */}

                {/* <Form.Item
                    label="Date"
                    name="DatePicker"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item> */}


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

export default CategoriesRelase