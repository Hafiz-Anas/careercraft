import { CVData, PersonalInfo, Experience, Education, Skill, Project, Certification } from './index'

// Portfolio-specific interfaces
export interface PortfolioProject extends Project {
  images: string[]
  featured: boolean
  category: string
  testimonial?: {
    text: string
    author: string
    role: string
    company: string
  }
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  category: 'award' | 'recognition' | 'milestone' | 'certification'
  organization?: string
  url?: string
  imageUrl?: string
}

export interface VideoIntro {
  url: string
  thumbnail: string
  duration: number
  description?: string
}

export interface SocialLinks {
  linkedin?: string
  twitter?: string
  github?: string
  website?: string
  behance?: string
  dribbble?: string
  instagram?: string
  youtube?: string
}

export interface PortfolioCustomization {
  template: 'minimal' | 'creative' | 'professional'
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: 'inter' | 'poppins' | 'playfair' | 'roboto'
  fontSize: 'small' | 'medium' | 'large'
  sectionOrder: PortfolioSection[]
  showSections: {
    hero: boolean
    about: boolean
    career: boolean
    skills: boolean
    projects: boolean
    achievements: boolean
    contact: boolean
  }
  heroStyle: 'centered' | 'split' | 'minimal'
  projectsLayout: 'grid' | 'masonry' | 'carousel'
  timelineStyle: 'vertical' | 'horizontal' | 'zigzag'
}

export type PortfolioSection = 'hero' | 'about' | 'career' | 'skills' | 'projects' | 'achievements' | 'contact'

export interface PortfolioTheme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: {
      primary: string
      secondary: string
      muted: string
    }
  }
  fonts: {
    heading: string
    body: string
    mono: string
  }
  spacing: {
    section: string
    container: string
  }
}

export interface PortfolioData {
  id: string
  userId: string
  username: string
  slug: string
  isPublic: boolean
  
  // Personal Information
  personalInfo: PersonalInfo & {
    tagline: string
    bio: string
    profileImage?: string
    coverImage?: string
    socialLinks: SocialLinks
  }
  
  // Video Introduction
  videoIntro?: VideoIntro
  
  // Career Information (from CV)
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  
  // Portfolio-specific content
  projects: PortfolioProject[]
  achievements: Achievement[]
  
  // Customization
  customization: PortfolioCustomization
  
  // SEO and Social
  seo: {
    title: string
    description: string
    keywords: string[]
    ogImage?: string
  }
  
  // Analytics
  analytics: {
    views: number
    uniqueVisitors: number
    lastViewed?: string
  }
  
  // Timestamps
  createdAt: string
  updatedAt: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  portfolioId: string
}

export interface PortfolioTemplateProps {
  data: PortfolioData
  theme: PortfolioTheme
  preview?: boolean
}

export interface PortfolioSectionProps {
  data: PortfolioData
  theme: PortfolioTheme
  className?: string
}

// Skill visualization for radar chart
export interface SkillRadarData {
  category: string
  level: number
  maxLevel: number
  skills: string[]
}

// Timeline data structure
export interface TimelineItem {
  id: string
  type: 'experience' | 'education' | 'achievement'
  title: string
  subtitle: string
  organization: string
  location: string
  startDate: string
  endDate?: string
  current?: boolean
  description?: string
  skills?: string[]
  achievements?: string[]
}

// Portfolio builder state
export interface PortfolioBuilderState {
  currentStep: number
  data: Partial<PortfolioData>
  isDirty: boolean
  isPreview: boolean
  selectedTemplate: PortfolioCustomization['template']
}

// API response types
export interface PortfolioResponse {
  success: boolean
  data?: PortfolioData
  error?: string
}

export interface PortfolioListResponse {
  success: boolean
  data?: {
    portfolios: PortfolioData[]
    total: number
    page: number
    limit: number
  }
  error?: string
}

// Create/Update request types
export type CreatePortfolioRequest = Omit<PortfolioData, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'analytics'>
export type UpdatePortfolioRequest = Partial<CreatePortfolioRequest>

// Template configuration
export interface TemplateConfig {
  id: PortfolioCustomization['template']
  name: string
  description: string
  preview: string
  features: string[]
  colorSchemes: PortfolioTheme[]
  defaultCustomization: PortfolioCustomization
}