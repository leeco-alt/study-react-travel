import React, { useState } from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown, Space } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useNavigate, useLocation, useParams, useMatch } from 'react-router-dom'
import store from '../../redux/store'
import { LanguageState } from '../../redux/languageReducer'

export const Header: React.FC = () => {
  const params = useParams()
  const location = useLocation()
  const match = useMatch(location.pathname)
  const navigate = useNavigate()
  const storeState = store.getState()
  const [state, setState] = useState({
    language: storeState.language,
    languageList: storeState.languageList
  })

  store.subscribe(() => {
    const storeState = store.getState()
    setState({
      ...state,
      language: storeState.language,
      languageList: storeState.languageList
    })
  })

  const menuClickHandler = (e) => {
    // console.log(e)
    // setState({ ...state, language: e.key }) // 这种方法只能改变此组件的状态
    if (e.key === 'new') {
      // 处理新语言添加 action
      const action = {
        type: 'add_language',
        payload: { code: 'new_lang' + Math.random(), name: '新语言' }
      }
      store.dispatch(action)
    } else {
      const action = {
        type: 'change_language',
        payload: e.key
      }
      store.dispatch(action)
    }
  }

  const langMenuList = state.languageList
    .map((l) => ({ label: l.name, key: l.code }))
    .concat({ label: '添加新语言', key: 'new' })

  return (
    <div className={styles['app-header']}>
      {/* top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>让旅游更幸福</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={<Menu onClick={menuClickHandler} items={langMenuList}></Menu>}
            icon={<GlobalOutlined />}
          >
            {state.language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>
          <Space className={styles['button-group']}>
            <Button onClick={() => navigate('register')}>注册</Button>
            <Button onClick={() => navigate('signIn')}>登录</Button>
          </Space>
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
        <span onClick={() => navigate('/')}>
          <img src={logo} alt="" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>
            React 旅游网
          </Typography.Title>
        </span>

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
        <Menu.Item key={19}>跟团有</Menu.Item>
        <Menu.Item key={29}>跟团有</Menu.Item>
        <Menu.Item key={39}>跟团有</Menu.Item>
        <Menu.Item key={49}>跟团有</Menu.Item>
        <Menu.Item key={59}>跟团有</Menu.Item>
        <Menu.Item key={69}>跟团有</Menu.Item>
      </Menu>
    </div>
  )
}
