import React from 'react'

interface Props {
  onChange(value: string): void
  value: string
  label: string
}

export const Input: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <label>
      {label}
      <input value={value} onChange={event => onChange(event.target.value)} />
    </label>
  )
}
