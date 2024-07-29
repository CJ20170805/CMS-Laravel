import React, { useEffect, useState } from 'react';
import './home.scss'
import MainLayout from '@/Layouts/MainLayout'
import { Head } from '@inertiajs/react'
import axios from 'axios';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import bgImg from '../../../images/bg.png';
import avatarImg from '../../../images/avatar.svg';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Home = ({ auth }) => {

  const [data, setData] = useState([]);

  const fetchPages = async () => {
    const response = await axios.get(route('pages.list'));
    console.log(response.data);
    const data = response.data.map(item => ({
      key: item.id,
      id: item.id,
      title: item.title,
      content: item.content,
      category: item.categories,
      created_at: dayjs(item.created_at).fromNow(),
      updated_at: dayjs(item.updated_at).fromNow(),
      href: route('pages.show', item.id),
      avatar: avatarImg,
      description: '',
    }));
    setData(data);
  }

  useEffect(() => {
    fetchPages();
  }, [])
  return (
    <MainLayout auth={auth}>
      <Head title="Home" />
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
          position: 'bottom',
          align: 'end',

        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            // actions={[
            //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            // ]}
            extra={
              <img
                width={272}
                alt="logo"
                src={bgImg}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={`Last update: ${item.updated_at}`}
            />
            {item.content.length > 100 ? item.content.slice(0, 100) + '...' : item.content}
          </List.Item>
        )}
      />
    </MainLayout>
  );
};
export default Home;