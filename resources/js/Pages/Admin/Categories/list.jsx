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

const CategoryList = ({ auth, categories }) => {

    const [form] = Form.useForm();
    const [pages, setPages] = useState([]);


    const data = categories.map((item) => {
        return {
            key: item.id,
            id: item.id,
            name: item.name,
            created_at: dayjs(item.created_at).format('YYYY/MM/DD hh:mm:ss'),
            updated_at: dayjs(item.updated_at).format('YYYY/MM/DD hh:mm:ss'),
        }
    });

   


    let columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            showSorterTooltip: {
                target: 'full-header',
            },
        },
        {
            title: 'Created_at',
            dataIndex: 'created_at',
        },
        {
            title: 'Updated_at',
            dataIndex: 'updated_at',
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
        Inertia.put(route('admin.categories.update', detailId), data);
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
                Inertia.delete(route('admin.categories.destroy', record.id));
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const onChange = async (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);

        // const sortBy = sorter.field || 'title';
        // const sortDirection = sorter.order === 'descend' ? 'desc' : 'asc';
        // fetchPages(sortBy, sortDirection);

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

                </Form>
            </Modal>
            <DashboardLayout user={auth.user} title={['Admin', 'categories', 'list']}>
                <Table
                    columns={columns}
                    dataSource={data}
                    onChange={onChange}
                    showSorterTooltip={{
                        target: 'sorter-icon',
                    }}
                    pagination={false}
                    bordered
                />
            </DashboardLayout>
        </>
    );
}
export default CategoryList;