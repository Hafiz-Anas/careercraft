// Validation utility functions for CV builder

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// Personal Info Validation
export const validatePersonalInfo = (personalInfo: any): ValidationResult => {
  const errors: string[] = []

  if (!personalInfo.firstName?.trim()) {
    errors.push('First name is required')
  }
  
  if (!personalInfo.lastName?.trim()) {
    errors.push('Last name is required')
  }
  
  if (!personalInfo.email?.trim()) {
    errors.push('Email is required')
  } else if (!isValidEmail(personalInfo.email)) {
    errors.push('Please enter a valid email address')
  }
  
  if (!personalInfo.phone?.trim()) {
    errors.push('Phone number is required')
  } else if (!isValidPhone(personalInfo.phone)) {
    errors.push('Please enter a valid phone number')
  }
  
  if (!personalInfo.location?.trim()) {
    errors.push('Location is required')
  }
  
  if (!personalInfo.summary?.trim()) {
    errors.push('Professional summary is required')
  } else if (personalInfo.summary.trim().length < 50) {
    errors.push('Professional summary should be at least 50 characters')
  } else if (personalInfo.summary.trim().length > 500) {
    errors.push('Professional summary should not exceed 500 characters')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Experience Validation
export const validateExperience = (experience: any[]): ValidationResult => {
  const errors: string[] = []

  if (!experience || experience.length === 0) {
    errors.push('At least one work experience entry is required')
    return { isValid: false, errors }
  }

  experience.forEach((exp, index) => {
    const expNum = index + 1
    
    if (!exp.position?.trim()) {
      errors.push(`Experience ${expNum}: Position/Job title is required`)
    }
    
    if (!exp.company?.trim()) {
      errors.push(`Experience ${expNum}: Company name is required`)
    }
    
    if (!exp.startDate?.trim()) {
      errors.push(`Experience ${expNum}: Start date is required`)
    }
    
    if (!exp.description?.trim()) {
      errors.push(`Experience ${expNum}: Job description is required`)
    } else if (exp.description.trim().length < 20) {
      errors.push(`Experience ${expNum}: Job description should be at least 20 characters`)
    }

    // Validate date logic (only if not current job and end date is provided)
    if (exp.startDate && exp.endDate && !exp.current) {
      if (new Date(exp.startDate) > new Date(exp.endDate)) {
        errors.push(`Experience ${expNum}: End date cannot be before start date`)
      }
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Education Validation
export const validateEducation = (education: any[]): ValidationResult => {
  const errors: string[] = []

  if (!education || education.length === 0) {
    errors.push('At least one education entry is required')
    return { isValid: false, errors }
  }

  education.forEach((edu, index) => {
    const eduNum = index + 1
    
    if (!edu.degree?.trim()) {
      errors.push(`Education ${eduNum}: Degree/Program is required`)
    }
    
    if (!edu.institution?.trim()) {
      errors.push(`Education ${eduNum}: Institution name is required`)
    }
    
    if (!edu.startDate?.trim()) {
      errors.push(`Education ${eduNum}: Start date is required`)
    }
    
    if (!edu.endDate?.trim()) {
      errors.push(`Education ${eduNum}: End date is required`)
    }

    // Validate date logic
    if (edu.startDate && edu.endDate) {
      if (new Date(edu.startDate) > new Date(edu.endDate)) {
        errors.push(`Education ${eduNum}: End date cannot be before start date`)
      }
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Skills Validation
export const validateSkills = (skills: any[]): ValidationResult => {
  const errors: string[] = []

  if (!skills || skills.length === 0) {
    errors.push('At least 3 skills are required')
    return { isValid: false, errors }
  }

  if (skills.length < 3) {
    errors.push('Please add at least 3 skills')
  }

  skills.forEach((skill, index) => {
    const skillNum = index + 1
    
    if (!skill.name?.trim()) {
      errors.push(`Skill ${skillNum}: Skill name is required`)
    }
    
    if (!skill.level || skill.level < 1 || skill.level > 5) {
      errors.push(`Skill ${skillNum}: Skill level must be between 1 and 5`)
    }
  })

  // Check for duplicate skills
  const skillNames = skills.map(s => s.name?.toLowerCase().trim()).filter(Boolean)
  const duplicates = skillNames.filter((name, index) => skillNames.indexOf(name) !== index)
  if (duplicates.length > 0) {
    errors.push('Duplicate skills are not allowed')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Template Selection Validation
export const validateTemplateSelection = (selectedTemplate: string): ValidationResult => {
  const errors: string[] = []

  if (!selectedTemplate?.trim()) {
    errors.push('Please select a CV template')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Overall CV Validation
export const validateFullCV = (cvData: any): ValidationResult => {
  const allErrors: string[] = []

  const templateValidation = validateTemplateSelection(cvData.selectedTemplate)
  const personalValidation = validatePersonalInfo(cvData.personalInfo)
  const experienceValidation = validateExperience(cvData.experience)
  const educationValidation = validateEducation(cvData.education)
  const skillsValidation = validateSkills(cvData.skills)

  allErrors.push(...templateValidation.errors)
  allErrors.push(...personalValidation.errors)
  allErrors.push(...experienceValidation.errors)
  allErrors.push(...educationValidation.errors)
  allErrors.push(...skillsValidation.errors)

  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  }
}

// Helper functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Get validation for specific step
export const getStepValidation = (stepIndex: number, cvData: any): ValidationResult => {
  switch (stepIndex) {
    case 0: // Template selection
      return validateTemplateSelection(cvData.selectedTemplate)
    case 1: // Personal info
      return validatePersonalInfo(cvData.personalInfo)
    case 2: // Experience
      return validateExperience(cvData.experience)
    case 3: // Education
      return validateEducation(cvData.education)
    case 4: // Skills
      return validateSkills(cvData.skills)
    default:
      return { isValid: true, errors: [] }
  }
}