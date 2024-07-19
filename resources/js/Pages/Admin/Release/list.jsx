import React, { useState, useEffect } from 'react';
import DashboardLayout from "@/Layouts/DashboardLayout"
import {
    Button, Modal, Table, Form,
    Input,
    Select,
} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Inertia } from '@inertiajs/inertia';
const { confirm } = Modal;

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

const ReleaseList = ({ auth, pages, categories }) => {

    const [form] = Form.useForm();

    let columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            showSorterTooltip: {
                target: 'full-header',
            },
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Content',
            dataIndex: 'content',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Created_at',
            dataIndex: 'created_at',
            defaultSortOrder: 'descend',
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
        },
        {
            title: 'Updated_at',
            dataIndex: 'updated_at',
            defaultSortOrder: 'descend',
            sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
        },
        {
            title: 'Edit',
            key: 'edit',
            fixed: 'right',
            width: 70,
            render: (text, record, index) => <a onClick={() => handleEdit(text, record, index)}>Edit</a>,
        },
        {
            title: 'Delete',
            key: 'delete',
            fixed: 'right',
            width: 70,
            render: (text, record, index) => <a onClick={() => handleDelete(text, record, index)} style={{ color: 'red' }}>Delete</a>,
        },
    ];

    let data = [];


    console.log('pages', pages);

    data = pages.map((item) => {
        return {
            key: item.id,
            id: item.id,
            title: item.title,
            content: item.content,
            category: item.category.name,
            category_id: item.category.id,
            created_at: dayjs(item.created_at).format('YYYY/MM/DD hh:mm:ss'),
            updated_at: dayjs(item.updated_at).format('YYYY/MM/DD hh:mm:ss'),
        }
    });


    const [detailId, setDetailId] = useState(null);

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);


    const handleSubmit = (data) => {
        console.log('xxx44', data, detailId);
        //update detail by detailId
        Inertia.put(route('pages.update', detailId), data);
        setConfirmLoading(false);
        setOpen(false);

    };

    const handleEdit = (text, record, index) => {
        console.log('edit', text, record, index);
        setDetailId(record.id);
        form.setFieldsValue(record);
        showModal();
    }

    const handleDelete = (text, record, index) => {
        console.log('xdededde', record);
        confirm({
            title: 'Are you sure delete this page?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                Inertia.delete(route('pages.destroy', record.id));
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        // setTimeout(() => {
        //     setOpen(false);
        //     setConfirmLoading(false);
        // }, 2000);
        
        //submit form
        form.submit();
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };



    return (
        <>
            <Modal
                title="Edit"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    {...formItemLayout}
                    form={form}
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
                </Form>
            </Modal>
            <DashboardLayout user={auth.user} title={['Admin', 'release', 'list']}>
                <Table
                    columns={columns}
                    dataSource={data}
                    onChange={onChange}
                    showSorterTooltip={{
                        target: 'sorter-icon',
                    }}
                    bordered
                />
            </DashboardLayout>
        </>
    );
}
export default ReleaseList;