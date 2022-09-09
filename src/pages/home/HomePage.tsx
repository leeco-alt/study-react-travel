import React from 'react'
import styles from './HomePage.module.css'
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
  BusinessPartners
} from '../../components'
import { Row, Col, Typography, Spin } from 'antd'
import { withTranslation, WithTranslation } from 'react-i18next'
import axios from 'axios'
import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import {
  fetchRecommendProductsStartActionCreator,
  fetchRecommendProductsSuccessActionCreator,
  fetchRecommendProductsFailActionCreator
} from '../../redux/recommendProducts/recommendProductsAction'

import sideImage from '../../assets/images/sider_2019_02-04-2.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_12-09.png'

const mapStateToProps = (state: RootState) => {
  const { loading, productList, error } = state.recommendProducts
  return { loading, productList, error }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStart: () => {
      dispatch(fetchRecommendProductsStartActionCreator())
    },
    fetchSuccess: (data) => {
      dispatch(fetchRecommendProductsSuccessActionCreator(data))
    },
    fetchFail: (error) => {
      dispatch(fetchRecommendProductsFailActionCreator(error))
    }
  }
}

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropsType> {
  async componentDidMount() {
    this.props.fetchStart()
    try {
      const { data } = await axios.get(
        'http://yapi.smart-xwork.cn/mock/173267/api/productCollections'
      )
      this.props.fetchSuccess(data)
    } catch (err: any) {
      this.props.fetchFail(err.message)
    }
  }

  render() {
    // console.log(this.props.t)
    const { t, productList, loading, error } = this.props
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
        {/* 页面内容 */}
        <div className={styles['page-content']}>
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>
          <ProductCollection
            title={
              <Typography.Title level={3} type="warning">
                {t('home_page.hot_recommended')}
              </Typography.Title>
            }
            sideImage={sideImage}
            products={productList[0].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                {t('home_page.new_arrival')}
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList[1].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                {t('home_page.domestic_travel')}
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList[2].touristRoutes}
          />
          <BusinessPartners />
        </div>
        <Footer />
      </>
    )
  }
}

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HomePageComponent))
