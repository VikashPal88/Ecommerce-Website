import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../auth/authSlice'
import { selectUserInfo, updateUserAsync } from '../userSlice'
import { set, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

function UserProfile() {
    const [selectedEditIndex, setSelectedEditIndex] = useState(-1)
    const [showAddressForm, setShowAddressForm] = useState(false)
    const dispatch = useDispatch()
    const userInfo = useSelector(selectUserInfo)
    const { register, handleSubmit, reset, setValue, formState: { errors }, } = useForm()

    const handleEdit = (addressUpdate, index) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
        newUser.addresses.splice(index, 1, addressUpdate);
        dispatch(updateUserAsync(newUser))
        selectedEditIndex(-1)

    }

    const handleRemove = (e, index) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
        newUser.addresses.splice(index, 1)
        dispatch(updateUserAsync(newUser))
    }

    const handleEditForm = (index) => {
        setSelectedEditIndex(index)
        const address = userInfo.addresses[index]
        setValue("name", address.name)
        setValue("email", address.email)
        setValue("pinCode", address.pinCode)
        setValue("street", address.street)
        setValue("city", address.city)
        setValue("phone", address.phone)
        setValue("state", address.state)
    }





    const handleAdd = (address) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] }
        dispatch(updateUserAsync(newUser))
        setShowAddressForm(false)
    }


    return (
        <>
            {userInfo === null && <Navigate to="/" replace={true}></Navigate>
            }
            <div>
                <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className='text-4xl font-bold text-left'>Name : {"new user"}</h2>
                    <h3 className='text-2xl font-bold text-left text-red-400'>Email: {userInfo.email}</h3>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <button
                            onClick={(e) => {
                                setShowAddressForm(true);
                                setSelectedEditIndex(-1);
                            }}
                            type="submit"
                            className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add New Address
                        </button>
                        {showAddressForm ? (
                            <form className='bg-white py-1 px-4 text-left' noValidate onSubmit={handleSubmit((data, index) => {
                                handleAdd(data, index)
                                reset()
                            })}>
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className=" font-semibold leading-7 text-gray-900 text-2xl">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("name", { required: "name is required" })}
                                                    id="name"

                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>


                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register("email", { required: "email is required" })}
                                                    type="email"

                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone No
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    {...register("phone", { required: "phone is required" })}
                                                    type="tel"

                                                    autoComplete="phone"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("street", { required: "street-address is required" })}
                                                    id="street-address"

                                                    autoComplete="street-address"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("city", { required: "city is required" })}
                                                    id="city"

                                                    autoComplete="address-level2"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("state", { required: "region is required" })}
                                                    id="state"
                                                    autoComplete="address-level1"

                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="pinCode"

                                                    {...register("pinCode", { required: "pinCode is required" })}
                                                    autoComplete="postal-code"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-6 flex items-center justify-end gap-x-6">
                                    <button
                                        onClick={(e) => setSelectedEditIndex(-1)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Address</button>
                                </div>

                                <div className=" pb-12">

                                    <ul role="list" className="divide-y divide-gray-1000">
                                        {userInfo.length > 0 && userInfo.addresses.map((address, index) => (
                                            <li key={index} className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200">
                                                <div className="flex min-w-0 gap-x-4 text-left">

                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                                                    </div>
                                                </div>

                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
                                                    <p className="text-sm leading-6 text-gray-900">{address.city}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </form>) : null}

                        <p className='mt0.5 text-sm text-gray-500 text-left'>
                            Shipping Address
                        </p>



                        {userInfo.addresses && userInfo.addresses.length > 0 && userInfo.addresses.map((address, index) => (
                            <div key={index}>
                                <div>
                                    {selectedEditIndex === index ? <form className='bg-white py-1 px-4 text-left' noValidate onSubmit={handleSubmit((data) => {
                                        handleEdit(data, index)
                                        reset()
                                    })}>
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className=" font-semibold leading-7 text-gray-900 text-2xl">Personal Information</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Full Name
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("name", { required: "name is required" })}
                                                            id="name"

                                                            autoComplete="given-name"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="sm:col-span-4">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Email address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="email"
                                                            {...register("email", { required: "email is required" })}
                                                            type="email"

                                                            autoComplete="email"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Phone No
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="phone"
                                                            {...register("phone", { required: "phone is required" })}
                                                            type="tel"

                                                            autoComplete="phone"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Street address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("street", { required: "street-address is required" })}
                                                            id="street-address"

                                                            autoComplete="street-address"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 sm:col-start-1">
                                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                        City
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("city", { required: "city is required" })}
                                                            id="city"

                                                            autoComplete="address-level2"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                        State / Province
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register("state", { required: "region is required" })}
                                                            id="state"
                                                            autoComplete="address-level1"

                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                        ZIP / Postal code
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            id="pinCode"

                                                            {...register("pinCode", { required: "pinCode is required" })}
                                                            autoComplete="postal-code"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-6 flex items-center justify-end gap-x-6">
                                            <button
                                                onClick={(e) => setSelectedEditIndex(-1)}
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Cancel
                                            </button>
                                            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit Address</button>
                                        </div>

                                        <div className=" pb-12">

                                            <ul role="list" className="divide-y divide-gray-100">
                                                {userInfo.length > 0 && userInfo.addresses.map((address, index) => (
                                                    <li key={index} className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200">
                                                        <div className="flex min-w-0 gap-x-4 text-left">

                                                            <div className="min-w-0 flex-auto">
                                                                <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                                                            </div>
                                                        </div>

                                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                            <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
                                                            <p className="text-sm leading-6 text-gray-900">{address.city}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </form> : null}
                                </div>
                                <div key={index} className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200">
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                                        </div>
                                    </div>

                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
                                        <p className="text-sm leading-6 text-gray-900">{address.city}</p>
                                    </div>
                                    <div className='hidden sm:flex sm:flex-col sm:items-end'>
                                        <button
                                            onClick={(e) => handleEditForm(index)}
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => handleRemove(e, index)}
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile
