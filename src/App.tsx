import React from 'react'
import styles from './App.module.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages'

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<h1>登录页面</h1>} />
          <Route path="*" element={<h1>404 not fount</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
