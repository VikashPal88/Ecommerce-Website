import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './features/product-list/components/ProductList'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import Signup from './features/auth/components/Signup'
import SignupPage from './pages/SignupPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Cart from './features/cart/component/Cart'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import ProductDetailPage from './pages/ProductDetailPage'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice'
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice'
import PageNotFound from './pages/404'
import OrderSuccessPage from './pages/OrderSuccessPage'
import UserOrders from './features/user/component/UserOrders'
import UserOrdersPage from './pages/UserOrdersPage'
import UserProfile from './features/user/component/UserProfile'
import UserProfilePage from './pages/UserProfilePage'
import { fetchLoggedInUserAsync } from './features/user/userSlice'
import Logout from './features/auth/components/Logout'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import AdminHome from './pages/AdminHome'
import AdminProductList from './features/admin/component/AdminProductList'
import AdminProductDetailPage from './pages/AdminProductDetailPage'
import ProductForm from './features/admin/component/ProductForm'
import AdminProductFormPage from './pages/AdminProductFormPage'
import AdminOrdersPage from './pages/AdminOrdersPage'
import Protected from './features/auth/components/Protected'
import ProtectedAdmin from './features/auth/components/ProtectedAdmin'
import StripeCheckout from './pages/StripeCheckout'





const router = createBrowserRouter([
  {
    path: "/",
    element: <><Protected children={<Home />} /> </>
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/cart",
    element: <><Protected children={<Cart />} /> </>
  },
  {
    path: "/checkout",
    element: <><Protected children={<Checkout />} /> </>
  },
  {
    path: "/product-detail/:id",
    element: <><Protected children={<ProductDetailPage />} /> </>
  },
  {
    path: "/orders",
    element: <><Protected children={<UserOrdersPage />} /> </>
  },
  {
    path: "/order-success/:id",
    element: <><Protected children={<OrderSuccessPage />} /> </>
  },
  {
    path: "/profile",
    element: <><Protected children={<UserProfilePage />} /> </>
  },
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />
  },
  {
    path: "/stripe-checkout",
    element: <><Protected children={<StripeCheckout />} /> </>
  },
  {
    path: "/admin/adminHome",
    element: <><ProtectedAdmin children={<AdminHome />} /></>
  },
  {
    path: "/admin/productPage",
    element: <ProtectedAdmin children={<AdminProductDetailPage />} />
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin children={<AdminProductFormPage />} />
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <><ProtectedAdmin children={<AdminProductFormPage />} /></>
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin children={<AdminOrdersPage />} />
  },
  {
    path: "*",
    element: <PageNotFound />
  },

])


function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  const userChecked = useSelector(selectUserChecked)
  console.log(user)

  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  }, [dispatch, user])

  return (
    <>
      <div>
        {userChecked && <RouterProvider router={router} />}
        {/* <RouterProvider router={router} /> */}
      </div>

    </>
  )
}

export default App
