import React from 'react'
import { PaymentCard, PaymentForm } from '../../components'
import { MainLayout } from '../../layouts/mainLayout'
import { Row, Col } from 'antd'

export const PlaceOrderPage: React.FC = (props) => {
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          {/* <PaymentCard /> */}
        </Col>
      </Row>
    </MainLayout>
  )
}
