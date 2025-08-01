'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
// import { TemplatePreview } from '@/components/cv-templates/template-preview'
import { 
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Award,
  FolderOpen,
  FileText,
  ArrowLeft,
  ArrowRight,
  Download,
  Eye,
  Plus,
  X,
  Trophy
} from 'lucide-react'
import { ModernTemplate } from '@/components/cv-templates/modern-template'
import { ClassicTemplate } from '@/components/cv-templates/classic-template'
import { CreativeTemplate } from '@/components/cv-templates/creative-template'
import { MinimalTemplate } from '@/components/cv-templates/minimal-template'
import { ExecutiveTemplate } from '@/components/cv-templates/executive-template'
import { TechTemplate } from '@/components/cv-templates/tech-template'
import { CorporateTemplate } from '@/components/cv-templates/corporate-template'
import { 
  validateFullCV, 
  getStepValidation, 
  ValidationResult 
} from '@/lib/validations'
import { Tooltip } from '@/components/ui/tooltip'

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
}

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
}

interface Skill {
  id: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  category: string
}

interface CVData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  selectedTemplate: string
}

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design perfect for tech and business roles',
    component: ModernTemplate
  },
  {
    id: 'executive',
    name: 'Executive Professional',
    description: 'Sophisticated design for senior leaders and C-level executives',
    component: ExecutiveTemplate
  },
  {
    id: 'tech',
    name: 'Tech Innovator',
    description: 'Modern design optimized for software engineers and tech professionals',
    component: TechTemplate
  },
  {
    id: 'corporate',
    name: 'Corporate Elite',
    description: 'Premium design for business leaders and management roles',
    component: CorporateTemplate
  },
  {
    id: 'classic',
    name: 'Classic Executive', 
    description: 'Traditional layout ideal for corporate and senior positions',
    component: ClassicTemplate
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Bold and artistic design for creative professionals',
    component: CreativeTemplate
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Sleek minimalist design with focus on content',
    component: MinimalTemplate
  }
]

const initialCVData: CVData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  selectedTemplate: 'modern'
}

const steps = [
  { key: 'template', label: 'Choose Template', icon: FileText },
  { key: 'personal', label: 'Personal Info', icon: User },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'skills', label: 'Skills', icon: Award },
]

