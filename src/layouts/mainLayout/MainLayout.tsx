import React from 'react'
import styles from './MainLayout.module.css'
import { Header, Footer } from '../../components'

interface PropsType {
  // 这里可能需要再优化
  children?: JSX.Element[] | JSX.Element
}

export const MainLayout: React.FC<PropsType> = (props) => {
  return (
    <>
      <Header />
      {/* 页面内容 */}
      <div className={styles['page-content']}>{props.children}</div>
      <Footer />
    </>
  )
}
