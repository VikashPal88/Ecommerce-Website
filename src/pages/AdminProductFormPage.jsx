import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductForm from '../features/admin/component/ProductForm'

function AdminProductFormPage() {
    return (
        <div>
            <Navbar children={<ProductForm />} />

        </div>
    )
}

export default AdminProductFormPage
