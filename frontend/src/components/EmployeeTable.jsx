import { MdEdit, MdDelete } from 'react-icons/md'

const STATUS_BADGE = {
  ACTIVE:   'badge badge-active',
  INACTIVE: 'badge badge-inactive',
  ON_LEAVE: 'badge badge-on_leave',
}
const STATUS_LABEL = { ACTIVE: 'Active', INACTIVE: 'Inactive', ON_LEAVE: 'On Leave' }

function initials(f, l) {
  return `${f?.[0] ?? ''}${l?.[0] ?? ''}`.toUpperCase()
}

function fmt(salary) {
  if (!salary) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(salary)
}

export default function EmployeeTable({ employees, onEdit, onDelete, loading }) {
  if (loading) return <div className="spinner-overlay"><div className="spinner" /></div>
  if (!employees?.length)
    return (
      <div className="empty-state">
        <div className="empty-state-icon">👤</div>
        <h3>No employees found</h3>
        <p>Try adjusting your search or add a new employee.</p>
      </div>
    )

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Job Title</th>
          <th>Department</th>
          <th>Status</th>
          <th>Salary</th>
          <th>Hire Date</th>
          <th style={{ textAlign: 'center' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>
              <div className="emp-cell">
                <div className="emp-avatar">{initials(emp.firstName, emp.lastName)}</div>
                <div>
                  <div className="emp-name">{emp.firstName} {emp.lastName}</div>
                  <div className="emp-email">{emp.email}</div>
                </div>
              </div>
            </td>
            <td className="text-muted">{emp.jobTitle || '—'}</td>
            <td>{emp.departmentName || <span className="text-muted">—</span>}</td>
            <td>
              <span className={STATUS_BADGE[emp.status] ?? 'badge'}>
                {STATUS_LABEL[emp.status] ?? emp.status}
              </span>
            </td>
            <td><span className="salary">{fmt(emp.salary)}</span></td>
            <td className="text-muted">{emp.hireDate ?? '—'}</td>
            <td>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                <button
                  className="btn btn-icon edit"
                  title="Edit employee"
                  onClick={() => onEdit(emp)}
                >
                  <MdEdit />
                </button>
                <button
                  className="btn btn-icon delete"
                  title="Delete employee"
                  onClick={() => onDelete(emp)}
                >
                  <MdDelete />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
