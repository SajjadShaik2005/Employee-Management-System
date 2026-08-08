import { useEffect, useState, useCallback } from 'react'
import { MdAdd } from 'react-icons/md'
import DepartmentCard, { DeptFormModal } from '../components/DepartmentCard'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import { departmentApi } from '../api/departmentApi'
import { useToast } from '../components/Toast'

export default function Departments() {
  const toast = useToast()

  const [departments, setDepartments] = useState([])
  const [loading, setLoading]         = useState(true)
  const [showForm, setShowForm]       = useState(false)
  const [editDept, setEditDept]       = useState(null)
  const [deleteDept, setDeleteDept]   = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    departmentApi.getAll()
      .then(r => setDepartments(r.data.data))
      .catch(() => toast('Failed to load departments', 'error'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  async function handleSubmit(data) {
    if (editDept) {
      await departmentApi.update(editDept.id, data)
      toast('Department updated successfully', 'success')
    } else {
      await departmentApi.create(data)
      toast('Department created successfully', 'success')
    }
    load()
  }

  async function handleDelete() {
    try {
      await departmentApi.delete(deleteDept.id)
      toast(`Department "${deleteDept.name}" deleted`, 'success')
      setDeleteDept(null)
      load()
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to delete department'
      toast(msg, 'error')
      setDeleteDept(null)
    }
  }

  function openAdd()  { setEditDept(null);  setShowForm(true) }
  function openEdit(d){ setEditDept(d);     setShowForm(true) }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>Departments</h1>
          <p>{departments.length} department{departments.length !== 1 ? 's' : ''} in the organisation</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <MdAdd size={18} /> Add Department
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="spinner-overlay"><div className="spinner" /></div>
      ) : departments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏢</div>
          <h3>No departments yet</h3>
          <p>Get started by adding your first department.</p>
          <button className="btn btn-primary mt-16" onClick={openAdd}>
            <MdAdd /> Add Department
          </button>
        </div>
      ) : (
        <div className="dept-grid">
          {departments.map((d, i) => (
            <DepartmentCard
              key={d.id}
              dept={d}
              index={i}
              onEdit={openEdit}
              onDelete={setDeleteDept}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <DeptFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        dept={editDept}
      />
      <DeleteConfirmModal
        isOpen={Boolean(deleteDept)}
        onClose={() => setDeleteDept(null)}
        onConfirm={handleDelete}
        name={deleteDept?.name ?? ''}
        type="department"
      />
    </div>
  )
}
