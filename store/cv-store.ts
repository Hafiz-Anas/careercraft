import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CVData, FormStep, CVTemplate } from '@/types'
import { generateId } from '@/lib/utils'

interface CVStore {
  currentCV: CVData | null
  currentStep: FormStep
  templates: CVTemplate[]
  isPreviewMode: boolean
  isDirty: boolean
  
  // Actions
  setCurrentCV: (cv: CVData | null) => void
  updateCV: (updates: Partial<CVData>) => void
  setCurrentStep: (step: FormStep) => void
  setTemplates: (templates: CVTemplate[]) => void
  setPreviewMode: (mode: boolean) => void
  createNewCV: (userId: string) => void
  resetDirty: () => void
}

const createEmptyCV = (userId: string): CVData => ({
  id: generateId(),
  userId,
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: ''
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  template: {
    id: 'modern-1',
    name: 'Modern',
    description: 'Clean and modern design',
    previewImage: '/templates/modern-1.png',
    category: 'modern'
  },
  customization: {
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    fontFamily: 'Inter',
    fontSize: 14,
    sectionOrder: ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
    showPhoto: false
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isPublic: false
})

export const useCVStore = create<CVStore>()(
  persist(
    (set, get) => ({
      currentCV: null,
      currentStep: 'personal',
      templates: [],
      isPreviewMode: false,
      isDirty: false,

      setCurrentCV: (cv) => set({ currentCV: cv, isDirty: false }),

      updateCV: (updates) => {
        const currentCV = get().currentCV
        if (!currentCV) return

        const updatedCV = {
          ...currentCV,
          ...updates,
          updatedAt: new Date().toISOString()
        }

        set({ currentCV: updatedCV, isDirty: true })
      },

      setCurrentStep: (step) => set({ currentStep: step }),

      setTemplates: (templates) => set({ templates }),

      setPreviewMode: (mode) => set({ isPreviewMode: mode }),

      createNewCV: (userId) => {
        const newCV = createEmptyCV(userId)
        set({ 
          currentCV: newCV, 
          currentStep: 'personal',
          isPreviewMode: false,
          isDirty: true
        })
      },

      resetDirty: () => set({ isDirty: false })
    }),
    {
      name: 'cv-store',
      partialize: (state) => ({
        currentCV: state.currentCV,
        currentStep: state.currentStep,
        isDirty: state.isDirty
      })
    }
  )
)