import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useMatch, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Spin, Row, Col, DatePicker, Space } from 'antd'
import styles from './DetailPage.module.css'
import { Header, Footer, ProductIntro } from '../../components'
import { productDetailSlice } from '../../redux/productDetail/slice'
import { useSelector } from '../../redux/hook'
import { useDispatch } from 'react-redux'

const { RangePicker } = DatePicker

interface MatchParams {
  touristRouteId: string
}
export const DetailPage: React.FC<any> = (
  // export const DetailPage: React.FC<RouteProps<MatchParams>> = (
  props
) => {
  let { touristRouteId } = useParams()
  let location = useLocation()
  let match = useMatch(location.pathname)
  let navigate = useNavigate()
  // const [loading, setLoading] = useState<boolean>(true)
  // const [product, setProduct] = useState<any>(null)
  // const [error, setError] = useState<string | null>(null)

  const loading = useSelector((state) => state.productDetail.loading)
  const error = useSelector((state) => state.productDetail.error)
  const product = useSelector((state) => state.productDetail.data)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDate = async () => {
      dispatch(productDetailSlice.actions.fetchStart())
      try {
        const { data } = await axios.get(
          `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        )
        dispatch(productDetailSlice.actions.fetchSuccess(data))
      } catch (error: any) {
        dispatch(productDetailSlice.actions.fetchFail(error.messagee))
      }
    }
    fetchDate()
  }, [])

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
    <>
      <Header />
      <div className={styles['page-content']}>
        {/* 产品简介 与 日期选择 */}
        <div className={styles['product-intro-container']}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 描点菜单 */}
        <div className={styles['product-detail-anchor']}></div>
        {/* 产品特色 */}
        <div id="feature" className={styles['product-detail-container']}></div>
        {/* 费用 */}
        <div id="fees" className={styles['product-detail-container']}></div>
        {/* 预定须知 */}
        <div id="notes" className={styles['product-detail-container']}></div>
        {/* 商品评价 */}
        <div id="comments" className={styles['product-detail-container']}></div>
      </div>
      <Footer />
    </>
  )
}
