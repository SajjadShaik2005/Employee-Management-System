export default function StatCard({ icon, label, value, sub, color = 'var(--accent-dim)', iconColor = 'var(--accent-light)' }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: color }}>
        <span style={{ color: iconColor }}>{icon}</span>
      </div>
      <div className="stat-info">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value ?? '—'}</div>
        {sub && <div className="stat-sub">{sub}</div>}
      </div>
    </div>
  )
}
