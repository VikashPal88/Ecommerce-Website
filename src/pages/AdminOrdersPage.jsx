import React from 'react'
import AdminOrders from '../features/admin/component/AdminOrders'
import Navbar from '../features/navbar/Navbar'

function AdminOrdersPage() {
    return (
        <div>
            <Navbar children={<AdminOrders />} />

        </div>
    )
}

export default AdminOrdersPage
