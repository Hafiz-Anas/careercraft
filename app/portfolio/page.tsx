'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { 
  Sparkles,
  User,
  ArrowLeft,
  Briefcase,
  Camera,
  FileText,
  Video,
  Plus,
  ExternalLink
} from 'lucide-react'

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Professional Portfolio Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create stunning portfolios that showcase your work, skills, and achievements to potential employers and clients
          </p>
        </div>

        {/* Portfolio Builder Available */}
        <Card className="max-w-4xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-2xl mb-4 text-green-600">🎉 Portfolio Builder is Now Live!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-gray-600 text-lg">
                Create stunning, professional portfolios with our new portfolio builder. Choose from beautiful templates and customize every detail.
              </p>
              
              {/* Feature Highlights */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Camera className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Media Gallery</h3>
                  <p className="text-xs text-gray-600">Showcase your work with images and videos</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Personal Branding</h3>
                  <p className="text-xs text-gray-600">Professional layouts that represent you</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <ExternalLink className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Easy Sharing</h3>
                  <p className="text-xs text-gray-600">Share your portfolio with a custom URL</p>
                </div>
              </div>

              {/* New Features */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <Sparkles className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">3 Beautiful Templates</h3>
                  <p className="text-xs text-gray-600">Minimal, Creative, and Professional designs</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <Plus className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Interactive Features</h3>
                  <p className="text-xs text-gray-600">Skills radar, timeline, and contact forms</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <Video className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Video Integration</h3>
                  <p className="text-xs text-gray-600">Add video introductions to your portfolio</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4" asChild>
                  <Link href="/portfolio/builder" className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Start Building Your Portfolio
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 px-8 py-4" asChild>
                  <Link href="/u/demo" className="flex items-center">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    View Demo Portfolio
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Or continue creating traditional documents:
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center mt-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/create" className="flex items-center">
                    <FileText className="mr-1 h-4 w-4" />
                    Create CV
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/video-intro" className="flex items-center">
                    <Video className="mr-1 h-4 w-4" />
                    Video Intro
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Newsletter Signup */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-xl mx-auto">
            <h3 className="text-xl font-bold mb-2">Get Notified When Portfolio Builder Launches</h3>
            <p className="text-gray-600 mb-4">Be the first to know when our portfolio feature goes live!</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Notify Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}