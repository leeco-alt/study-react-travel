import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown, Space } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'

export const Header: React.FC = () => {
  return (
    <div className={styles['app-header']}>
      {/* top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>让旅游更幸福</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu>
                <Menu.Item>中文</Menu.Item>
                <Menu.Item>英文</Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            语言
          </Dropdown.Button>
          <Space className={styles['button-group']}>
            <Button>注册</Button>
            <Button>登录</Button>
          </Space>
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
        <img src={logo} alt="" className={styles['App-logo']} />
        <Typography.Title level={3} className={styles.title}>
          React 旅游网
        </Typography.Title>
        <Input.Search
          className={styles['search-input']}
          placeholder="请输入旅游目的地、主题、或关机字"
        />
      </Layout.Header>
      <Menu mode={'horizontal'} className={styles['main-menu']}>
        <Menu.Item key={1}>旅游首页</Menu.Item>
        <Menu.Item key={2}>周末游</Menu.Item>
        <Menu.Item key={3}>跟团有</Menu.Item>
        <Menu.Item key={4}>跟团有</Menu.Item>
        <Menu.Item key={5}>跟团有</Menu.Item>
        <Menu.Item key={6}>跟团有</Menu.Item>
        <Menu.Item key={7}>跟团有</Menu.Item>
        <Menu.Item key={8}>跟团有</Menu.Item>
        <Menu.Item key={9}>跟团有</Menu.Item>
        <Menu.Item key={9}>跟团有</Menu.Item>
        <Menu.Item key={9}>跟团有</Menu.Item>
        <Menu.Item key={9}>跟团有</Menu.Item>
        <Menu.Item key={9}>跟团有</Menu.Item>
        <Menu.Item key={9}>跟团有</Menu.Item>
        <Menu.Item key={9}>跟团有</Menu.Item>
      </Menu>
    </div>
  )
}
