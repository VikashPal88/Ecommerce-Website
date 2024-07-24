import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/component/UserProfile'

function UserProfilePage() {
    return (

        <div>
            <Navbar />
            <h1 className='text-3xl font-bold text-left'>My Profile</h1>
            <UserProfile />
        </div>

    )
}

export default UserProfilePage
