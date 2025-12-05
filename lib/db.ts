// Mock database client for demonstration
// In production, connect to Supabase or PostgreSQL

const mockUsers: Record<string, any> = {}
const mockServices: Record<string, any> = {}
const mockAppointments: Record<string, any> = {}

export const db = {
  users: {
    create: async (data: any) => {
      const id = Math.random().toString(36).substr(2, 9)
      mockUsers[id] = { id, ...data }
      return mockUsers[id]
    },
    findByEmail: async (email: string) => {
      return Object.values(mockUsers).find((u) => u.email === email)
    },
    findById: async (id: string) => {
      return mockUsers[id]
    },
  },
  services: {
    findAll: async () => {
      return Object.values(mockServices)
    },
    findById: async (id: string) => {
      return mockServices[id]
    },
  },
  appointments: {
    create: async (data: any) => {
      const id = Math.random().toString(36).substr(2, 9)
      mockAppointments[id] = { id, ...data }
      return mockAppointments[id]
    },
    findByUserId: async (userId: string) => {
      return Object.values(mockAppointments).filter((a) => a.userId === userId)
    },
  },
}
