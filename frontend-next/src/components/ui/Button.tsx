import { ReactNode } from 'react'

const Button = ({ type, children }: { type: 'button' | 'submit' | 'reset', children: ReactNode }) => {
  return (
    <button type={type}>
        {children}
    </button>
  )
}

export default Button