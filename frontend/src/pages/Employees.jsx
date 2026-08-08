import { useEffect, useState, useCallback } from 'react'
import { MdAdd, MdSearch, MdFilterList } from 'react-icons/md'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeModal from '../components/EmployeeModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import { employeeApi } from '../api/employeeApi'
import { departmentApi } from '../api/departmentApi'
import { useToast } from '../components/Toast'

export default function Employees() {
  const toast = useToast()

  // Data
  const [employees,    setEmployees]    = useState([])
  const [departments,  setDepartments]  = useState([])
  const [total,        setTotal]        = useState(0)
  const [totalPages,   setTotalPages]   = useState(0)
  const [loading,      setLoading]      = useState(false)

  // Pagination & filters
  const [page,        setPage]        = useState(0)
  const [query,       setQuery]       = useState('')
  const [deptFilter,  setDeptFilter]  = useState('')
  const [statusFilter,setStatusFilter]= useState('')

  // Modals
  const [showForm,   setShowForm]   = useState(false)
  const [editEmp,    setEditEmp]    = useState(null)
  const [deleteEmp,  setDeleteEmp]  = useState(null)

  const PAGE_SIZE = 10

  const load = useCallback(() => {
    setLoading(true)
    const params = { page, size: PAGE_SIZE }
    if (query)       params.q            = query
    if (deptFilter)  params.departmentId = deptFilter
    if (statusFilter)params.status       = statusFilter

    const api = (query || deptFilter || statusFilter)
      ? employeeApi.search(params)
      : employeeApi.getAll(page, PAGE_SIZE)

    api.then(r => {
      const d = r.data.data
      setEmployees(d.content)
      setTotal(d.totalElements)
      setTotalPages(d.totalPages)
    })
    .catch(() => toast('Failed to load employees', 'error'))
    .finally(() => setLoading(false))
  }, [page, query, deptFilter, statusFilter])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    departmentApi.getAll().then(r => setDepartments(r.data.data)).catch(console.error)
  }, [])

  // Reset to page 0 on filter change
  useEffect(() => { setPage(0) }, [query, deptFilter, statusFilter])

  async function handleSubmit(data) {
    if (editEmp) {
      await employeeApi.update(editEmp.id, data)
      toast('Employee updated successfully', 'success')
    } else {
      await employeeApi.create(data)
      toast('Employee added successfully', 'success')
    }
    load()
  }

  async function handleDelete() {
    await employeeApi.delete(deleteEmp.id)
    toast(`${deleteEmp.firstName} ${deleteEmp.lastName} deleted`, 'success')
    setDeleteEmp(null)
    load()
  }

  function openAdd()  { setEditEmp(null); setShowForm(true)  }
  function openEdit(e){ setEditEmp(e);    setShowForm(true)  }

  // Pagination helpers
  const pages = Array.from({ length: totalPages }, (_, i) => i)
  const startItem = page * PAGE_SIZE + 1
  const endItem   = Math.min((page + 1) * PAGE_SIZE, total)

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>Employees</h1>
          <p>{total} employee{total !== 1 ? 's' : ''} in total</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <MdAdd size={18} /> Add Employee
        </button>
      </div>

      {/* Table Card */}
      <div className="table-card">
        {/* Filters */}
        <div className="table-header">
          <div className="table-actions" style={{ flex: 1 }}>
            {/* Search */}
            <div className="search-box">
              <MdSearch className="search-icon" />
              <input
                className="search-input"
                placeholder="Search name, email, title…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>

            {/* Department filter */}
            <select
              className="filter-select"
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            {/* Status filter */}
            <select
              className="filter-select"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ minWidth: 130 }}
            >
              <option value="">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="ON_LEAVE">On Leave</option>
            </select>

            {(query || deptFilter || statusFilter) && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { setQuery(''); setDeptFilter(''); setStatusFilter('') }}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <EmployeeTable
          employees={employees}
          loading={loading}
          onEdit={openEdit}
          onDelete={setDeleteEmp}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <div className="pagination-info">
              Showing {startItem}–{endItem} of {total} employees
            </div>
            <div className="pagination-controls">
              <button
                className="page-btn"
                disabled={page === 0}
                onClick={() => setPage(p => p - 1)}
              >‹</button>
              {pages.map(p => (
                <button
                  key={p}
                  className={`page-btn${p === page ? ' active' : ''}`}
                  onClick={() => setPage(p)}
                >
                  {p + 1}
                </button>
              ))}
              <button
                className="page-btn"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(p => p + 1)}
              >›</button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <EmployeeModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        employee={editEmp}
        departments={departments}
      />
      <DeleteConfirmModal
        isOpen={Boolean(deleteEmp)}
        onClose={() => setDeleteEmp(null)}
        onConfirm={handleDelete}
        name={deleteEmp ? `${deleteEmp.firstName} ${deleteEmp.lastName}` : ''}
        type="employee"
      />
    </div>
  )
}
