'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { 
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  FileText,
  ArrowLeft,
  ArrowRight,
  Download,
  Plus,
  X
} from 'lucide-react'

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  summary: string
}

interface Experience {
  id: string
  company: string
  position: string
  description: string
}

const templates = [
  { id: 'modern', name: 'Modern Professional', description: 'Clean and contemporary design' },
  { id: 'classic', name: 'Classic Executive', description: 'Traditional layout' },
  { id: 'creative', name: 'Creative Designer', description: 'Bold and artistic design' },
  { id: 'minimal', name: 'Minimal Clean', description: 'Sleek minimalist design' }
]

export default function BuildCVPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    summary: ''
  })
  const [experience, setExperience] = useState<Experience[]>([])
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const steps = [
    { key: 'template', label: 'Template', icon: FileText },
    { key: 'personal', label: 'Personal Info', icon: User },
    { key: 'experience', label: 'Experience', icon: Briefcase },
  ]

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }))
  }

  const addExperience = () => {
    setExperience(prev => [...prev, {
      id: Date.now().toString(),
      company: '',
      position: '',
      description: ''
    }])
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperience(prev => prev.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ))
  }

  const removeExperience = (id: string) => {
    setExperience(prev => prev.filter(exp => exp.id !== id))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generatePDF = () => {
    setIsGeneratingPDF(true)
    setTimeout(() => {
      alert(`CV Generated Successfully!
      
Name: ${personalInfo.firstName} ${personalInfo.lastName}
Template: ${selectedTemplate}
Experience: ${experience.length} items

Your CV is ready! In a real app, this would download a PDF.`)
      setIsGeneratingPDF(false)
    }, 2000)
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  const renderTemplateSelection = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Choose Your CV Template</CardTitle>
        <p className="text-center text-muted-foreground">
          Select a professional template for your CV
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <FileText className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">{template.name}</h3>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
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
            <Label>First Name *</Label>
            <Input
              value={personalInfo.firstName}
              onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label>Last Name *</Label>
            <Input
              value={personalInfo.lastName}
              onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
              placeholder="Doe"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="john.doe@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Professional Summary</Label>
          <Textarea
            value={personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
            placeholder="Brief overview of your professional background..."
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
        {experience.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        ) : (
          experience.map((exp, index) => (
            <div key={exp.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold">Experience {index + 1}</h4>
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

  const renderStepContent = () => {
    switch (steps[currentStep].key) {
      case 'template':
        return renderTemplateSelection()
      case 'personal':
        return renderPersonalInfo()
      case 'experience':
        return renderExperience()
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CareerCraft
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium">
                {personalInfo.firstName} {personalInfo.lastName || "Your CV"}
              </div>
              <div className="text-xs text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            
            <div className="flex space-x-2">
              {currentStep === steps.length - 1 && (
                <Button 
                  onClick={generatePDF} 
                  disabled={isGeneratingPDF}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isGeneratingPDF ? 'Generating...' : 'Download CV'}
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-4">
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 bg-white rounded-full p-2 shadow-sm">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              
              return (
                <button
                  key={step.key}
                  onClick={() => setCurrentStep(index)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : isCompleted
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{step.label}</span>
                  {isCompleted && <span className="ml-2">✓</span>}
                </button>
              )
            })}
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
            <Button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              {isGeneratingPDF ? 'Generating...' : 'Create My CV'}
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t">
          <p className="text-gray-600 mb-4">
            ✅ No login required • ✅ Completely free • ✅ Professional templates
          </p>
          <div className="text-sm text-gray-500">
            Ready to level up? <Link href="/auth/signup" className="text-blue-600 hover:underline">Create an account</Link> to save your CVs
          </div>
        </div>
      </div>
    </div>
  )
}