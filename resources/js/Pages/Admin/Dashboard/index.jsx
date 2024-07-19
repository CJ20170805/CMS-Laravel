import DashboardLayout from "@/Layouts/DashboardLayout"

const AdminDashboard = ({auth}) =>{
    return(
        <DashboardLayout user={auth.user}>
        <div>
            <h1>Admin Dashboard</h1>
        </div>
        </DashboardLayout>
    )
}

export default AdminDashboard