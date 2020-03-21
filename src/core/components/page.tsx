import React from 'react'
import styles from './page.module.css'
import { bind } from '../utils/bind'
import { Header } from './header'

const cx = bind(styles)

export const Page: React.FC = ({ children }) => {
  return (
    <>
      {' '}
      <Header></Header>
      <div className={cx('page')}>{children}</div>
    </>
  )
}
