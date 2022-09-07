import React from 'react'
import styles from './SideMenu.module.css'
import { sideMenuList } from './mockup'
import { Menu } from 'antd'
import { GiftOutlined } from '@ant-design/icons'

const items = sideMenuList.map((m, index) => {
  return {
    label: m.title,
    icon: <GiftOutlined />,
    key: `side-menu-${index}`,
    children: m.subMenu.map((sm, smindex) => {
      return {
        label: sm.title,
        icon: <GiftOutlined />,
        key: `sub-menu-${index}-${smindex}`,
        children: sm.subMenu.map((sms, smsindex) => {
          return {
            label: sms,
            icon: <GiftOutlined />,
            key: `sub-menu-${index}-${smindex}-${smsindex}`
          }
        })
      }
    })
  }
})

export const SideMenu: React.FC = () => {
  return <Menu mode="vertical" className={styles['side-menu']} items={items} />
}
