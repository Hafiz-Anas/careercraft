'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { 
  Palette, 
  Layout, 
  Eye, 
  Save, 
  Settings, 
  User,
  FileText,
  Briefcase,
  Award,
  Mail,
  ArrowRight,
  ArrowLeft,
  Check,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react'
import { PortfolioData, PortfolioCustomization } from '@/types/portfolio'
import { MinimalTemplate } from '@/components/portfolio/templates/minimal-template'
import { CreativeTemplate } from '@/components/portfolio/templates/creative-template'
import { ProfessionalTemplate } from '@/components/portfolio/templates/professional-template'
import { portfolioThemes, getDefaultCustomization } from '@/lib/portfolio-utils'

const steps = [
  { id: 'template', title: 'Choose Template', icon: Layout },
  { id: 'content', title: 'Add Content', icon: FileText },
  { id: 'customize', title: 'Customize Design', icon: Palette },
  { id: 'preview', title: 'Preview & Publish', icon: Eye }
]

export default function PortfolioBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [portfolioData, setPortfolioData] = useState<Partial<PortfolioData>>({
    customization: getDefaultCustomization()
  })
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  // Template selection
  const templates = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean and elegant design focused on content',
      preview: '/templates/minimal-preview.jpg',
      component: MinimalTemplate
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and artistic design for creative professionals',
      preview: '/templates/creative-preview.jpg',
      component: CreativeTemplate
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate design perfect for business professionals',
      preview: '/templates/professional-preview.jpg',
      component: ProfessionalTemplate
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    setPortfolioData(prev => ({
      ...prev,
      customization: {
        ...prev.customization!,
        template: templateId as any
      }
    }))
    handleNext()
  }

  const updateCustomization = (updates: Partial<PortfolioCustomization>) => {
    setPortfolioData(prev => ({
      ...prev,
      customization: {
        ...prev.customization!,
        ...updates
      }
    }))
  }

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'template':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Choose Your Template</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Select a template that best represents your personal brand
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  className="group cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <Card className={`overflow-hidden transition-all duration-300 ${
                    portfolioData.customization?.template === template.id 
                      ? 'ring-2 ring-blue-500 shadow-xl' 
                      : 'hover:shadow-lg'
                  }`}>
                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <Layout className="w-16 h-16 mx-auto mb-2" />
                          <p className="text-sm">Preview</p>
                        </div>
                      </div>
                      {portfolioData.customization?.template === template.id && (
                        <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="group-hover:text-blue-600 transition-colors">
                        {template.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {template.description}
                      </p>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'content':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Add Your Content</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Import from your CV or add content manually
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Import from CV
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Automatically populate your portfolio with existing CV data
                  </p>
                  <Button className="w-full">
                    Import CV Data
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Add Manually
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Create your portfolio content from scratch
                  </p>
                  <Button variant="outline" className="w-full">
                    Start Fresh
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Content sections */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: User, label: 'Personal Info', count: 0 },
                { icon: Briefcase, label: 'Experience', count: 0 },
                { icon: FileText, label: 'Projects', count: 0 },
                { icon: Award, label: 'Achievements', count: 0 }
              ].map((section) => (
                <Card key={section.label} className="text-center p-4">
                  <section.icon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <h3 className="font-semibold text-sm">{section.label}</h3>
                  <p className="text-xs text-gray-500">{section.count} items</p>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'customize':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Customize Your Design</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Make it yours with colors, fonts, and layout options
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Customization Controls */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Colors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Primary Color</Label>
                      <div className="flex gap-2 mt-2">
                        {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'].map(color => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                            style={{ backgroundColor: color }}
                            onClick={() => updateCustomization({ primaryColor: color })}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Typography</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Font Family</Label>
                      <select 
                        className="w-full mt-2 p-2 border rounded-md"
                        value={portfolioData.customization?.fontFamily}
                        onChange={(e) => updateCustomization({ fontFamily: e.target.value as any })}
                      >
                        <option value="inter">Inter</option>
                        <option value="poppins">Poppins</option>
                        <option value="playfair">Playfair Display</option>
                        <option value="roboto">Roboto</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Layout</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Hero Style</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {['centered', 'split', 'minimal'].map(style => (
                          <button
                            key={style}
                            className={`p-2 text-xs border rounded capitalize ${
                              portfolioData.customization?.heroStyle === style 
                                ? 'bg-blue-500 text-white' 
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => updateCustomization({ heroStyle: style as any })}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Preview</h3>
                  <div className="flex gap-2">
                    <button
                      className={`p-2 rounded ${previewDevice === 'desktop' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                      onClick={() => setPreviewDevice('desktop')}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      className={`p-2 rounded ${previewDevice === 'tablet' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                      onClick={() => setPreviewDevice('tablet')}
                    >
                      <Tablet className="w-4 h-4" />
                    </button>
                    <button
                      className={`p-2 rounded ${previewDevice === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                      onClick={() => setPreviewDevice('mobile')}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className={`bg-gray-100 rounded-lg p-4 ${
                  previewDevice === 'desktop' ? 'w-full' :
                  previewDevice === 'tablet' ? 'w-3/4 mx-auto' :
                  'w-1/3 mx-auto'
                }`}>
                  <div className="bg-white rounded shadow-lg overflow-hidden" style={{ height: '400px' }}>
                    <div className="p-4 text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                      <h3 className="font-bold">Your Name</h3>
                      <p className="text-sm text-gray-600">Your Title</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'preview':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Preview & Publish</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Review your portfolio and make it live
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="bg-white rounded shadow-lg overflow-hidden" style={{ height: '500px' }}>
                        <div className="p-6 text-center">
                          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                          <h3 className="text-xl font-bold mb-2">Portfolio Preview</h3>
                          <p className="text-gray-600 mb-4">This is how your portfolio will look</p>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Publish Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Portfolio URL</Label>
                      <div className="flex mt-2">
                        <span className="bg-gray-100 px-3 py-2 border border-r-0 rounded-l text-sm">
                          careercraft.com/u/
                        </span>
                        <Input 
                          placeholder="username" 
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="public" className="rounded" />
                      <Label htmlFor="public">Make portfolio public</Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Page Title</Label>
                      <Input placeholder="Your Name - Portfolio" />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea 
                        className="w-full p-2 border rounded-md" 
                        rows={3}
                        placeholder="Brief description of your portfolio..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full" size="lg">
                  <Save className="w-5 h-5 mr-2" />
                  Publish Portfolio
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  index <= currentStep 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'border-gray-300 text-gray-300'
                }`}>
                  {index < currentStep ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="ml-4 hidden md:block">
                  <p className={`text-sm font-medium ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Step {index + 1}
                  </p>
                  <p className={`text-sm ${
                    index <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="max-w-6xl mx-auto mt-12 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}