import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { MdPeople, MdApartment, MdTrendingUp, MdAccessTime } from 'react-icons/md'
import StatCard from '../components/StatCard'
import { employeeApi } from '../api/employeeApi'

const PIE_COLORS = ['#3fb950', '#f85149', '#e3b341']
const BAR_COLOR  = '#7c3aed'

function fmt(n) {
  if (!n) return '$0'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

const STATUS_BADGE = {
  ACTIVE:   'badge badge-active',
  INACTIVE: 'badge badge-inactive',
  ON_LEAVE: 'badge badge-on_leave',
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    employeeApi.getStats()
      .then(r => setStats(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return <div className="spinner-overlay"><div className="spinner" /></div>

  if (!stats)
    return <div className="empty-state"><p>Failed to load dashboard data.</p></div>

  const pieData = [
    { name: 'Active',   value: Number(stats.activeEmployees)   },
    { name: 'Inactive', value: Number(stats.inactiveEmployees) },
    { name: 'On Leave', value: Number(stats.onLeaveEmployees)  },
  ].filter(d => d.value > 0)

  return (
    <div>
      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          icon="👥"
          label="Total Employees"
          value={stats.totalEmployees}
          sub="All time"
          color="var(--accent-dim)"
          iconColor="var(--accent-light)"
        />
        <StatCard
          icon="✅"
          label="Active"
          value={stats.activeEmployees}
          sub={`${Math.round((stats.activeEmployees / stats.totalEmployees) * 100) || 0}% of workforce`}
          color="var(--success-bg)"
          iconColor="var(--success)"
        />
        <StatCard
          icon="🏢"
          label="Departments"
          value={stats.totalDepartments}
          sub="Across the org"
          color="var(--info-bg)"
          iconColor="var(--info)"
        />
        <StatCard
          icon="💰"
          label="Avg Salary"
          value={fmt(stats.averageSalary)}
          sub="Active employees"
          color="var(--warning-bg)"
          iconColor="var(--warning)"
        />
      </div>

      {/* Charts */}
      <div className="charts-row">
        {/* Bar Chart */}
        <div className="chart-card">
          <div className="chart-title">Employees by Department</div>
          <div className="chart-sub">Headcount distribution across departments</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stats.employeesByDepartment} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" />
              <XAxis
                dataKey="department"
                tick={{ fill: '#8b949e', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,.08)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#8b949e', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{ background: '#1c2333', border: '1px solid rgba(48,54,61,.9)', borderRadius: 8, color: '#e6edf3' }}
                cursor={{ fill: 'rgba(124,58,237,.08)' }}
              />
              <Bar dataKey="count" fill={BAR_COLOR} radius={[6, 6, 0, 0]} name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-card">
          <div className="chart-title">Status Breakdown</div>
          <div className="chart-sub">Employee status distribution</div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="46%"
                innerRadius={64}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1c2333', border: '1px solid rgba(48,54,61,.9)', borderRadius: 8, color: '#e6edf3' }}
              />
              <Legend
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ fontSize: 13, color: '#8b949e', paddingTop: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Hires */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <div className="table-title">Recent Hires</div>
            <div className="table-sub">Latest additions to the team</div>
          </div>
          <Link to="/employees" className="btn btn-secondary btn-sm">View All →</Link>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Job Title</th>
              <th>Department</th>
              <th>Status</th>
              <th>Hire Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentHires?.map(emp => (
              <tr key={emp.id}>
                <td>
                  <div className="emp-cell">
                    <div className="emp-avatar">
                      {(emp.firstName?.[0] ?? '') + (emp.lastName?.[0] ?? '')}
                    </div>
                    <div>
                      <div className="emp-name">{emp.firstName} {emp.lastName}</div>
                      <div className="emp-email">{emp.email}</div>
                    </div>
                  </div>
                </td>
                <td className="text-muted">{emp.jobTitle || '—'}</td>
                <td>{emp.departmentName || '—'}</td>
                <td>
                  <span className={STATUS_BADGE[emp.status] ?? 'badge'}>
                    {emp.status?.replace('_', ' ')}
                  </span>
                </td>
                <td className="text-muted">{emp.hireDate ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
