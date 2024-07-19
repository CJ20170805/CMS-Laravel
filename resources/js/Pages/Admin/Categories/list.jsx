import DashboardLayout from "@/Layouts/DashboardLayout"

const CategoryList = ({auth, pages}) => {
    console.log('pages', pages);
    return (
        <DashboardLayout user={auth.user} title={['Admin', 'categories', 'list']}>
        <div>
            <h1>Category List</h1>
        </div>
        </DashboardLayout>
    );
};
export default CategoryList;