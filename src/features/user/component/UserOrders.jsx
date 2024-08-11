import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUserOrdersAsync, selectUserInfoStatus, selectUserOrders } from '../userSlice'

import { Grid } from 'react-loader-spinner'


function UserOrders() {
    const dispatch = useDispatch()
    const orders = useSelector(selectUserOrders)
    const status = useSelector(selectUserInfoStatus)
    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync())
    }, [dispatch])




    return (
        <>
            <div>
                {orders && orders.length > 0 && orders.map((order) => (
                    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8" key={order.id}>
                        <h2 className='text-4xl font-bold text-left'>Order # {order.id}</h2>
                        <h3 className='text-2xl font-bold text-left text-red-400'>Order Status : {order.status}</h3>
                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {order.items.map((item) => (
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
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div>
                                                        <label htmlFor="quantity" className="inline text-sm mr-5 font-medium leading-6 text-gray-900">
                                                            Qty : {item.product.quantity}
                                                        </label>
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
                                <p>${order.totalAmount}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Total Items in Cart</p>
                                <p>{order.totalItemC} Items</p>
                            </div>
                            <p className='mt0.5 text-sm text-gray-500 text-left'>
                                Shipping Address
                            </p>


                            {
                                order.selectedAddress.map((address, index) => (
                                    <div className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200">
                                        <div className="flex min-w-0 gap-x-4">
                                            <div className="min-w-0 flex-auto">

                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street
                                                }</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                                            </div>
                                        </div>

                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
                                            <p className="text-sm leading-6 text-gray-900">{address.city}</p>
                                        </div>
                                    </div>
                                ))
                            }


                        </div>
                    </div>

                ))}
                {status === 'loading' ? (
                    <Grid
                        height="80"
                        width="80"
                        color="rgb(79, 70, 229) "
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                ) : null}
            </div>

        </>
    )
}

export default UserOrders
