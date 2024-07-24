import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductList from '../features/admin/component/AdminProductList'

function AdminHome() {
    return (
        <div>
            <Navbar children={<AdminProductList />} />
        </div>
    )
}

export default AdminHome
