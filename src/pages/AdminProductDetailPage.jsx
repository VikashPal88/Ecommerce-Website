import React from 'react'
import Navbar from "../features/navbar/Navbar"
import AdminProductDetail from '../features/admin/component/AdminProductDetails'

function AdminProductDetailPage() {
    return (
        <div>
            <Navbar children={<AdminProductDetail />} />

        </div>
    )
}

export default AdminProductDetailPage
