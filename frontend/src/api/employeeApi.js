import axios from 'axios'

const BASE = '/api/employees'

export const employeeApi = {
  getAll: (page = 0, size = 10, sortBy = 'firstName', sortDir = 'asc') =>
    axios.get(BASE, { params: { page, size, sortBy, sortDir } }),

  getById: (id) => axios.get(`${BASE}/${id}`),

  create: (data) => axios.post(BASE, data),

  update: (id, data) => axios.put(`${BASE}/${id}`, data),

  delete: (id) => axios.delete(`${BASE}/${id}`),

  search: (params) => axios.get(`${BASE}/search`, { params }),

  getStats: () => axios.get(`${BASE}/stats`),
}
