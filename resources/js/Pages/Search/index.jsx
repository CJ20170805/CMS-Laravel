import MainLayout from '@/Layouts/MainLayout'
import React, { useEffect, useState } from 'react';
import { Input, List, Select, Pagination } from 'antd';
import { Head } from '@inertiajs/react';
import './search.scss';
import axios from 'axios';

const { Search } = Input;


const SearchPage = ({ auth }) => {

    const [categoriesArray, setCategoriesArray] = useState([]);
    const [category, setCategory] = useState('');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    useEffect(() => {
        fetchCategories(true);
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get(route('admin.categories.listAll'));
        console.log(response.data);
        const navArray = response.data.map(item => ({
            key: item.id,
            label: item.name,
        }));

        navArray.unshift({ key: '', label: 'All' });
        setCategoriesArray(navArray);
    }

    const handleCategory = (value) => {
        setCategory(value);
    }

    const selectBefore = (
        <Select
            defaultValue="All categories"
            style={{
                width: 150,
            }}
            onChange={handleCategory}
        >
            {categoriesArray.map(item => <Option key={item.key}>{item.label}</Option>)}
        </Select>
    );

    const handlePaginationChange = (page, pageSize) => {
        console.log('handlePaginationChange', page, pageSize);
       handleSearch(query, page, pageSize);
    };
  

    const handleSearch = async (value, page = 1, pageSize = perPage) => {
        console.log('xsss22222', value, page, pageSize);
        setQuery(value);
        setCurrentPage(page);
        setPerPage(pageSize);

        const response = await axios.get(route('page.search'), {
            params: {
                query: value, 
                category_id: category, 
                per_page: pageSize,
                page: page
            }
        });

   
        //limited 100 maxium strings, if oversize add '...' at the end
        const data = response.data.data.map(item => {
            if (item.content.length > 200) {
                item.content = item.content.substring(0, 200) + '...';
            }
            return item;
        });

        setResults(data);
        setTotal(response.data.total);
    };
    return (
        <MainLayout auth={auth}>
            <Head title="Search" />
            <div className="search-wrapper">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={v=>handleSearch(v, currentPage, perPage)}
                    addonBefore={
                        selectBefore
                    }
                />
                <div className="result">
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={results}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                extra={<a href={`/pages/${item.id}`}>View Page</a>}
                            >
                                <List.Item.Meta
                                    title={<a href={`/pages/${item.id}`}>{item.title}</a>}
                                    description={item.content}
                                />
                            </List.Item>
                        )}
                    />

                    {total > 5 && <Pagination
                        current={currentPage}
                        pageSize={perPage}
                        total={total}
                        showSizeChanger
                        pageSizeOptions={[5, 10, 20, 50]}
                        onChange={handlePaginationChange}
                        onShowSizeChange={handlePaginationChange}
                    />}
                </div>
            </div>
        </MainLayout>

    )
}
export default SearchPage;