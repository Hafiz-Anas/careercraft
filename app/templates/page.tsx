'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Navigation } from '@/components/navigation'
import { 
  Search, 
  Filter, 
  Sparkles, 
  FileText, 
  ArrowRight,
  Star,
  Users,
  Download,
  Eye
} from 'lucide-react'
// import { TemplatePreview } from '@/components/cv-templates/template-preview'

interface Template {
  id: string
  name: string
  description: string
  category: 'modern' | 'executive' | 'creative' | 'tech'
  preview_image: string
  is_active: boolean
  created_at: string
  featured?: boolean
  price?: 'free' | 'premium'
}

const categories = [
  { id: 'all', name: 'All Templates', icon: FileText },
  { id: 'modern', name: 'Modern Professional', icon: Sparkles },
  { id: 'executive', name: 'Executive', icon: Star },
  { id: 'creative', name: 'Creative', icon: Users },
  { id: 'tech', name: 'Tech & IT', icon: Download }
]

// Fallback templates for when API is not available
const fallbackTemplates: Template[] = [
  {
    id: '1',
    name: 'Executive Leadership',
    description: 'Sophisticated design perfect for C-suite executives and senior leadership roles. Features executive-level typography and strategic layout.',
    category: 'executive',
    preview_image: '/templates/executive-preview.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    featured: true,
    price: 'premium'
  },
  {
    id: '2',
    name: 'Tech Professional',
    description: 'Clean, modern layout optimized for software engineers, developers, and tech professionals. Highlights technical skills and projects.',
    category: 'tech',
    preview_image: '/templates/tech-preview.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    featured: true,
    price: 'free'
  },
  {
    id: '3',
    name: 'Creative Portfolio',
    description: 'Bold, artistic design that showcases creativity and visual work. Perfect for designers, artists, and creative professionals.',
    category: 'creative',
    preview_image: '/templates/creative-preview.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    price: 'free'
  },
  {
    id: '4',
    name: 'Modern Professional',
    description: 'Contemporary design ideal for business professionals across all industries. Clean, ATS-friendly, and highly versatile.',
    category: 'modern',
    preview_image: '/templates/modern-preview.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    featured: true,
    price: 'free'
  },
  {
    id: '5',
    name: 'Executive Finance',
    description: 'Premium design crafted for finance executives, banking professionals, and investment experts. Conservative yet impactful.',
    category: 'executive',
    preview_image: '/templates/finance-preview.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    price: 'premium'
  },
  {
    id: '6',
    name: 'Tech Startup',
    description: 'Dynamic design for startup founders, product managers, and innovation leaders. Emphasizes growth mindset and results.',
    category: 'tech',
    preview_image: '/templates/startup-preview.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    price: 'free'
  },
  {
    id: '7',
    name: 'Creative Director',
    description: 'High-impact design for creative directors, brand managers, and marketing leaders. Showcases strategic creativity.',
    category: 'creative',
    preview_image: '/templates/director-preview.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    price: 'premium'
  },
  {
    id: '8',
    name: 'Modern Corporate',
    description: 'Professional design for corporate environments. Perfect for consultants, analysts, and business development roles.',
    category: 'modern',
    preview_image: '/templates/corporate-preview.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    price: 'free'
  }
]

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchTemplates()
  }, [])

  useEffect(() => {
    filterTemplates()
  }, [templates, searchTerm, selectedCategory])

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/templates')
      
      if (!response.ok) {
        throw new Error('Failed to fetch templates')
      }

      const data = await response.json()
      setTemplates(data.templates || [])
      setError(null)
    } catch (err) {
      console.log('Using fallback templates due to API error:', err)
      setTemplates(fallbackTemplates)
      setError(null) // Don't show error to user, just use fallbacks
    } finally {
      setLoading(false)
    }
  }

  const filterTemplates = () => {
    let filtered = templates

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTemplates(filtered)
  }

  const handleUseTemplate = (templateId: string) => {
    // Redirect to create page with template ID
    window.location.href = `/create?template=${templateId}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navigation />

        {/* Loading Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Professional CV Templates
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              That Get You Hired
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose from our collection of professionally designed CV templates. Each template is 
            crafted by career experts and optimized for Applicant Tracking Systems (ATS).
          </p>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-12">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-blue-500" />
              <span>ATS-Optimized</span>
            </div>
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4 text-green-500" />
              <span>PDF Export</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-500" />
              <span>Used by 50,000+ professionals</span>
            </div>
          </div>
        </div>

        {/* Featured Templates */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Templates</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>Most Popular This Month</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {fallbackTemplates.filter(t => t.featured).slice(0, 3).map((template) => (
              <Card key={template.id} className="overflow-hidden border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 group relative">
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ FEATURED
                  </div>
                </div>
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    <div className="text-center">
                      <FileText className="h-20 w-20 mx-auto mb-4 opacity-40" />
                      <span className="text-sm font-medium">{template.name}</span>
                    </div>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {template.name}
                  </CardTitle>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {template.description}
                  </p>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <Button 
                    onClick={() => handleUseTemplate(template.id)}
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Use Template <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-2"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`h-12 px-6 whitespace-nowrap ${
                  selectedCategory === category.id 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                    : ""
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No templates found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {template.featured && (
                      <span className="px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        FEATURED
                      </span>
                    )}
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      template.category === 'modern' ? 'bg-blue-100 text-blue-800' :
                      template.category === 'executive' ? 'bg-purple-100 text-purple-800' :
                      template.category === 'tech' ? 'bg-green-100 text-green-800' :
                      'bg-pink-100 text-pink-800'
                    }`}>
                      {template.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      template.price === 'premium' 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {template.price === 'premium' ? 'PRO' : 'FREE'}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <span className="text-sm">Template Preview</span>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="p-6">
                  <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                    {template.name}
                  </CardTitle>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {template.description}
                  </p>
                </CardHeader>
                
                <CardContent className="px-6 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Eye className="h-4 w-4" />
                      <span>ATS Optimized</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">(4.9)</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleUseTemplate(template.id)}
                    className={`w-full ${
                      template.price === 'premium' 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    }`}
                  >
                    {template.price === 'premium' ? 'Upgrade & Use' : 'Use Template'} 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Perfect CV?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have successfully landed their dream jobs with CareerCraft.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg" 
              asChild
            >
              <Link href="/create">
                Start Creating Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}