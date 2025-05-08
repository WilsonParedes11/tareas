import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },

  actions: {
    async register(userData) {
      try {
        const response = await api.post('/register', userData)
        this.setUserData(response.data)
        return response
      } catch (error) {
        throw error
      }
    },

    async login(credentials) {
      try {
        const response = await api.post('/login', credentials)
        this.setUserData(response.data)
        return response
      } catch (error) {
        throw error
      }
    },

    async logout() {
      try {
        await api.post('/logout')
      } finally {
        this.clearUserData()
      }
    },

    setUserData(data) {
      this.user = data.user
      this.token = data.token
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
    },

    clearUserData() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
})
