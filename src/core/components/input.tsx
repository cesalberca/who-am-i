import React from 'react'
import styles from './input.module.css'
import { bind } from '../utils/bind'

const cx = bind(styles)
interface Props {
  onChange(value: string): void
  value: string
  label: string
}

export const Input: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <input
      className={cx('input')}
      placeholder={label}
      value={value}
      onChange={event => onChange(event.target.value)}
    />
  )
}
