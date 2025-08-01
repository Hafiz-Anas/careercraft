import { createClient } from '@/lib/supabase/client'

export interface VideoUpload {
  file: File
  thumbnail: string
  duration: number
}

export interface UploadedVideo {
  videoUrl: string
  thumbnailUrl: string
  duration: number
  fileName: string
}

class VideoStorageService {
  private supabase = createClient()
  private readonly bucketName = 'cv-videos'
  private readonly thumbnailBucketName = 'cv-thumbnails'

  // Initialize buckets (call this once during app setup)
  async initializeBuckets() {
    try {
      // Create video bucket if it doesn't exist
      const { error: videoBucketError } = await this.supabase.storage
        .createBucket(this.bucketName, {
          public: true,
          allowedMimeTypes: ['video/mp4', 'video/webm', 'video/mov', 'video/avi'],
          fileSizeLimit: 50 * 1024 * 1024 // 50MB
        })

      if (videoBucketError && !videoBucketError.message.includes('already exists')) {
        console.error('Error creating video bucket:', videoBucketError)
      }

      // Create thumbnail bucket if it doesn't exist
      const { error: thumbnailBucketError } = await this.supabase.storage
        .createBucket(this.thumbnailBucketName, {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
          fileSizeLimit: 5 * 1024 * 1024 // 5MB
        })

      if (thumbnailBucketError && !thumbnailBucketError.message.includes('already exists')) {
        console.error('Error creating thumbnail bucket:', thumbnailBucketError)
      }

      return { success: true }
    } catch (error) {
      console.error('Error initializing buckets:', error)
      return { success: false, error }
    }
  }

  // Generate a unique filename
  private generateFileName(originalName: string, prefix: string = '') {
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 15)
    const extension = originalName.split('.').pop()
    return `${prefix}${timestamp}_${randomStr}.${extension}`
  }

  // Convert blob URL to File object
  private async blobUrlToFile(blobUrl: string, fileName: string, mimeType: string): Promise<File> {
    const response = await fetch(blobUrl)
    const blob = await response.blob()
    return new File([blob], fileName, { type: mimeType })
  }

  // Compress video if needed (basic implementation)
  private async compressVideo(file: File): Promise<File> {
    // For now, return the original file
    // In production, you might want to use ffmpeg.wasm for client-side compression
    // or send to a server endpoint for compression
    return file
  }

  // Upload video and thumbnail to Supabase storage
  async uploadVideo(videoData: VideoUpload, userId?: string): Promise<UploadedVideo | null> {
    try {
      const userPrefix = userId ? `${userId}/` : 'anonymous/'
      
      // Compress video
      const compressedVideo = await this.compressVideo(videoData.file)
      
      // Generate filenames
      const videoFileName = this.generateFileName(compressedVideo.name, userPrefix)
      const thumbnailFileName = this.generateFileName('thumbnail.jpg', userPrefix)

      // Upload video file
      const { data: videoUpload, error: videoError } = await this.supabase.storage
        .from(this.bucketName)
        .upload(videoFileName, compressedVideo, {
          cacheControl: '3600',
          upsert: false
        })

      if (videoError) {
        console.error('Error uploading video:', videoError)
        return null
      }

      // Convert thumbnail blob URL to File
      const thumbnailFile = await this.blobUrlToFile(
        videoData.thumbnail, 
        'thumbnail.jpg', 
        'image/jpeg'
      )

      // Upload thumbnail
      const { data: thumbnailUpload, error: thumbnailError } = await this.supabase.storage
        .from(this.thumbnailBucketName)
        .upload(thumbnailFileName, thumbnailFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (thumbnailError) {
        console.error('Error uploading thumbnail:', thumbnailError)
        // Continue anyway, video upload succeeded
      }

      // Get public URLs
      const { data: videoPublicUrl } = this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl(videoFileName)

      const { data: thumbnailPublicUrl } = this.supabase.storage
        .from(this.thumbnailBucketName)
        .getPublicUrl(thumbnailFileName)

      return {
        videoUrl: videoPublicUrl.publicUrl,
        thumbnailUrl: thumbnailPublicUrl.publicUrl,
        duration: videoData.duration,
        fileName: videoFileName
      }

    } catch (error) {
      console.error('Error in uploadVideo:', error)
      return null
    }
  }

  // Delete video and thumbnail from storage
  async deleteVideo(fileName: string, thumbnailFileName?: string): Promise<boolean> {
    try {
      // Delete video
      const { error: videoError } = await this.supabase.storage
        .from(this.bucketName)
        .remove([fileName])

      if (videoError) {
        console.error('Error deleting video:', videoError)
      }

      // Delete thumbnail if provided
      if (thumbnailFileName) {
        const { error: thumbnailError } = await this.supabase.storage
          .from(this.thumbnailBucketName)
          .remove([thumbnailFileName])

        if (thumbnailError) {
          console.error('Error deleting thumbnail:', thumbnailError)
        }
      }

      return !videoError
    } catch (error) {
      console.error('Error in deleteVideo:', error)
      return false
    }
  }

  // Get video URL (useful for CDN or signed URLs)
  async getVideoUrl(fileName: string): Promise<string | null> {
    try {
      const { data } = this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl(fileName)

      return data.publicUrl
    } catch (error) {
      console.error('Error getting video URL:', error)
      return null
    }
  }

  // List user's videos (if implementing a video gallery)
  async listUserVideos(userId: string): Promise<any[]> {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .list(`${userId}/`)

      if (error) {
        console.error('Error listing videos:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in listUserVideos:', error)
      return []
    }
  }
}

// Export singleton instance
export const videoStorageService = new VideoStorageService()

// Utility function to generate a thumbnail from video file
export const generateVideoThumbnail = (videoFile: File): Promise<string> => {
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
        }, 'image/jpeg', 0.8)
      }
    }
    
    video.onerror = () => reject(new Error('Failed to load video'))
    video.src = URL.createObjectURL(videoFile)
    video.load()
  })
}

// Utility function to get video duration
export const getVideoDuration = (videoFile: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.onloadedmetadata = () => {
      resolve(video.duration)
    }
    video.onerror = () => reject(new Error('Failed to get video duration'))
    video.src = URL.createObjectURL(videoFile)
    video.load()
  })
}