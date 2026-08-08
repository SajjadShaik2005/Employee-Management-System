import { useLocation } from 'react-router-dom'
import { MdNotifications, MdSearch } from 'react-icons/md'

const titles = {
  '/dashboard':   { title: 'Dashboard',    sub: 'Welcome back, Admin 👋' },
  '/employees':   { title: 'Employees',    sub: 'Manage your workforce' },
  '/departments': { title: 'Departments',  sub: 'Organize your teams' },
}

export default function Navbar() {
  const { pathname } = useLocation()
  const { title, sub } = titles[pathname] ?? { title: 'EMS', sub: '' }

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">{title}</span>
        <span className="navbar-subtitle">{sub}</span>
      </div>
      <div className="navbar-right">
        <button className="navbar-icon-btn notification-dot" title="Notifications">
          <MdNotifications />
        </button>
        <div className="user-avatar" style={{ width: 36, height: 36, fontSize: 13, cursor: 'pointer' }}>
          AD
        </div>
      </div>
    </header>
  )
}
