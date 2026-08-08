import { NavLink } from 'react-router-dom'
import { MdDashboard, MdPeople, MdApartment, MdSettings } from 'react-icons/md'

const links = [
  { to: '/dashboard',   label: 'Dashboard',   icon: <MdDashboard /> },
  { to: '/employees',   label: 'Employees',   icon: <MdPeople /> },
  { to: '/departments', label: 'Departments', icon: <MdApartment /> },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-icon">🏢</div>
        <div className="brand-text">
          <strong>EMS Portal</strong>
          <span>Management Suite</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">Main Menu</div>
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">{icon}</span>
            {label}
          </NavLink>
        ))}

        <div className="nav-section-label" style={{ marginTop: 16 }}>Settings</div>
        <div className="nav-item">
          <span className="nav-icon"><MdSettings /></span>
          Preferences
        </div>
      </nav>

      {/* User Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <strong>Admin User</strong>
            <span>admin@ems.dev</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
