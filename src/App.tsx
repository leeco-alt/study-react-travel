import React, { useEffect } from 'react'
import styles from './App.module.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useSelector } from './redux/hooks'
import { useDispatch } from 'react-redux'
import { getShoppingCart } from './redux/shoppingCart/slice'
import { AppDispatch } from './redux/store'
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage
} from './pages'

// 这里是 react-router v6 的私有路由实现推荐方法
const RequireAuth = ({ children, redirectTo, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

function App() {
  const jwt = useSelector((s) => s.user.token)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="/search/" element={<SearchPage />} />
          <Route path="/search/:keywords" element={<SearchPage />} />
          <Route path="*" element={<h1>404 not fount</h1>} />
          <Route
            path="/shoppingCart"
            element={
              <RequireAuth redirectTo={'/signIn'} isAuthenticated={jwt !== null}>
                <ShoppingCartPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