export default function CreateCVPage() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [cvData, setCvData] = useState<CVData>(initialCVData)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [showValidationErrors, setShowValidationErrors] = useState(false)
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false)
  const [isFullCVValid, setIsFullCVValid] = useState(false)

  useEffect(() => {
    const templateId = searchParams.get('template')
    if (templateId && templates.find(t => t.id === templateId)) {
      setCvData(prev => ({ ...prev, selectedTemplate: templateId }))
    }
  }, [searchParams])

  // Validation effect
  useEffect(() => {
    // Validate current step
    const currentStepValidation = getStepValidation(currentStep, cvData)
    setIsCurrentStepValid(currentStepValidation.isValid)
    
    // Only set validation errors if we're showing them
    if (showValidationErrors) {
      setValidationErrors(currentStepValidation.errors)
    } else {
      // Clear validation errors when not showing them
      setValidationErrors([])
    }

    // Validate full CV
    const fullCVValidation = validateFullCV(cvData)
    setIsFullCVValid(fullCVValidation.isValid)
  }, [cvData, currentStep, showValidationErrors])

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    // Hide validation errors when user starts fixing fields
    if (showValidationErrors) {
      setShowValidationErrors(false)
    }
    
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    // Hide validation errors when user starts fixing fields
    if (showValidationErrors) {
      setShowValidationErrors(false)
    }
    
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (id: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    }
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    // Hide validation errors when user starts fixing fields
    if (showValidationErrors) {
      setShowValidationErrors(false)
    }
    
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: 'Technical'
    }
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }))
  }

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    // Hide validation errors when user starts fixing fields
    if (showValidationErrors) {
      setShowValidationErrors(false)
    }
    
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }))
  }

  const removeSkill = (id: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }


  const validateCurrentStep = () => {
    return isCurrentStepValid
  }

  const getTooltipContent = () => {
    const fullValidation = validateFullCV(cvData)
    if (fullValidation.isValid) return null

    const errorsByStep = {
      template: [],
      personal: [],
      experience: [],
      education: [],
      skills: []
    }

    // Categorize errors by step
    fullValidation.errors.forEach(error => {
      if (error.includes('template')) {
        errorsByStep.template.push(error)
      } else if (error.includes('First name') || error.includes('Last name') || error.includes('Email') || error.includes('Phone') || error.includes('Location') || error.includes('summary')) {
        errorsByStep.personal.push(error)
      } else if (error.includes('Experience') || error.includes('work experience') || error.includes('Position') || error.includes('Company') || error.includes('Start date') || error.includes('description')) {
        errorsByStep.experience.push(error)
      } else if (error.includes('Education') || error.includes('education') || error.includes('Degree') || error.includes('Institution') || error.includes('Start date') || error.includes('End date')) {
        errorsByStep.education.push(error)
      } else if (error.includes('skill') || error.includes('Skill')) {
        errorsByStep.skills.push(error)
      }
    })

    const missingSteps = []
    if (errorsByStep.template.length > 0) missingSteps.push('Select a template')
    if (errorsByStep.personal.length > 0) missingSteps.push('Complete personal information')
    if (errorsByStep.experience.length > 0) missingSteps.push('Add work experience')
    if (errorsByStep.education.length > 0) missingSteps.push('Add education details')
    if (errorsByStep.skills.length > 0) missingSteps.push('Add skills (minimum 3)')

    if (missingSteps.length === 0) return 'Complete all required fields'
    
    if (missingSteps.length === 1) {
      return missingSteps[0]
    }
    
    if (missingSteps.length <= 2) {
      return missingSteps.join(' and ')
    }
    
    return `Complete: ${missingSteps.slice(0, 2).join(', ')} and ${missingSteps.length - 2} more step${missingSteps.length - 2 > 1 ? 's' : ''}`
  }

  const nextStep = () => {
    if (!validateCurrentStep()) {
      // Get current step validation errors and show them
      const currentStepValidation = getStepValidation(currentStep, cvData)
      setValidationErrors(currentStepValidation.errors)
      setShowValidationErrors(true)
      return
    }
    
    // Hide validation errors when step is valid
    setShowValidationErrors(false)
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    // Hide validation errors when navigating back
    setShowValidationErrors(false)
    
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generatePDF = async () => {
    setIsGeneratingPDF(true)
    
    try {
      // Import the PDF generator dynamically to avoid SSR issues
      const { generatePDF: createPDF } = await import('@/lib/pdf-generator')
      
      // Generate and download the PDF
      await createPDF(cvData)
      
      setIsGeneratingPDF(false)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
      setIsGeneratingPDF(false)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  const renderTemplateSelection = () => (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-6 py-3 rounded-full mb-8 shadow-lg">
          <FileText className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">Professional Templates</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
          Choose Your Perfect Template
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Select from our collection of professionally designed templates, each crafted for different industries and career levels to make your CV stand out
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.map((template) => {
          const TemplateComponent = template.component
          const isSelected = cvData.selectedTemplate === template.id
          
          return (
            <div
              key={template.id}
              className={`group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                isSelected
                  ? 'ring-4 ring-blue-500 ring-opacity-50 shadow-2xl transform -translate-y-2 scale-105'
                  : 'shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 hover:scale-102'
              }`}
              onClick={() => {
                // Hide validation errors when user selects template
                if (showValidationErrors) {
                  setShowValidationErrors(false)
                }
                setCvData(prev => ({ ...prev, selectedTemplate: template.id }))
              }}
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="transform scale-45 origin-top-left w-[222%] h-[222%]">
                  <TemplateComponent data={cvData} isPreview={true} className="w-full h-full" />
                </div>
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-4 shadow-2xl border-2 border-blue-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-blue-600 font-semibold text-sm">SELECTED</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  {isSelected ? (
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-3 shadow-lg">
                      <Eye className="h-5 w-5" />
                    </div>
                  ) : (
                    <div className="bg-white/90 backdrop-blur-sm text-gray-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                      <Eye className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className={`font-bold mb-3 text-lg ${
                  isSelected ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'
                } transition-colors duration-300`}>
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {template.description}
                </p>
                {isSelected ? (
                  <div className="flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-4 py-2 border border-blue-200">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-blue-600 text-sm font-semibold">Currently Selected</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-300">
                    <span className="text-gray-500 text-sm font-medium group-hover:text-blue-600">Click to Select</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderPersonalInfo = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={cvData.personalInfo.firstName}
              onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={cvData.personalInfo.lastName}
              onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
              placeholder="Doe"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={cvData.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="john.doe@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={cvData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={cvData.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              placeholder="New York, NY"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website/LinkedIn</Label>
            <Input
              id="website"
              value={cvData.personalInfo.website}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={cvData.personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
            placeholder="Brief overview of your professional background and key achievements..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  )

  const renderExperience = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Briefcase className="mr-2" />
            Work Experience
          </div>
          <Button onClick={addExperience} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {cvData.experience.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        ) : (
          cvData.experience.map((exp) => (
            <div key={exp.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold">Experience {cvData.experience.indexOf(exp) + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position *</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    />
                    <Label htmlFor={`current-${exp.id}`} className="text-sm">I currently work here</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )

  const renderEducation = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <GraduationCap className="mr-2" />
            Education
          </div>
          <Button onClick={addEducation} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {cvData.education.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No education added yet.</p>
            <p className="text-sm">Click "Add Education" to get started.</p>
          </div>
        ) : (
          cvData.education.map((edu) => (
            <div key={edu.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold">Education {cvData.education.indexOf(edu) + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>Institution *</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  placeholder="University/School Name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor's, Master's, PhD, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science, Business, etc."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  placeholder="Relevant coursework, achievements, honors..."
                  rows={2}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )

  const renderSkills = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Award className="mr-2" />
            Skills & Expertise
          </div>
          <Button onClick={addSkill} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {cvData.skills.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No skills added yet.</p>
            <p className="text-sm">Click "Add Skill" to showcase your expertise.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {cvData.skills.map((skill, index) => (
              <div key={skill.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">Skill {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Skill Name *</Label>
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      placeholder="e.g., JavaScript, Project Management"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select
                      value={skill.category}
                      onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="Technical">Technical</option>
                      <option value="Programming">Programming</option>
                      <option value="Design">Design</option>
                      <option value="Management">Management</option>
                      <option value="Communication">Communication</option>
                      <option value="Languages">Languages</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Proficiency Level *</Label>
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderStepContent = () => {
    switch (steps[currentStep].key) {
      case 'template':
        return renderTemplateSelection()
      case 'personal':
        return renderPersonalInfo()
      case 'experience':
        return renderExperience()
      case 'education':
        return renderEducation()
      case 'skills':
        return renderSkills()
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      {/* CV Builder Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100/50 sticky top-[73px] z-40">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center space-x-6 text-right">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl border border-blue-100">
                <div className="text-sm font-semibold text-gray-800">
                  {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
                  {(!cvData.personalInfo.firstName && !cvData.personalInfo.lastName) && "Your CV"}
                </div>
                <div className="text-xs text-blue-600 font-medium">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 ml-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowPreview(true)}
                className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 group border-gray-200 hover:border-blue-200 hover:bg-blue-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                <span className="relative z-10">Preview</span>
              </Button>
              {currentStep === steps.length - 1 && (
                <Tooltip 
                  content={getTooltipContent()} 
                  disabled={isFullCVValid}
                >
                  <Button 
                    onClick={isFullCVValid ? generatePDF : undefined} 
                    disabled={isGeneratingPDF || !isFullCVValid}
                    className={`relative overflow-hidden text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300 ${
                      isFullCVValid 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:scale-105 cursor-pointer' 
                        : 'bg-gradient-to-r from-gray-400 to-gray-500 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <span className="relative z-10 flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      {isGeneratingPDF ? 'Generating...' : isFullCVValid ? 'Download PDF' : 'Complete CV to Download'}
                    </span>
                    {isFullCVValid && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </Button>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Enhanced Step Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100/50 max-w-5xl w-full backdrop-blur-sm">
            {/* Main Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-gray-600">CV Builder Progress</div>
                <div className="text-sm font-bold text-blue-600">{Math.round(progress)}% Complete</div>
              </div>
              <div className="relative">
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out rounded-full shadow-sm"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div 
                  className="absolute top-0 h-3 w-3 bg-white border-3 border-blue-500 rounded-full shadow-lg transition-all duration-1000 ease-out"
                  style={{ left: `calc(${progress}% - 6px)`, transform: 'translateY(-1px)' }}
                />
              </div>
            </div>

            {/* Validation Errors - Only show when user tries to proceed */}
            {showValidationErrors && validationErrors.length > 0 && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <h4 className="text-sm font-semibold text-red-800">Please fix the following errors:</h4>
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm text-red-700">{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Step Icons */}
            <div className="flex items-center justify-between relative">
              {/* Background line */}
              <div className="absolute top-8 left-12 right-12 h-0.5 bg-gray-200 -z-10"></div>
              <div 
                className="absolute top-8 left-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out -z-10"
                style={{ width: `calc(${Math.min(progress, 100)}% - 96px)` }}
              ></div>

              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isCompleted = index < currentStep
                const isClickable = index <= currentStep || isCompleted
                
                return (
                  <div key={step.key} className="flex flex-col items-center space-y-3 flex-1">
                    <button
                      onClick={() => {
                        if (isClickable) {
                          // Hide validation errors when navigating to different step
                          setShowValidationErrors(false)
                          setCurrentStep(index)
                        }
                      }}
                      disabled={!isClickable}
                      className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 transform ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl scale-110 rotate-3'
                          : isCompleted
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-xl hover:shadow-2xl hover:scale-105'
                          : isClickable
                          ? 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:shadow-lg hover:scale-105 border-2 border-gray-200'
                          : 'bg-gray-50 text-gray-300 border-2 border-gray-100 cursor-not-allowed'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-pulse opacity-75"></div>
                      )}
                      <div className="relative z-10">
                        {isCompleted ? (
                          <div className="flex items-center justify-center">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <span className="text-green-500 text-sm font-bold">✓</span>
                            </div>
                          </div>
                        ) : (
                          <Icon className="h-7 w-7" />
                        )}
                      </div>
                      
                      {isActive && (
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-20 animate-ping"></div>
                      )}
                    </button>
                    
                    <div className="text-center">
                      <p className={`text-sm font-semibold transition-colors duration-300 ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                      <p className={`text-xs mt-1 transition-colors duration-300 ${
                        isActive ? 'text-blue-500' : isCompleted ? 'text-green-500' : 'text-gray-400'
                      }`}>
                        {isCompleted ? 'Completed' : isActive ? 'In Progress' : `Step ${index + 1}`}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Status Message */}
            <div className="mt-8 text-center">
              <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium ${
                currentStep === steps.length - 1 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200'
                  : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200'
              }`}>
                {currentStep === steps.length - 1 ? (
                  <>
                    <Trophy className="h-4 w-4" />
                    <span>🎉 Ready to generate your professional CV!</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-4 w-4" />
                    <span>Complete {steps[currentStep].label} to continue your CV journey</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Tooltip 
              content={getTooltipContent()} 
              disabled={isFullCVValid}
            >
              <Button
                onClick={isFullCVValid ? generatePDF : undefined}
                disabled={isGeneratingPDF || !isFullCVValid}
                className={`flex items-center transition-all duration-300 ${
                  isFullCVValid 
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 cursor-pointer' 
                    : 'bg-gradient-to-r from-gray-400 to-gray-500 opacity-60 cursor-not-allowed'
                }`}
              >
                <Download className="h-4 w-4 mr-2" />
                {isGeneratingPDF ? 'Generating...' : isFullCVValid ? 'Generate CV' : 'Complete CV to Generate'}
              </Button>
            </Tooltip>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t">
          <p className="text-gray-600 mb-4">
            ✅ No account required • ✅ Free to use • ✅ Export as PDF
          </p>
          <div className="text-sm text-gray-500">
            Want to save your CVs and access more features? <Link href="/auth/signup" className="text-blue-600 hover:underline">Create a free account</Link>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-xl font-bold">CV Preview</h3>
                <p className="text-sm text-gray-600">
                  {cvData.personalInfo.firstName} {cvData.personalInfo.lastName || 'Your CV Preview'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Tooltip 
                  content={getTooltipContent()} 
                  disabled={isFullCVValid}
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={isFullCVValid ? generatePDF : undefined}
                    disabled={isGeneratingPDF || !isFullCVValid}
                    className={`transition-all duration-300 ${
                      isFullCVValid 
                        ? 'hover:bg-blue-50 hover:border-blue-300 cursor-pointer' 
                        : 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400'
                    }`}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isGeneratingPDF ? 'Generating...' : isFullCVValid ? 'Download PDF' : 'Complete CV to Download'}
                  </Button>
                </Tooltip>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowPreview(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-100px)] bg-gray-100 p-6">
              <div className="bg-white shadow-lg mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
                {(() => {
                  const selectedTemplate = templates.find(t => t.id === cvData.selectedTemplate)
                  if (selectedTemplate) {
                    const TemplateComponent = selectedTemplate.component
                    return <TemplateComponent data={cvData} isPreview={false} />
                  }
                  return (
                    <div className="p-8 text-center text-gray-500">
                      <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Select a template to see preview</p>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}