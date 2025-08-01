'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { VideoIntroduction } from '@/components/video/video-introduction'
import { VideoPlayer } from '@/components/video/video-player'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { 
  Sparkles,
  Video,
  ArrowLeft,
  Play,
  Camera,
  Upload,
  Star,
  FileText,
  User
} from 'lucide-react'
import { useState } from 'react'

interface VideoData {
  file: File
  thumbnail: string
  duration: number
}

export default function VideoIntroPage() {
  const [videoData, setVideoData] = useState<VideoData | null>(null)
  const [savedVideos, setSavedVideos] = useState<any[]>([])

  const handleVideoChange = (video: VideoData | null) => {
    setVideoData(video)
  }

  const saveVideo = async () => {
    if (!videoData) return

    // In a real implementation, this would save to Supabase storage
    const newVideo = {
      id: Date.now().toString(),
      url: URL.createObjectURL(videoData.file),
      thumbnail: videoData.thumbnail,
      duration: videoData.duration,
      createdAt: new Date().toISOString(),
      title: `Video Introduction ${savedVideos.length + 1}`
    }

    setSavedVideos(prev => [newVideo, ...prev])
    alert('Video introduction saved successfully!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Video className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Professional Video Introduction
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create compelling video introductions that make you stand out to recruiters and hiring managers
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Record Directly</h3>
              <p className="text-sm text-gray-600">
                Use your webcam to record professional video introductions directly in the browser
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Upload Videos</h3>
              <p className="text-sm text-gray-600">
                Upload pre-recorded videos from your device with automatic compression
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Professional Quality</h3>
              <p className="text-sm text-gray-600">
                Automatic thumbnail generation and optimization for professional presentation
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Video Creation Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <VideoIntroduction 
            onVideoChange={handleVideoChange}
            maxDuration={60}
          />
          
          {videoData && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={saveVideo}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Save Video Introduction
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 py-8">
          <h2 className="text-2xl font-bold mb-4">Complete Your Professional Profile</h2>
          <p className="text-gray-600 mb-6">
            Combine your video introduction with a professional CV and portfolio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <FileText className="mr-2 h-4 w-4" />
                Create My CV
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-2">
                <User className="mr-2 h-4 w-4" />
                Create Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}