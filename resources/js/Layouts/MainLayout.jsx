import React from 'react';
import { Link } from '@inertiajs/react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { Inertia } from '@inertiajs/inertia';

const items = [
    {
        key: '/', label: 'Home'
    },
    // {
    //     key: 'news', label: 'News'
    // }
];


const Home = ({ auth, children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onMenuClick = (item, key) => {
        console.log('xxx', item, item.key, route());
        Inertia.get(route(item.key));
    }

    return (
        <Layout style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="logo">CMS</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['']}
                    items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                    onClick={onMenuClick}
                />

                <div className="auth-bar">
                    {auth.user ? (
                        <Link
                            href={route('admin.index')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </Header>
            <Content
                style={{
                    padding: '0 48px',
                    flex: '1',
                    overflowY: 'auto',
                    background: '#fff',
                }}
            >
                <div className='content'
                >
                    {children}
                </div>
            </Content>
        </Layout>
    );
};
export default Home;