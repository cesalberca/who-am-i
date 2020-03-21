import React from 'react'
import styles from './button.module.css'
import { bind } from '../utils/bind'

const cx = bind(styles)
interface Props {
  onClick: () => void
}

export const Button: React.FC<Props> = ({ children, onClick }) => (
  <button className={cx('button')} onClick={() => onClick()}>
    {children}
  </button>
)
