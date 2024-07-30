import MainLayout from '@/Layouts/MainLayout'
import { Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import Comment from '@/Components/Comment';
import dayjs from 'dayjs';


const PageDetail = ({ auth, page }) => {

    console.log('page', page);

    const [desc, setDesc] = useState([]);

    const obj = [
        {
            key: '1',
            label: 'Title',
            children: page.title,
            span: 3,
        },
        {
            key: '2',
            label: 'Updated_at',
            children: dayjs(page.updated_at).format('YYYY/MM/DD hh:mm:ss'),
        }
    ]
    
    useEffect(() => {
        setDesc(obj);
    }, [])

    return (
        <MainLayout auth={auth}>
            <div className="detail-wrapper">
            <Descriptions style={{marginTop: '20px'}} title="" items={desc} />
            <h2 dangerouslySetInnerHTML={{__html: page.content}}></h2>

            <Comment page={page} auth={auth} />
            </div>
        </MainLayout>
    )
}

export default PageDetail;