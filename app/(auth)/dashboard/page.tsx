'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/components/providers'
import { 
  Plus, 
  FileText, 
  MoreVertical, 
  Eye, 
  Download, 
  Share2, 
  Trash2,
  Search,
  Filter,
  Sparkles,
  Video
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface CV {
  id: string
  title: string
  created_at: string
  updated_at: string
  is_public: boolean
  slug?: string
  templates: {
    id: string
    name: string
    category: string
    preview_image: string
  }
}

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [cvs, setCvs] = useState<CV[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin')
      return
    }

    fetchCVs()
  }, [user, router])

  const fetchCVs = async () => {
    try {
      const response = await fetch('/api/cvs')
      const data = await response.json()
      
      if (response.ok) {
        setCvs(data.cvs || [])
      }
    } catch (error) {
      console.error('Error fetching CVs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCV = async (id: string) => {
    if (!confirm('Are you sure you want to delete this CV?')) return

    try {
      const response = await fetch(`/api/cvs/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setCvs(cvs.filter(cv => cv.id !== id))
      }
    } catch (error) {
      console.error('Error deleting CV:', error)
    }
  }

  const filteredCVs = cvs.filter(cv => {
    const matchesSearch = cv.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || cv.templates.category === filterCategory
    return matchesSearch && matchesCategory
  })

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="border-b border-gray-200/50 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 font-bold text-xl group">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              CareerCraft
            </span>
          </Link>
          <nav className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-1.5 border border-gray-200/60 shadow-sm">
              <Link href="/create" className="relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-500 text-gray-700 hover:text-blue-600 group overflow-hidden">
                <span className="relative z-10">Create CV</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl shadow-lg"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-500 rounded-full"></div>
              </Link>
              <Link href="/video-intro" className="relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-500 text-gray-700 hover:text-blue-600 group overflow-hidden">
                <span className="relative z-10">Create Video</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl shadow-lg"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-500 rounded-full"></div>
              </Link>
              <Link href="/portfolio" className="relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-500 text-gray-700 hover:text-blue-600 group overflow-hidden">
                <span className="relative z-10">Create Portfolio</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl shadow-lg"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-500 rounded-full"></div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {(user.user_metadata?.first_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.user_metadata?.first_name || user.email}
                </span>
              </div>
              <Button
                variant="outline"
                className="rounded-full border-gray-300 hover:border-gray-400"
                onClick={async () => {
                  await supabase.auth.signOut()
                  router.push('/')
                }}
              >
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Career Documents</h1>
            <p className="text-muted-foreground">
              Create and manage your professional career portfolio
            </p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link href="/create" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Create CV
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-2">
              <Link href="/video-intro" className="flex items-center">
                <Video className="mr-2 h-4 w-4" />
                Create Video
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search career documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Templates</option>
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="creative">Creative</option>
            </select>
          </div>
        </div>

        {/* CVs Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[3/4] bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredCVs.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Documents Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || filterCategory !== 'all' 
                  ? 'No documents match your current filters.'
                  : "You haven't created any career documents yet. Start building your professional portfolio today!"
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link href="/create" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Your First CV
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-2">
                  <Link href="/video-intro" className="flex items-center">
                    <Video className="mr-2 h-4 w-4" />
                    Create Video Intro
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCVs.map((cv) => (
              <Card key={cv.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="flex-row items-start justify-between space-y-0 pb-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{cv.title}</CardTitle>
                    <CardDescription>
                      {cv.templates.name} • {formatDate(cv.updated_at)}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {cv.is_public && (
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/cv/${cv.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/create?cv=${cv.id}`}>
                        <FileText className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteCV(cv.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center text-muted-foreground">
                      <FileText className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">{cv.templates.name} Template</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{cv.is_public ? 'Public' : 'Private'}</span>
                    <span>Updated {formatDate(cv.updated_at)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}