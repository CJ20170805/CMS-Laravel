import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  GoldOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Inertia } from '@inertiajs/inertia';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Release', 'release_sub', <PieChartOutlined />, [
    getItem('relase', 'admin.release.index'),
    getItem('list', 'admin.release.list'),
  ]),
  getItem('Categories', 'categories_sub', <GoldOutlined />, [
    getItem('create', 'admin.categories.index'),
    getItem('list', 'admin.categories.list'),
  ]),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];
const DashboardLayout = ({ user, children, title }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick = (item) => {
    console.log('xxx', item, item.key);
    Inertia.get(route(item.key));
}
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className={`admin-logo ${collapsed ? 'logo-collapsed' : ''}`}>
          Admin
        </div>
        <Menu theme="dark" defaultSelectedKeys={['admin.release']} mode="inline" onClick={onMenuClick} items={items} />
      </Sider>
      <Layout
         style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <div className="dashboard-auth hidden sm:flex sm:items-center sm:ms-6">
            <div className="ms-3 relative">
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                      {user.name}

                      <svg
                        className="ms-2 -me-0.5 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                  <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                  <Dropdown.Link href={route('logout')} method="post" as="button">
                    Log Out
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '0 16px',
            flex: '1 1 0%',
            overflow: 'auto',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {title && title.map(item=>{
              return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            })}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;