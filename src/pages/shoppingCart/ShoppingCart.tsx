import React from 'react'
import styles from './ShoppingCart.module.css'
import { MainLayout } from '../../layouts/mainLayout'
import { Row, Col, Affix } from 'antd'
import { ProductList, PaymentCard } from '../../components'

export const ShoppingCartPage: React.FC = (props) => {
  return (
    <MainLayout>
      <Row>
        {/* 购物清单 */}
        <Col span={16}></Col>
        <div className={styles['product-list-container']}>
          {/* <ProductList /> */}
        </div>
        {/* 支付卡组件 */}
        <Col span={8}>
          <div className={styles['payment-card-container']}>
            {/* <PaymentCard /> */}
          </div>
        </Col>
      </Row>
    </MainLayout>
  )
}
