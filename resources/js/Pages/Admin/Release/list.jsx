import React, { useState, useEffect } from 'react';
import DashboardLayout from "@/Layouts/DashboardLayout"
import './release.scss';
import {
    Button, Modal, Table, Form,
    Input,
    Select,
} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import axios from 'axios';
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

const ReleaseList = ({ auth, categories }) => {

    const [form] = Form.useForm();
    const [pages, setPages] = useState([]);


    useEffect(() => {
        fetchPages();
    }, []);


    const fetchPages = async (sortBy = 'created_at', sortDirection = 'desc') => {
        try {
            const res = await axios.get(route('admin.release.list.order'), { params: { sortBy, sortDirection } });
            console.log('res', res.data);
            const data = res.data.map((item) => {
                return {
                    key: item.id,
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    // category: item.category.name,
                    category: item.categories,
                    // category_id: item.category.id,
                    created_at: dayjs(item.created_at).format('YYYY/MM/DD hh:mm:ss'),
                    updated_at: dayjs(item.updated_at).format('YYYY/MM/DD hh:mm:ss'),
                }
            });
            setPages(data);
        } catch (error) {
            message.error('Error fetching pages');
            console.error('Error fetching pages:', error);
        }
    };


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
            sorter: true,
        },
        {
            title: 'Content',
            dataIndex: 'content',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: (categories) => (
                <div>
                    {categories.map(category => (
                        <div className='category-span' key={category.id}>{category.name}</div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Created_at',
            dataIndex: 'created_at',
            sorter: true,
        },
        {
            title: 'Updated_at',
            dataIndex: 'updated_at',
            sorter: true,
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
        let rc = {
            title: record.title,
            content: record.content,
            categories: record.category.map(category => category.id),
        }
        form.setFieldsValue(rc);
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

    const onChange = async (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);

        const sortBy = sorter.field || 'title';
        const sortDirection = sorter.order === 'descend' ? 'desc' : 'asc';
        fetchPages(sortBy, sortDirection);

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
            <Head title="Relase list" />
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
                            categories.map(item=>{
                                return {value: item.id, label: item.name, key: item.id}
                            }
                            )
                         }
                        / >
                    </Form.Item>
                </Form>
            </Modal>
            <DashboardLayout user={auth.user} title={['Admin', 'release', 'list']}>
                <Table
                    columns={columns}
                    dataSource={pages}
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