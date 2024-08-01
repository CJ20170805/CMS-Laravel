import MainLayout from '@/Layouts/MainLayout'
import React, { useEffect, useState } from 'react';
import { Input, List, Select } from 'antd';
import { Head } from '@inertiajs/react';
import './search.scss';
import axios from 'axios';

const { Search } = Input;


const SearchPage = ({ auth }) => {

    const [categoriesArray, setCategoriesArray] = useState([]);
    const [category, setCategory] = useState('');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

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



    const handleSearch = async (value) => {
        setQuery(value);

        const response = await axios.get(route('page.search'), { params: { query: value, category_id: category } });

        //limited 100 maxium strings, if oversize add '...' at the end
        const data = response.data.map(item => {
            if (item.content.length > 200) {
                item.content = item.content.substring(0, 200) + '...';
            }
            return item;
        });

        setResults(data);
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
                    onSearch={handleSearch}
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
                </div>
            </div>
        </MainLayout>

    )
}
export default SearchPage;