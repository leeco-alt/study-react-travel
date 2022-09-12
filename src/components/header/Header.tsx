import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode'
import { Layout, Typography, Input, Menu, Button, Dropdown, Space } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useNavigate, useLocation, useParams, useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  addLanguageActionCreator,
  changeLanguageActionCreator
} from '../../redux/language/languageActions'
import { useSelector } from '../../redux/hook'
import { useDispatch } from 'react-redux'
import { userSlice } from '../../redux/user/slice'

interface JwtPayload extends DefaultJwtPayload {
  username: string
}

export const Header: React.FC = () => {
  const params = useParams()
  const location = useLocation()
  const match = useMatch(location.pathname)
  const navigate = useNavigate()
  const { t } = useTranslation()

  // const language = useSelector((state) => state.language)
  // const languageList = useSelector((state) => state.languageList)
  const { language, languageList } = useSelector((state) => state.language)
  const jwt = useSelector((s) => s.user.token)
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt)
      setUsername(token.username)
    }
  }, [jwt])

  const dispatch = useDispatch()
  // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>() // 强类型定义

  const menuClickHandler = (e) => {
    // console.log(e)
    if (e.key === 'new') {
      // 处理新语言添加 action
      dispatch(addLanguageActionCreator('新语言', 'new_lang' + Math.random()))
    } else {
      dispatch(changeLanguageActionCreator(e.key))
    }
  }

  const onLogout = () => {
    dispatch(userSlice.actions.logout())
    navigate('/')
    window.location.reload()
  }

  const langMenuList = languageList
    .map((l) => ({ label: l.name, key: l.code }))
    .concat({ label: t('header.add_new_language'), key: 'new' })

  return (
    <div className={styles['app-header']}>
      {/* top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t('header.slogan')}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={<Menu onClick={menuClickHandler} items={langMenuList}></Menu>}
            icon={<GlobalOutlined />}
          >
            {language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>
          {jwt ? (
            <Space className={styles['button-group']}>
              <span>
                {t('header.welcome')}
                <Typography.Text strong>{username}</Typography.Text>
              </span>
              <Button onClick={() => navigate('/register')}>{t('header.shoppingCart')}</Button>
              <Button onClick={onLogout}>{t('header.signOut')}</Button>
            </Space>
          ) : (
            <Space className={styles['button-group']}>
              <Button onClick={() => navigate('/register')}>{t('header.register')}</Button>
              <Button onClick={() => navigate('/signIn')}>{t('header.signin')}</Button>
            </Space>
          )}
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
        <span onClick={() => navigate('/')}>
          <img src={logo} alt="" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>
            {t('header.title')}
          </Typography.Title>
        </span>

        <Input.Search
          className={styles['search-input']}
          placeholder="请输入旅游目的地、主题、或关机字"
          onSearch={(keywords) => navigate('/search/' + keywords)}
        />
      </Layout.Header>
      <Menu mode={'horizontal'} className={styles['main-menu']}>
        <Menu.Item key="1">{t('header.home_page')}</Menu.Item>
        <Menu.Item key="2">{t('header.weekend')}</Menu.Item>
        <Menu.Item key="3">{t('header.group')}</Menu.Item>
        <Menu.Item key="4">{t('header.backpack')}</Menu.Item>
        <Menu.Item key="5">{t('header.private')}</Menu.Item>
        <Menu.Item key="6">{t('header.cruise')}</Menu.Item>
        <Menu.Item key="7">{t('header.hotel')}</Menu.Item>
        <Menu.Item key="8">{t('header.local')}</Menu.Item>
        <Menu.Item key="9">{t('header.theme')}</Menu.Item>
        <Menu.Item key="10">{t('header.custom')}</Menu.Item>
        <Menu.Item key="11">{t('header.study')}</Menu.Item>
        <Menu.Item key="12">{t('header.visa')}</Menu.Item>
        <Menu.Item key="13">{t('header.enterprise')}</Menu.Item>
        <Menu.Item key="14">{t('header.high_end')}</Menu.Item>
        <Menu.Item key="15">{t('header.outdoor')}</Menu.Item>
        <Menu.Item key="16">{t('header.insurance')}</Menu.Item>
      </Menu>
    </div>
  )
}
