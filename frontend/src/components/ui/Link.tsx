import { Link } from 'react-router-dom'

const CustomLink = ({ to, children, className }: { to: string, children: React.ReactNode, className?: string}) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) 
}

export default CustomLink
