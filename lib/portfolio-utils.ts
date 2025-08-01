import { CVData } from '@/types'
import { 
  PortfolioData, 
  PortfolioTheme, 
  SkillRadarData, 
  TimelineItem, 
  PortfolioCustomization 
} from '@/types/portfolio'

// Convert CV data to portfolio data
export function convertCVToPortfolio(cvData: CVData, username: string): Partial<PortfolioData> {
  return {
    username,
    slug: username.toLowerCase(),
    personalInfo: {
      ...cvData.personalInfo,
      tagline: extractTaglineFromSummary(cvData.personalInfo.summary),
      bio: cvData.personalInfo.summary,
      socialLinks: {
        linkedin: cvData.personalInfo.linkedin,
        github: cvData.personalInfo.github,
        website: cvData.personalInfo.website,
      }
    },
    experience: cvData.experience,
    education: cvData.education,
    skills: cvData.skills,
    projects: cvData.projects.map(project => ({
      ...project,
      images: [],
      featured: false,
      category: 'development'
    })),
    achievements: cvData.certifications.map(cert => ({
      id: cert.id,
      title: cert.name,
      description: `Issued by ${cert.issuer}`,
      date: cert.issueDate,
      category: 'certification' as const,
      organization: cert.issuer,
      url: cert.url
    })),
    customization: getDefaultCustomization(),
    seo: {
      title: `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName} - Portfolio`,
      description: cvData.personalInfo.summary,
      keywords: cvData.skills.map(skill => skill.name)
    }
  }
}

// Extract tagline from summary (first sentence)
function extractTaglineFromSummary(summary: string): string {
  const sentences = summary.split(/[.!?]+/)
  return sentences[0]?.trim() || 'Professional Portfolio'
}

// Get default customization settings
export function getDefaultCustomization(): PortfolioCustomization {
  return {
    template: 'minimal',
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    accentColor: '#10b981',
    fontFamily: 'inter',
    fontSize: 'medium',
    sectionOrder: ['hero', 'about', 'career', 'skills', 'projects', 'achievements', 'contact'],
    showSections: {
      hero: true,
      about: true,
      career: true,
      skills: true,
      projects: true,
      achievements: true,
      contact: true
    },
    heroStyle: 'centered',
    projectsLayout: 'grid',
    timelineStyle: 'vertical'
  }
}

// Predefined themes
export const portfolioThemes: Record<string, PortfolioTheme> = {
  minimal: {
    name: 'Minimal',
    colors: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#3b82f6',
      background: '#ffffff',
      surface: '#f9fafb',
      text: {
        primary: '#111827',
        secondary: '#4b5563',
        muted: '#9ca3af'
      }
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'JetBrains Mono'
    },
    spacing: {
      section: '6rem',
      container: '1200px'
    }
  },
  creative: {
    name: 'Creative',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      accent: '#f59e0b',
      background: '#fefefe',
      surface: '#f8fafc',
      text: {
        primary: '#1e293b',
        secondary: '#475569',
        muted: '#94a3b8'
      }
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter',
      mono: 'JetBrains Mono'
    },
    spacing: {
      section: '8rem',
      container: '1400px'
    }
  },
  professional: {
    name: 'Professional',
    colors: {
      primary: '#1e40af',
      secondary: '#374151',
      accent: '#059669',
      background: '#ffffff',
      surface: '#f3f4f6',
      text: {
        primary: '#1f2937',
        secondary: '#4b5563',
        muted: '#6b7280'
      }
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
      mono: 'JetBrains Mono'
    },
    spacing: {
      section: '5rem',
      container: '1100px'
    }
  }
}

// Convert skills to radar chart data
export function convertSkillsToRadarData(skills: any[]): SkillRadarData[] {
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, any[]>)

  return Object.entries(skillsByCategory).map(([category, categorySkills]) => {
    const levelMap = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 }
    const averageLevel = categorySkills.reduce((sum, skill) => 
      sum + levelMap[skill.level as keyof typeof levelMap], 0) / categorySkills.length

    return {
      category,
      level: Math.round(averageLevel * 25), // Convert to percentage
      maxLevel: 100,
      skills: categorySkills.map(skill => skill.name)
    }
  })
}

// Create timeline from experience and education
export function createTimeline(experience: any[], education: any[]): TimelineItem[] {
  const timeline: TimelineItem[] = []

  // Add experience items
  experience.forEach(exp => {
    timeline.push({
      id: exp.id,
      type: 'experience',
      title: exp.title,
      subtitle: 'Work Experience',
      organization: exp.company,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description
    })
  })

  // Add education items
  education.forEach(edu => {
    timeline.push({
      id: edu.id,
      type: 'education',
      title: edu.degree,
      subtitle: 'Education',
      organization: edu.institution,
      location: edu.location,
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description
    })
  })

  // Sort by start date (most recent first)
  return timeline.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
}

// Generate SEO-friendly slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Format date for display
export function formatDate(dateString: string, format: 'short' | 'long' = 'short'): string {
  const date = new Date(dateString)
  
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
  }
  
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Calculate years of experience
export function calculateExperience(experiences: any[]): number {
  let totalMonths = 0
  
  experiences.forEach(exp => {
    const startDate = new Date(exp.startDate)
    const endDate = exp.current ? new Date() : new Date(exp.endDate)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
    totalMonths += diffMonths
  })
  
  return Math.floor(totalMonths / 12)
}

// Generate color palette from primary color
export function generateColorPalette(primaryColor: string) {
  // This is a simplified color palette generator
  // In a real implementation, you might use a color theory library
  return {
    primary: primaryColor,
    primaryLight: lightenColor(primaryColor, 20),
    primaryDark: darkenColor(primaryColor, 20),
    secondary: shiftHue(primaryColor, 180),
    accent: shiftHue(primaryColor, 60)
  }
}

// Helper color functions (simplified)
function lightenColor(color: string, percent: number): string {
  // Simplified implementation
  return color
}

function darkenColor(color: string, percent: number): string {
  // Simplified implementation
  return color
}

function shiftHue(color: string, degrees: number): string {
  // Simplified implementation
  return color
}

// Validate portfolio data
export function validatePortfolioData(data: Partial<PortfolioData>): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.personalInfo?.firstName) {
    errors.push('First name is required')
  }

  if (!data.personalInfo?.lastName) {
    errors.push('Last name is required')
  }

  if (!data.personalInfo?.email) {
    errors.push('Email is required')
  }

  if (!data.username) {
    errors.push('Username is required')
  }

  if (data.username && data.username.length < 3) {
    errors.push('Username must be at least 3 characters')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Get portfolio stats
export function getPortfolioStats(data: PortfolioData) {
  return {
    totalProjects: data.projects.length,
    featuredProjects: data.projects.filter(p => p.featured).length,
    totalSkills: data.skills.length,
    yearsExperience: calculateExperience(data.experience),
    totalAchievements: data.achievements.length,
    profileCompleteness: calculateProfileCompleteness(data)
  }
}

// Calculate profile completeness percentage
function calculateProfileCompleteness(data: PortfolioData): number {
  const fields = [
    data.personalInfo.firstName,
    data.personalInfo.lastName,
    data.personalInfo.email,
    data.personalInfo.bio,
    data.personalInfo.profileImage,
    data.experience.length > 0,
    data.skills.length > 0,
    data.projects.length > 0,
    data.personalInfo.socialLinks.linkedin,
    data.videoIntro
  ]

  const completedFields = fields.filter(Boolean).length
  return Math.round((completedFields / fields.length) * 100)
}