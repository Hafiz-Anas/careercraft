export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  summary: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate?: string
  gpa?: string
  description?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  githubUrl?: string
  startDate: string
  endDate?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export interface CVData {
  id: string
  userId: string
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  template: CVTemplate
  customization: CVCustomization
  createdAt: string
  updatedAt: string
  isPublic: boolean
  slug?: string
}

export interface CVTemplate {
  id: string
  name: string
  description: string
  previewImage: string
  category: 'modern' | 'classic' | 'creative'
}

export interface CVCustomization {
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  fontSize: number
  sectionOrder: string[]
  showPhoto: boolean
  photoUrl?: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatarUrl?: string
  createdAt: string
  subscription: 'free' | 'premium'
}

export interface CVAnalytics {
  id: string
  cvId: string
  views: number
  downloads: number
  shares: number
  lastViewedAt?: string
}

export interface DatabaseTables {
  users: User
  cvs: CVData
  templates: CVTemplate
  analytics: CVAnalytics
}

export type CreateCVRequest = Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
export type UpdateCVRequest = Partial<CreateCVRequest>

export type FormStep = 
  | 'personal' 
  | 'education' 
  | 'experience' 
  | 'skills' 
  | 'projects' 
  | 'certifications' 
  | 'template' 
  | 'customization'

export interface FormStepProps {
  data: CVData
  onUpdate: (data: Partial<CVData>) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}