import React from 'react'
import { Link } from 'next/link'

const CustomLink = ({ to, children, className }: { to: string, children: React.ReactNode, className: string}) => {
  return (
    <Link href={to} className={className}>
      {children}
    </Link>
  ) 
}

export default CustomLink
