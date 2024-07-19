import MainLayout from '@/Layouts/MainLayout'

const News = ({auth}) => {
    return (
        <MainLayout auth={auth}>
            <div>
                <h1>News</h1>
                <h2>Coming soon...</h2>
            </div>
        </MainLayout>
    );
}

export default News;