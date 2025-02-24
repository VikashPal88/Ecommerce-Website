import React, { useState } from 'react'

import { Link, Navigate } from 'react-router-dom'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItemFromCartAsync, selectItems, updateCartAsync } from '../features/cart/cartSlice'

import { useForm } from "react-hook-form"
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice'
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice'
import { selectUserInfo } from '../features/user/userSlice'

function Checkout() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentMethod, setPayemntMethod] = useState(null)
    const currentOrder = useSelector(selectCurrentOrder)

    const { register, handleSubmit, reset, formState: { errors }, } = useForm()

    const user = useSelector(selectUserInfo)
    const items = useSelector(selectItems)





    let totalAmount = Math.round(items.reduce((total, item) => total + (item.product.price * item.quantity), 0))

    let totalItemC = Math.round(items.reduce((total, item) => total + item.quantity, 0))

    // const totalAmount = 1000
    // const totalItemC = 5

    const handleQuantity = (e, item) => {
        dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }))
    }

    const handleRemove = (e, itemId) => {
        dispatch(deleteItemFromCartAsync(itemId))
    }


    const handleAddress = (e) => {
        console.log(e.target.value)
        setSelectedAddress(user.addresses[e.target.value])
    }

    const handlePayment = (e) => {
        setPayemntMethod(e.target.value)
    }

    const handleOrder = () => {

        const order = {
            items,
            totalAmount,
            totalItemC,
            user: user.id,
            paymentMethod,
            selectedAddress,
            status: "pending"
        }
        dispatch(createOrderAsync(order))
        // Todo: redirect to order-success page
        // Todo: clear cart after order
        // Todo: on server change the stock number of items
    }


    return (
        <>
            {!items.length && <Navigate to="/" replace={true}></Navigate>}
            {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px:8'>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className='lg:col-span-3 text-left'>
                        <form className='bg-white py-1 px-4' noValidate onSubmit={handleSubmit((data) => {
                            dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }))
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
                                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                            Street address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("street", { required: "street-address is required" })}
                                                id="street"
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
                                <button type="button" class="text-sm font-semibold leading-6 text-gray-900">reset</button>
                                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Address</button>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Choose from existing addresses
                                </p>
                                <ul role="list" className="divide-y divide-gray-100">

                                    {items.length > 0 && user.addresses.map((address, index) => (
                                        <li key={index} className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200">
                                            <div className="flex min-w-0 gap-x-4">
                                                <input
                                                    name="address"
                                                    type="radio"
                                                    onChange={handleAddress}
                                                    value={index}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />

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

                                <div className="mt-10 space-y-10">

                                    <fieldset>
                                        <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">Choose one</p>
                                        <div className="mt-6 space-y-6">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="cash-payment"
                                                    name="payments"
                                                    type="radio"
                                                    onChange={handlePayment}
                                                    value="cash"
                                                    checked={paymentMethod === "cash"}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Cash
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="push-email"
                                                    name="payments"
                                                    type="radio"
                                                    onChange={handlePayment}
                                                    value="card"
                                                    checked={paymentMethod === "card"}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="card-payment" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Card Payment
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>

                        </form>
                    </div>

                    {/* {cart component} */}

                    <div className="lg:col-span-2">
                        <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-6">
                            <h2 className='text-4xl font-bold'>Cart</h2>
                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {items && items.length > 0 && items.map((item) => (
                                            <li key={item.userId} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.product.thumbnail}
                                                        alt={item.product.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={item.product.id}>{item.product.title}</a>
                                                            </h3>
                                                            <p className="ml-4">${item.product.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm"><div>
                                                        <label htmlFor="quantity" className="inline text-sm mr-5 font-medium leading-6 text-gray-900">
                                                            Qty
                                                        </label>
                                                        <select onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>



                                                        <div className="flex">
                                                            <button
                                                                onClick={(e) => handleRemove(e, item.id)}
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>


                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${totalAmount}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total Items in Cart</p>
                                    <p>{totalItemC}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <div
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
                                        onClick={handleOrder}
                                    >
                                        Oder Now
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <Link to="/">
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={() => setOpen(false)}
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>

        </>

    )
}

export default Checkout

