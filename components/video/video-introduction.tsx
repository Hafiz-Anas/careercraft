'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { 
  Video, 
  Camera, 
  Square, 
  Play, 
  Pause, 
  Upload, 
  X, 
  Check,
  AlertCircle,
  RotateCcw,
  Download,
  Palette,
  Maximize,
  Volume2,
  VolumeX,
  Settings,
  SkipBack,
  SkipForward
} from 'lucide-react'

interface VideoIntroductionProps {
  onVideoChange: (video: { file: File; thumbnail: string; duration: number } | null) => void
  initialVideo?: { url: string; thumbnail: string; duration: number } | null
}

export function VideoIntroduction({ 
  onVideoChange, 
  initialVideo = null
}: VideoIntroductionProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordedVideo, setRecordedVideo] = useState<Blob | null>(null)
  const [videoURL, setVideoURL] = useState<string | null>(initialVideo?.url || null)
  const [thumbnail, setThumbnail] = useState<string | null>(initialVideo?.thumbnail || null)
  const [duration, setDuration] = useState<number>(initialVideo?.duration || 0)
  const [recordingTime, setRecordingTime] = useState(0)
  const [maxDuration, setMaxDuration] = useState(60) // Default 1 minute
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recordingSupported, setRecordingSupported] = useState(true)
  const [selectedBackground, setSelectedBackground] = useState<string>('none')
  const [showBackgrounds, setShowBackgrounds] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)

  // Custom video player states
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null)
  const playbackVideoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)

  // Check if recording is supported
  useEffect(() => {
    const checkSupport = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        const mediaRecorder = new MediaRecorder(stream)
        stream.getTracks().forEach(track => track.stop())
        setRecordingSupported(true)
      } catch (err) {
        console.log('Recording not supported:', err)
        setRecordingSupported(false)
      }
    }
    checkSupport()
  }, [])

  const generateThumbnail = useCallback((videoFile: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      
      video.onloadedmetadata = () => {
        canvas.width = 320
        canvas.height = 180
        video.currentTime = 1 // Get frame at 1 second
      }
      
      video.onseeked = () => {
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
          canvas.toBlob((blob) => {
            if (blob) {
              const thumbnailURL = URL.createObjectURL(blob)
              resolve(thumbnailURL)
            } else {
              reject(new Error('Failed to generate thumbnail'))
            }
          }, 'image/jpeg', 0.7)
        }
      }
      
      video.onerror = () => reject(new Error('Failed to load video'))
      video.src = URL.createObjectURL(videoFile)
      video.load()
    })
  }, [])

  const getVideoDuration = useCallback((videoFile: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      video.onloadedmetadata = () => {
        resolve(video.duration)
      }
      video.onerror = () => reject(new Error('Failed to get video duration'))
      video.src = URL.createObjectURL(videoFile)
      video.load()
    })
  }, [])

  const compressVideo = useCallback(async (videoFile: File): Promise<File> => {
    // For now, we'll just return the original file
    // In production, you might want to use ffmpeg.wasm or a compression service
    return videoFile
  }, [])

  const applyVideoEffects = useCallback(() => {
    if (!videoRef.current) return
    
    const video = videoRef.current
    const videoContainer = video.parentElement
    
    // Apply effects directly to video element for real-time preview
    if (selectedBackground === 'blur') {
      video.style.filter = 'blur(8px)'
      video.style.transform = 'scale(1.1)' // Slight zoom to hide blur edges
      if (videoContainer) {
        videoContainer.style.background = 'none'
      }
    } else if (selectedBackground !== 'none') {
      // For virtual backgrounds, apply background to container
      const background = professionalBackgrounds.find(bg => bg.id === selectedBackground)
      if (background && background.type === 'virtual' && videoContainer) {
        video.style.filter = 'brightness(1.1) contrast(1.1)'
        video.style.transform = 'scale(1)'
        video.style.mixBlendMode = 'multiply'
        videoContainer.style.background = background.preview
        videoContainer.style.backgroundSize = 'cover'
        videoContainer.style.backgroundPosition = 'center'
      }
    } else {
      // Reset to original
      video.style.filter = 'none'
      video.style.transform = 'scale(1)'
      video.style.mixBlendMode = 'normal'
      if (videoContainer) {
        videoContainer.style.background = 'none'
      }
    }
  }, [selectedBackground])

  // Enhanced background application with canvas-based replacement
  const applyCanvasBackground = useCallback(() => {
    if (!videoRef.current || !cameraReady) return
    
    const video = videoRef.current
    const videoContainer = video.parentElement
    if (!videoContainer) return

    const background = professionalBackgrounds.find(bg => bg.id === selectedBackground)
    if (!background) return

    if (background.type === 'virtual') {
      // Apply virtual background using CSS overlay
      const overlay = videoContainer.querySelector('.background-overlay') as HTMLElement
      
      if (!overlay) {
        const newOverlay = document.createElement('div')
        newOverlay.className = 'background-overlay'
        newOverlay.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: multiply;
          opacity: 0.7;
        `
        videoContainer.appendChild(newOverlay)
        newOverlay.style.background = background.preview
      } else {
        overlay.style.background = background.preview
      }
      
      // Ensure video is positioned correctly
      video.style.position = 'relative'
      video.style.zIndex = '2'
      video.style.mixBlendMode = 'screen'
      
    } else if (background.type === 'blur') {
      // Remove any overlay for blur effect
      const overlay = videoContainer.querySelector('.background-overlay')
      if (overlay) {
        overlay.remove()
      }
      video.style.mixBlendMode = 'normal'
    } else {
      // Remove overlay for no background
      const overlay = videoContainer.querySelector('.background-overlay')
      if (overlay) {
        overlay.remove()
      }
      video.style.mixBlendMode = 'normal'
    }
  }, [selectedBackground, cameraReady])

  const startRecording = useCallback(async () => {
    if (!streamRef.current) return
    
    try {
      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: 'video/webm;codecs=vp9,opus'
      })
      
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        setRecordedVideo(blob)
        
        // Create video file for processing
        const videoFile = new File([blob], 'recorded-video.webm', { type: 'video/webm' })
        
        // Generate thumbnail and get duration
        try {
          const [thumbnailUrl, videoDuration] = await Promise.all([
            generateThumbnail(videoFile),
            getVideoDuration(videoFile)
          ])
          
          setThumbnail(thumbnailUrl)
          setDuration(videoDuration)
          setVideoURL(URL.createObjectURL(blob))
          
          // Compress video
          const compressedFile = await compressVideo(videoFile)
          onVideoChange({ file: compressedFile, thumbnail: thumbnailUrl, duration: videoDuration })
        } catch (err) {
          console.error('Error processing video:', err)
          setError('Error processing recorded video')
        }
        
        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
          streamRef.current = null
        }
        
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
        
        setCameraReady(false)
      }

      mediaRecorder.start(1000) // Record in 1-second intervals
      setIsRecording(true)
      setRecordingTime(0)
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration - 1) {
            stopRecording()
            return maxDuration
          }
          return prev + 1
        })
      }, 1000)

    } catch (err) {
      console.error('Error starting recording:', err)
      setError('Error starting recording')
    }
  }, [maxDuration, generateThumbnail, getVideoDuration, compressVideo, onVideoChange])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isRecording])

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 }, 
          facingMode: 'user'
        }, 
        audio: true 
      })
      
      streamRef.current = stream
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        
        // Apply video effects when metadata loads
        videoRef.current.onloadedmetadata = () => {
          setCameraReady(true)
          
          // Set up video container positioning
          const videoContainer = videoRef.current?.parentElement
          if (videoContainer) {
            videoContainer.style.position = 'relative'
          }
          
          // Apply initial effects
          setTimeout(() => {
            applyVideoEffects()
            applyCanvasBackground()
          }, 100)
          
          // Set up real-time background effects
          const applyEffectsInterval = setInterval(() => {
            if (videoRef.current) {
              applyVideoEffects()
              if (selectedBackground !== 'none') {
                applyCanvasBackground()
              }
            }
          }, 500) // Update every 500ms for better performance
          
          // Store interval reference for cleanup
          if (videoRef.current) {
            videoRef.current.dataset.effectsInterval = applyEffectsInterval.toString()
          }
        }
      }

    } catch (err) {
      console.error('Error starting camera:', err)
      setError('Unable to access camera and microphone. Please check permissions.')
    }
  }, [applyVideoEffects, startRecording])

  const resetRecording = useCallback(() => {
    setRecordedVideo(null)
    setVideoURL(null)
    setThumbnail(null)
    setDuration(0)
    setRecordingTime(0)
    setIsPaused(false)
    setError(null)
    setSelectedBackground('none')
    setShowBackgrounds(false)
    setCameraReady(false)
    onVideoChange(null)
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    if (videoRef.current) {
      // Clear effects interval  
      const intervalId = videoRef.current.dataset.effectsInterval
      if (intervalId) {
        clearInterval(parseInt(intervalId))
      }
      
      // Clear video and container styles
      const videoContainer = videoRef.current.parentElement
      if (videoContainer) {
        const overlay = videoContainer.querySelector('.background-overlay')
        if (overlay) {
          overlay.remove()
        }
        videoContainer.style.background = 'none'
      }
      
      videoRef.current.srcObject = null
      videoRef.current.style.filter = 'none' 
      videoRef.current.style.transform = 'scale(1)'
      videoRef.current.style.mixBlendMode = 'normal'
      videoRef.current.style.position = 'static'
      videoRef.current.style.zIndex = 'auto'
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [onVideoChange])

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file')
      return
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('Video file must be smaller than 50MB')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Get video duration first to validate
      const videoDuration = await getVideoDuration(file)
      
      if (videoDuration > maxDuration) {
        const minutes = Math.floor(maxDuration / 60)
        setError(`Video must be ${minutes} minute${minutes > 1 ? 's' : ''} or shorter`)
        setIsUploading(false)
        return
      }

      const [thumbnailUrl] = await Promise.all([
        generateThumbnail(file)
      ])

      const compressedFile = await compressVideo(file)
      
      setVideoURL(URL.createObjectURL(file))
      setThumbnail(thumbnailUrl)
      setDuration(videoDuration)
      setRecordedVideo(new Blob([await file.arrayBuffer()], { type: file.type }))
      
      onVideoChange({ file: compressedFile, thumbnail: thumbnailUrl, duration: videoDuration })

    } catch (err) {
      console.error('Error processing uploaded video:', err)
      setError('Error processing uploaded video')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [maxDuration, generateThumbnail, getVideoDuration, compressVideo, onVideoChange])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Custom Video Player Functions
  const togglePlayPause = useCallback(() => {
    if (!playbackVideoRef.current) return
    
    if (isPlaying) {
      playbackVideoRef.current.pause()
      setIsPlaying(false)
    } else {
      playbackVideoRef.current.play()
      setIsPlaying(true)
    }
  }, [isPlaying])

  const handleTimeUpdate = useCallback(() => {
    if (!playbackVideoRef.current) return
    setCurrentTime(playbackVideoRef.current.currentTime)
  }, [])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!playbackVideoRef.current) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const percentage = clickX / width
    const newTime = percentage * duration
    
    playbackVideoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }, [duration])

  const toggleMute = useCallback(() => {
    if (!playbackVideoRef.current) return
    
    if (isMuted) {
      playbackVideoRef.current.volume = volume
      setIsMuted(false)
    } else {
      playbackVideoRef.current.volume = 0
      setIsMuted(true)
    }
  }, [isMuted, volume])

  const handleVolumeChange = useCallback((newVolume: number) => {
    if (!playbackVideoRef.current) return
    
    setVolume(newVolume)
    playbackVideoRef.current.volume = newVolume
    setIsMuted(newVolume === 0)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!playerContainerRef.current) return
    
    if (!isFullscreen) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen()
      }
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
      setIsFullscreen(false)
    }
  }, [isFullscreen])

  const skipTime = useCallback((seconds: number) => {
    if (!playbackVideoRef.current) return
    
    const newTime = Math.max(0, Math.min(duration, playbackVideoRef.current.currentTime + seconds))
    playbackVideoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }, [duration])

  const changePlaybackRate = useCallback((rate: number) => {
    if (!playbackVideoRef.current) return
    
    playbackVideoRef.current.playbackRate = rate
    setPlaybackRate(rate)
  }, [])

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true)
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }, [isPlaying])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Professional background options (Google Meet style) 
  const professionalBackgrounds = [
    { 
      id: 'none', 
      name: 'No Background', 
      preview: '#f3f4f6', 
      type: 'none',
      description: 'Original video'
    },
    { 
      id: 'blur', 
      name: 'Blur', 
      preview: 'radial-gradient(circle at center, #e0e7ff 0%, #c7d2fe 100%)', 
      type: 'blur',
      description: 'Soft background blur'
    },
    { 
      id: 'office-corporate', 
      name: 'Corporate Office', 
      preview: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)', 
      type: 'virtual',
      description: 'Professional office environment'
    },
    { 
      id: 'office-modern', 
      name: 'Modern Office', 
      preview: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)', 
      type: 'virtual',
      description: 'Contemporary workspace'
    },
    { 
      id: 'library', 
      name: 'Executive Library', 
      preview: 'linear-gradient(135deg, #7c2d12 0%, #a3624a 50%, #d4a574 100%)', 
      type: 'virtual',
      description: 'Sophisticated bookshelf'
    },
    { 
      id: 'conference', 
      name: 'Conference Room', 
      preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', 
      type: 'virtual',
      description: 'Professional meeting space'
    },
    { 
      id: 'home-office', 
      name: 'Home Studio', 
      preview: 'linear-gradient(135deg, #065f46 0%, #10b981 50%, #6ee7b7 100%)', 
      type: 'virtual',
      description: 'Cozy home workspace'
    },
    { 
      id: 'minimalist', 
      name: 'Clean Studio', 
      preview: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)', 
      type: 'virtual',
      description: 'Minimal clean background'
    },
    { 
      id: 'warm-office', 
      name: 'Warm Office', 
      preview: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)', 
      type: 'virtual',
      description: 'Inviting workspace'
    },
    { 
      id: 'tech-space', 
      name: 'Tech Hub', 
      preview: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #a855f7 100%)', 
      type: 'virtual',
      description: 'Modern tech environment'
    }
  ]

  // Add pause/resume functionality
  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause()
      setIsPaused(true)
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isRecording, isPaused])

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume()
      setIsPaused(false)
      
      // Resume timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration - 1) {
            stopRecording()
            return maxDuration
          }
          return prev + 1
        })
      }, 1000)
    }
  }, [isRecording, isPaused, maxDuration, stopRecording])

  // Duration options (1-10 minutes)
  const durationOptions = [
    { value: 60, label: '1 minute' },
    { value: 120, label: '2 minutes' },
    { value: 180, label: '3 minutes' },
    { value: 240, label: '4 minutes' },
    { value: 300, label: '5 minutes' },
    { value: 360, label: '6 minutes' },
    { value: 420, label: '7 minutes' },
    { value: 480, label: '8 minutes' },
    { value: 540, label: '9 minutes' },
    { value: 600, label: '10 minutes' }
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Video className="mr-2 h-5 w-5" />
          Video Introduction
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Record or upload a video introduction to give recruiters a personal touch to your CV.
        </p>
        
        {/* Duration Selector */}
        {!videoURL && (
          <div className="mt-6">
            <Label className="text-sm font-medium mb-3 block">Recording Duration</Label>
            <div className="grid grid-cols-5 gap-2">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMaxDuration(option.value)}
                  disabled={isRecording || cameraReady}
                  className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                    maxDuration === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  } ${(isRecording || cameraReady) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {option.label.replace(' minute', 'min').replace(' minutes', 'min')}
                </button>
              ))}
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Video Display */}
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden" style={{ position: 'relative' }}>
          {videoURL ? (
            <div 
              ref={playerContainerRef}
              className="relative w-full h-full bg-black rounded-lg overflow-hidden group cursor-pointer"
              onMouseMove={showControlsTemporarily}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => {
                if (isPlaying) {
                  setShowControls(false)
                }
              }}
              onClick={togglePlayPause}
            >
              {/* Video Element */}
              <video
                ref={playbackVideoRef}
                src={videoURL}
                className="w-full h-full object-cover"
                poster={thumbnail || undefined}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  if (playbackVideoRef.current) {
                    setCurrentTime(0)
                    playbackVideoRef.current.volume = volume
                  }
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Custom Controls Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-opacity duration-300 pointer-events-none ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}>
                {/* Top Controls */}
                <div className="absolute top-0 left-0 right-0 p-4 pointer-events-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                        Video Introduction
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Playback Speed */}
                      <div className="relative group">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          className="flex items-center space-x-1 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm hover:bg-black/70 transition-colors"
                        >
                          <Settings className="h-3 w-3" />
                          <span>{playbackRate}x</span>
                        </button>
                        <div className="absolute top-full right-0 mt-1 bg-black/80 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                            <button
                              key={rate}
                              onClick={(e) => {
                                e.stopPropagation()
                                changePlaybackRate(rate)
                              }}
                              className={`block w-full text-left px-3 py-1 text-sm rounded hover:bg-white/20 transition-colors ${
                                playbackRate === rate ? 'text-blue-400' : 'text-white'
                              }`}
                            >
                              {rate}x
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Close Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          resetRecording()
                        }}
                        className="h-8 w-8 rounded-full bg-red-500/80 backdrop-blur-sm text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Center Play Button (when paused) */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePlayPause()
                      }}
                      className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 flex items-center justify-center transform hover:scale-110"
                    >
                      <Play className="h-8 w-8 ml-1" />
                    </button>
                  </div>
                )}

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
                  {/* Progress Bar */}
                  <div 
                    className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer relative group"
                    onClick={handleSeek}
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-150"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ left: `${(currentTime / duration) * 100}%`, transform: 'translateX(-50%) translateY(-50%)' }}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Skip Back */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          skipTime(-10)
                        }}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        <SkipBack className="h-5 w-5" />
                      </button>

                      {/* Play/Pause */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePlayPause()
                        }}
                        className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 flex items-center justify-center"
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6 ml-1" />
                        )}
                      </button>

                      {/* Skip Forward */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          skipTime(10)
                        }}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        <SkipForward className="h-5 w-5" />
                      </button>

                      {/* Time Display */}
                      <div className="text-white text-sm font-medium bg-black/30 px-2 py-1 rounded">
                        {formatTime(Math.floor(currentTime))} / {formatTime(Math.floor(duration))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Volume Control */}
                      <div className="flex items-center space-x-2 group">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleMute()
                          }}
                          className="text-white hover:text-blue-400 transition-colors"
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX className="h-5 w-5" />
                          ) : (
                            <Volume2 className="h-5 w-5" />
                          )}
                        </button>
                        <div className="w-0 group-hover:w-20 overflow-hidden transition-all duration-300">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                              e.stopPropagation()
                              handleVolumeChange(parseFloat(e.target.value))
                            }}
                            className="w-20 h-1 bg-white/20 rounded-lg appearance-none slider"
                            style={{
                              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`
                            }}
                          />
                        </div>
                      </div>

                      {/* Fullscreen */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFullscreen()
                        }}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        <Maximize className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loading Indicator */}
              {!playbackVideoRef.current?.readyState && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-lg overflow-hidden">
              {/* Camera Preview */}
              {cameraReady || isRecording ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover rounded-lg"
                    autoPlay
                    muted
                    playsInline
                    style={{
                      filter: selectedBackground === 'blur' ? 'blur(10px)' : 'none'
                    }}
                  />
                  
                  {/* Recording Overlay Effects */}
                  {isRecording && (
                    <>
                      {/* Recording Border Animation */}
                      <div className="absolute inset-0 border-4 border-red-500 rounded-lg animate-pulse">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 rounded-lg opacity-20 animate-pulse"></div>
                      </div>
                      
                      {/* Recording Indicator */}
                      <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-2 rounded-full shadow-lg backdrop-blur-sm">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold">REC</span>
                      </div>
                      
                      {/* Timer Display */}
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full font-mono text-lg font-bold">
                        {formatTime(recordingTime)}
                      </div>
                      
                      {/* Recording Progress Ring */}
                      <div className="absolute top-20 right-4">
                        <div className="relative w-16 h-16">
                          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="rgba(255,255,255,0.2)"
                              strokeWidth="2"
                            />
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="url(#gradient)"
                              strokeWidth="2"
                              strokeDasharray={`${(recordingTime / maxDuration) * 100}, 100`}
                              className="transition-all duration-300"
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ef4444" />
                                <stop offset="100%" stopColor="#f97316" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {Math.round((recordingTime / maxDuration) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Pause Indicator */}
                      {isPaused && (
                        <div className="absolute inset-0 bg-yellow-500/20 backdrop-blur-sm flex items-center justify-center">
                          <div className="bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
                            ⏸️ Recording Paused
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Camera Ready Overlay */}
                  {cameraReady && !isRecording && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent">
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-white font-semibold">Camera Ready</span>
                          </div>
                          <p className="text-white/80 text-sm">
                            You look great! Click the record button when you're ready to start.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* No Camera State */
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="absolute top-20 right-16 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-16 left-20 w-5 h-5 bg-pink-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute bottom-20 right-12 w-2 h-2 bg-blue-300/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                  
                  {/* Main Content */}
                  <div className="relative z-10 text-center">
                    <div className="relative mb-6">
                      <div className="h-24 w-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                        <Video className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-ping"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">Ready to Record?</h3>
                    <p className="text-white/70 text-sm max-w-xs mx-auto leading-relaxed">
                      Start your camera to begin creating your professional video introduction
                    </p>
                    
                    {/* Feature Highlights */}
                    <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-white font-medium">HD Quality</span>
                        </div>
                        <p className="text-white/60">1080p recording</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-white font-medium">Pro Effects</span>
                        </div>
                        <p className="text-white/60">Virtual backgrounds</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <canvas ref={canvasRef} className="hidden" />
              <canvas ref={backgroundCanvasRef} className="hidden" />
            </div>
          )}
        </div>

        {/* Camera Ready - Manual Recording Controls */}
        {cameraReady && !isRecording && !videoURL && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="h-16 w-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 animate-ping"></div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-green-800 mb-2">Camera is Live!</h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  Perfect! Your camera is ready and you look great. Click the record button below to start capturing your professional video introduction.
                </p>
              </div>
              
              {/* Start Recording Button */}
              <div className="relative inline-block">
                <button
                  onClick={startRecording}
                  className="group relative h-16 px-8 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white rounded-full font-semibold text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/25"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-red-600 rounded-full group-hover:animate-pulse"></div>
                      </div>
                    </div>
                    <span>Start Recording</span>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Camera className="h-5 w-5" />
                    </div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full opacity-20 blur group-hover:opacity-30 transition-opacity"></div>
                </button>
                
                {/* Floating particles animation */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
                </div>
                <div className="absolute -top-1 left-1/4 transform -translate-x-1/2">
                  <div className="w-1 h-1 bg-red-300 rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <div className="absolute -top-1 right-1/4 transform translate-x-1/2">
                  <div className="w-1 h-1 bg-red-300 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
              
              {/* Recording Tips */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">💡</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">Quick Recording Tips</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Look directly into the camera for eye contact</li>
                      <li>• Speak clearly and at a natural pace</li>
                      <li>• Keep your introduction between 30-60 seconds</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recording Controls */}
        {isRecording && (
          <div className="space-y-6">
            {/* Recording Status Card */}
            <div className="bg-gradient-to-r from-red-50 via-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-4 h-4 ${isPaused ? 'bg-yellow-500' : 'bg-red-500'} rounded-full ${!isPaused ? 'animate-pulse' : ''}`} />
                    {!isPaused && (
                      <div className="absolute -inset-1 bg-red-500 rounded-full opacity-30 animate-ping"></div>
                    )}
                  </div>
                  <div>
                    <span className="text-lg font-bold text-red-800">
                      {isPaused ? '⏸️ Recording Paused' : '🔴 Recording Live'}
                    </span>
                    <p className="text-sm text-red-600">
                      {isPaused ? 'Press resume to continue' : 'You\'re doing great!'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono font-bold text-red-800">
                    {formatTime(recordingTime)}
                  </div>
                  <div className="text-sm text-red-600">
                    of {formatTime(maxDuration)}
                  </div>
                </div>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="relative">
                <div className="w-full h-3 bg-red-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 via-red-600 to-orange-500 rounded-full transition-all duration-500 relative"
                    style={{ width: `${(recordingTime / maxDuration) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-red-600">
                  <span>0:00</span>
                  <span className="font-semibold">
                    {Math.round((recordingTime / maxDuration) * 100)}% Complete
                  </span>
                  <span>{formatTime(maxDuration)}</span>
                </div>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex justify-center items-center space-x-4">
              {/* Pause/Resume Button */}
              {!isPaused ? (
                <button
                  onClick={pauseRecording}
                  className="group relative h-14 w-14 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-full shadow-lg transform transition-all duration-200 hover:scale-110 hover:shadow-yellow-500/25"
                >
                  <div className="flex items-center justify-center">
                    <Pause className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-20 blur group-hover:opacity-30 transition-opacity"></div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Pause Recording
                  </div>
                </button>
              ) : (
                <button
                  onClick={resumeRecording}
                  className="group relative h-14 w-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-lg transform transition-all duration-200 hover:scale-110 hover:shadow-green-500/25"
                >
                  <div className="flex items-center justify-center">
                    <Play className="h-7 w-7 text-white ml-1" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full opacity-20 blur group-hover:opacity-30 transition-opacity"></div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Resume Recording
                  </div>
                </button>
              )}
              
              {/* Stop Button */}
              <button
                onClick={stopRecording}
                className="group relative h-16 w-16 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 rounded-full shadow-xl transform transition-all duration-200 hover:scale-110 hover:shadow-red-600/25"
              >
                <div className="flex items-center justify-center">
                  <Square className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full opacity-20 blur group-hover:opacity-30 transition-opacity"></div>
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Stop Recording
                </div>
              </button>
            </div>
            
            {/* Recording Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-800">Recording in Progress</span>
              </div>
              <p className="text-xs text-blue-700">
                {isPaused 
                  ? "Take your time to gather your thoughts, then resume when ready."
                  : "Keep going! Remember to smile and maintain eye contact with the camera."
                }
              </p>
            </div>
          </div>
        )}

        {/* Background Selection - Available for both camera ready and recording */}
        {(cameraReady || isRecording) && (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Button
                onClick={() => setShowBackgrounds(!showBackgrounds)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Palette className="h-4 w-4" />
                <span>Backgrounds</span>
              </Button>
            </div>

            {/* Enhanced Background Selection Grid */}
            {showBackgrounds && (
              <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-900">Choose Background</h4>
                  <button
                    onClick={() => setShowBackgrounds(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {professionalBackgrounds.map((bg) => (
                    <div key={bg.id} className="group">
                      <button
                        onClick={() => {
                          setSelectedBackground(bg.id)
                          // Apply effects with slight delay to ensure state is updated
                          setTimeout(() => {
                            applyVideoEffects()
                            applyCanvasBackground()
                          }, 50)
                        }}
                        className={`relative w-full aspect-video rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-md ${
                          selectedBackground === bg.id 
                            ? 'border-blue-500 ring-4 ring-blue-200' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        style={{
                          background: bg.preview
                        }}
                      >
                        {/* Overlay for better text visibility */}
                        <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        
                        {/* Background name */}
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                            <p className="text-xs font-medium text-gray-900 truncate">{bg.name}</p>
                            <p className="text-xs text-gray-600 truncate">{bg.description}</p>
                          </div>
                        </div>

                        {/* Selected indicator */}
                        {selectedBackground === bg.id && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                            <Check className="h-3 w-3" />
                          </div>
                        )}

                        {/* Special blur indicator */}
                        {bg.type === 'blur' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/80 rounded-full p-3">
                              <div className="w-6 h-6 bg-blue-500 rounded-full blur-sm" />
                            </div>
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">
                    💡 <strong>Tip:</strong> Choose a professional background that complements your appearance and doesn't distract from your message.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {!isRecording && !videoURL && !cameraReady && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recordingSupported && (
                <div className="group relative">
                  <button
                    onClick={startCamera}
                    disabled={isUploading}
                    className="w-full h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white rounded-xl font-semibold text-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Camera className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <div className="text-lg font-bold">Open Camera</div>
                        <div className="text-xs opacity-80">Record live with webcam</div>
                      </div>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl opacity-20 blur group-hover:opacity-30 transition-opacity"></div>
                  </button>
                  
                  {/* Floating icon */}
                  <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">✨</span>
                  </div>
                </div>
              )}
              
              <div className="group relative">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full h-16 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white rounded-xl font-semibold text-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-purple-600/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                      {isUploading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                      ) : (
                        <Upload className="h-6 w-6" />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold">
                        {isUploading ? 'Processing...' : 'Upload Video'}
                      </div>
                      <div className="text-xs opacity-80">
                        {isUploading ? 'Please wait...' : 'Choose from device'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl opacity-20 blur group-hover:opacity-30 transition-opacity"></div>
                </button>
                
                {/* Floating icon */}
                <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">📁</span>
                </div>
              </div>
            </div>
            
            {/* Feature comparison */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h4 className="text-sm font-bold text-gray-800 mb-4 text-center">Choose Your Recording Method</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Camera className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-800">Live Recording</span>
                  </div>
                  <ul className="space-y-1 text-gray-600 ml-6">
                    <li>• Real-time recording with webcam</li>
                    <li>• Professional backgrounds</li>
                    <li>• Pause/resume controls</li>
                    <li>• HD quality (1080p)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Upload className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold text-purple-800">Upload Video</span>
                  </div>
                  <ul className="space-y-1 text-gray-600 ml-6">
                    <li>• Use pre-recorded videos</li>
                    <li>• Supports all video formats</li>
                    <li>• Automatic compression</li>
                    <li>• Up to 50MB file size</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Video Info */}
        {videoURL && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Video Ready!</span>
            </div>
            <div className="text-sm text-green-700 space-y-1">
              <p>Duration: {formatTime(Math.floor(duration))} seconds</p>
              <p>Your video introduction is ready to be included in your CV.</p>
            </div>
            <div className="mt-3 flex space-x-2">
              <Button
                onClick={resetRecording}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="mr-1 h-4 w-4" />
                Record Again
              </Button>
              {recordedVideo && (
                <Button
                  onClick={() => {
                    const url = URL.createObjectURL(recordedVideo)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'video-introduction.webm'
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Tips for a great video introduction:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Keep it concise and professional (30-60 seconds)</li>
            <li>• Introduce yourself and your key strengths</li>
            <li>• Make sure you're well-lit and clearly visible</li>
            <li>• Speak clearly and maintain eye contact with the camera</li>
            <li>• Mention why you're excited about the role/industry</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}