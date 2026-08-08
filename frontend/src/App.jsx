import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Departments from './pages/Departments'
import { ToastProvider } from './components/Toast'

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Navbar />
        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard"   element={<Layout><Dashboard /></Layout>} />
          <Route path="/employees"   element={<Layout><Employees /></Layout>} />
          <Route path="/departments" element={<Layout><Departments /></Layout>} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}
