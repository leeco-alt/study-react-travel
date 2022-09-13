import React, { useEffect } from 'react'
import styles from './SearchPage.module.css'
import { Header, Footer, FilterArea, ProductList } from '../../components'
import { useParams, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import { searchProduct } from '../../redux/productSearch/slice'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { MainLayout } from '../../layouts/mainLayout'

interface MatchParams {
  keywords: string
}

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<keyof MatchParams>()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()

  const loading = useSelector((state) => state.productSearch.loading)
  const error = useSelector((state) => state.productSearch.error)
  const pagination = useSelector((state) => state.productSearch.pagination)
  const productList = useSelector((state) => state.productSearch.data)

  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords: keywords }))
  }, [location])

  const onPageChange = (nextPage, pageSize) => {
    dispatch(searchProduct({ nextPage, pageSize, keywords }))
  }

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 400,
          marginBottom: 400,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%'
        }}
      />
    )
  }

  if (error) {
    return <div>网站出错：{error}</div>
  }

  return (
    <MainLayout>
        {/* 分类过滤器 */}
        <div className={styles['product-list-container']}>
          <FilterArea />
        </div>
        {/* 产品列表 */}
        <div className={styles['product-list-container']}>
          <ProductList data={productList} paging={pagination} onPageChange={onPageChange} />
        </div>
    </MainLayout>
  )
}
