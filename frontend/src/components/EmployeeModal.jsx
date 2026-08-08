import { useState, useEffect } from 'react'
import { MdClose } from 'react-icons/md'

const EMPTY = {
  firstName: '', lastName: '', email: '', phone: '',
  jobTitle: '', salary: '', hireDate: '', status: 'ACTIVE', departmentId: '',
}

export default function EmployeeModal({ isOpen, onClose, onSubmit, employee, departments }) {
  const [form, setForm]     = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const isEdit = Boolean(employee)

  useEffect(() => {
    if (isOpen) {
      setForm(employee
        ? {
            firstName:    employee.firstName    ?? '',
            lastName:     employee.lastName     ?? '',
            email:        employee.email        ?? '',
            phone:        employee.phone        ?? '',
            jobTitle:     employee.jobTitle     ?? '',
            salary:       employee.salary       ?? '',
            hireDate:     employee.hireDate     ?? '',
            status:       employee.status       ?? 'ACTIVE',
            departmentId: employee.departmentId ?? '',
          }
        : EMPTY)
      setErrors({})
    }
  }, [isOpen, employee])

  if (!isOpen) return null

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim())  e.lastName  = 'Last name is required'
    if (!form.email.trim())     e.email     = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format'
    if (form.phone && !/^\+?[0-9]{7,15}$/.test(form.phone))  e.phone = 'Invalid phone number'
    if (form.salary && Number(form.salary) <= 0) e.salary = 'Salary must be greater than 0'
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSaving(true)
    try {
      await onSubmit({
        ...form,
        salary:       form.salary       ? Number(form.salary) : null,
        departmentId: form.departmentId ? Number(form.departmentId) : null,
        hireDate:     form.hireDate || null,
      })
      onClose()
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong'
      setErrors({ _global: msg })
    } finally {
      setSaving(false)
    }
  }

  const field = (name) => ({
    value: form[name],
    onChange: (e) => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: '' })) },
    className: `form-input${errors[name] ? ' input-error' : ''}`,
  })

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? '✏️ Edit Employee' : '➕ Add Employee'}</h2>
          <button className="modal-close" onClick={onClose}><MdClose /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {errors._global && (
              <div style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 16,
                padding: '10px 14px', background: 'var(--danger-bg)', borderRadius: 8 }}>
                {errors._global}
              </div>
            )}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input {...field('firstName')} placeholder="Alice" />
                {errors.firstName && <span className="form-error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input {...field('lastName')} placeholder="Johnson" />
                {errors.lastName && <span className="form-error">{errors.lastName}</span>}
              </div>

              <div className="form-group full">
                <label className="form-label">Email *</label>
                <input {...field('email')} type="email" placeholder="alice@ems.dev" />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input {...field('phone')} placeholder="+1234567890" />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input {...field('jobTitle')} placeholder="Software Engineer" />
              </div>

              <div className="form-group">
                <label className="form-label">Salary (USD)</label>
                <input {...field('salary')} type="number" min="0" step="1000" placeholder="75000" />
                {errors.salary && <span className="form-error">{errors.salary}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Hire Date</label>
                <input {...field('hireDate')} type="date" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Department</label>
                <select
                  value={form.departmentId}
                  onChange={(e) => setForm(f => ({ ...f, departmentId: e.target.value }))}
                  className="form-select"
                >
                  <option value="">— Select Department —</option>
                  {departments?.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
                  className="form-select"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="ON_LEAVE">On Leave</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
