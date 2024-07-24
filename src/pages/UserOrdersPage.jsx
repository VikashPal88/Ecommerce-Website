import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/user/component/UserOrders'

function UserOrdersPage() {
    return (
        <div>
            <Navbar />
            <h1 className='text-3xl font-bold'>My Orders</h1>
            <UserOrders />
        </div>
    )
}

export default UserOrdersPage
