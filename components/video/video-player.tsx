'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw 
} from 'lucide-react'

interface VideoPlayerProps {
  src: string
  thumbnail?: string
  autoPlay?: boolean
  muted?: boolean
  controls?: boolean
  className?: string
  width?: number | string
  height?: number | string
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
}

export function VideoPlayer({
  src,
  thumbnail,
  autoPlay = false,
  muted = false,
  controls = true,
  className = '',
  width = '100%',
  height = 'auto',
  onPlay,
  onPause,
  onEnded
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showControls, setShowControls] = useState(!autoPlay)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      onPlay?.()
    }

    const handlePause = () => {
      setIsPlaying(false)
      onPause?.()
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      onEnded?.()
    }

    const handleError = () => {
      setError('Error loading video')
      setIsLoading(false)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
    }
  }, [onPlay, onPause, onEnded])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch(err => {
        console.error('Error playing video:', err)
        setError('Unable to play video')
      })
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const seekTime = (parseFloat(e.target.value) / 100) * duration
    video.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const handleRestart = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = 0
    setCurrentTime(0)
    if (!isPlaying) {
      video.play().catch(err => console.error('Error restarting video:', err))
    }
  }

  const handleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (video.requestFullscreen) {
      video.requestFullscreen()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  if (error) {
    return (
      <div 
        className={`relative bg-gray-100 rounded-lg flex items-center justify-center ${className}`}
        style={{ width, height: height === 'auto' ? '200px' : height }}
      >
        <div className="text-center text-gray-500">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Play className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-sm">Unable to load video</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`relative group bg-black rounded-lg overflow-hidden ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(controls && !isPlaying)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={thumbnail}
        autoPlay={autoPlay}
        muted={muted}
        className="w-full h-full object-cover"
        playsInline
        preload="metadata"
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      {/* Play button overlay (when paused) */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 text-black"
            size="lg"
          >
            <Play className="w-8 h-8 ml-1" />
          </Button>
        </div>
      )}

      {/* Custom controls */}
      {controls && showControls && !isLoading && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 transition-opacity duration-300">
          {/* Progress bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max="100"
              value={progressPercentage}
              onChange={handleSeek}
              className="w-full h-1 bg-white bg-opacity-30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                onClick={togglePlay}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white hover:bg-opacity-20 p-1 w-8 h-8"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>

              <Button
                onClick={handleRestart}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white hover:bg-opacity-20 p-1 w-8 h-8"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>

              <Button
                onClick={toggleMute}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white hover:bg-opacity-20 p-1 w-8 h-8"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>

              <span className="text-white text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <Button
              onClick={handleFullscreen}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white hover:bg-opacity-20 p-1 w-8 h-8"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Click to play/pause anywhere on video */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={togglePlay}
      />
    </div>
  )
}

// Compact video thumbnail component for CV displays
export function VideoThumbnail({
  src,
  thumbnail,
  duration,
  className = '',
  onClick
}: {
  src: string
  thumbnail: string
  duration: number
  className?: string
  onClick?: () => void
}) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div 
      className={`relative group cursor-pointer rounded-lg overflow-hidden ${className}`}
      onClick={onClick}
    >
      <img
        src={thumbnail}
        alt="Video thumbnail"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
      
      {/* Play overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Play className="w-6 h-6 text-black ml-0.5" />
          </div>
        </div>
      </div>

      {/* Duration badge */}
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
        {formatDuration(duration)}
      </div>
    </div>
  )
}