import { useState, useEffect } from 'react'
import { MdEdit, MdDelete, MdClose, MdGroup } from 'react-icons/md'

const DEPT_ICONS = ['🏗️','👥','📣','💰','⚙️','🔬','🎨','📊','🛡️','🌐']

const EMPTY = { name: '', description: '' }

function DeptFormModal({ isOpen, onClose, onSubmit, dept }) {
  const [form, setForm]     = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setForm(dept ? { name: dept.name, description: dept.description ?? '' } : EMPTY)
      setErrors({})
    }
  }, [isOpen, dept])

  if (!isOpen) return null

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Department name is required'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    try {
      await onSubmit(form)
      onClose()
    } catch (err) {
      setErrors({ _global: err?.response?.data?.message || 'Something went wrong' })
    } finally { setSaving(false) }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 440 }}>
        <div className="modal-header">
          <h2 className="modal-title">{dept ? '✏️ Edit Department' : '➕ Add Department'}</h2>
          <button className="modal-close" onClick={onClose}><MdClose /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {errors._global && (
              <div style={{ color:'var(--danger)', fontSize:13, marginBottom:14,
                padding:'10px 14px', background:'var(--danger-bg)', borderRadius:8 }}>
                {errors._global}
              </div>
            )}
            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="form-label">Department Name *</label>
              <input
                className={`form-input${errors.name ? ' input-error' : ''}`}
                value={form.name}
                onChange={e => { setForm(f=>({...f,name:e.target.value})); setErrors(er=>({...er,name:''})) }}
                placeholder="e.g. Engineering"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                rows={3}
                style={{ resize:'vertical' }}
                value={form.description}
                onChange={e => setForm(f=>({...f,description:e.target.value}))}
                placeholder="Brief description of this department…"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : dept ? 'Save Changes' : 'Add Department'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function DepartmentCard({ dept, index, onEdit, onDelete }) {
  const icon = DEPT_ICONS[index % DEPT_ICONS.length]
  return (
    <div className="dept-card">
      <div className="dept-icon">{icon}</div>
      <div>
        <div className="dept-name">{dept.name}</div>
        <div className="dept-desc">{dept.description || 'No description provided.'}</div>
      </div>
      <div className="dept-count">
        <MdGroup /> <strong>{dept.employeeCount}</strong> employee{dept.employeeCount !== 1 ? 's' : ''}
      </div>
      <div className="dept-actions">
        <button className="btn btn-icon edit btn-sm" title="Edit" onClick={() => onEdit(dept)}><MdEdit /></button>
        <button className="btn btn-icon delete btn-sm" title="Delete" onClick={() => onDelete(dept)}><MdDelete /></button>
      </div>
    </div>
  )
}

export { DeptFormModal }
