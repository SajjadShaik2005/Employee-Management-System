import { useState } from 'react'
import { MdClose } from 'react-icons/md'

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, name, type = 'employee' }) {
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  async function handleConfirm() {
    setLoading(true)
    try { await onConfirm() }
    finally { setLoading(false) }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal confirm-modal">
        <div className="modal-header">
          <h2 className="modal-title">Confirm Delete</h2>
          <button className="modal-close" onClick={onClose}><MdClose /></button>
        </div>
        <div className="modal-body" style={{ textAlign: 'center' }}>
          <div className="confirm-icon">🗑️</div>
          <p className="confirm-title">Delete {type === 'employee' ? 'Employee' : 'Department'}?</p>
          <p className="confirm-msg">
            Are you sure you want to delete <strong>{name}</strong>?
            <br />This action cannot be undone.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" onClick={handleConfirm} disabled={loading}>
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
