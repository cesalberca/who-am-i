import React from 'react'

interface Props {
  onClick: () => void
}

export const Button: React.FC<Props> = ({ children, onClick }) => (
  <button onClick={() => onClick()}>{children}</button>
)
