import React from 'react'
import styles from './header.module.css'
import { bind } from '../utils/bind'
import logo from './logo.svg'

const cx = bind(styles)

export const Header: React.FC = () => {
  return (
    <>
      <img src={logo} alt="logo"></img>
      <h1 className={cx('header')}> Who Am I ?</h1>
    </>
  )
}
