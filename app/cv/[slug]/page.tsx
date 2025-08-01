import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PublicCVDisplay } from '@/components/cv/public-cv-display'
import type { CVData } from '@/types'

interface PublicCVPageProps {
  params: {
    slug: string
  }
}

async function getCV(slug: string): Promise<CVData | null> {
  const supabase = createClient()

  try {
    const { data: cv, error } = await supabase
      .from('cvs')
      .select(`
        *,
        templates (
          id,
          name,
          category,
          preview_image
        )
      `)
      .eq('slug', slug)
      .eq('is_public', true)
      .single()

    if (error || !cv) {
      return null
    }

    // Update view count
    await supabase.rpc('increment_views', { cv_id: cv.id })

    // Transform the data to match our CVData interface
    return {
      id: cv.id,
      userId: cv.user_id,
      personalInfo: cv.personal_info,
      education: cv.education,
      experience: cv.experience,
      skills: cv.skills,
      projects: cv.projects,
      certifications: cv.certifications,
      template: {
        id: cv.templates.id,
        name: cv.templates.name,
        category: cv.templates.category as 'modern' | 'classic' | 'creative',
        description: '',
        previewImage: cv.templates.preview_image
      },
      customization: cv.customization,
      createdAt: cv.created_at,
      updatedAt: cv.updated_at,
      isPublic: cv.is_public,
      slug: cv.slug
    }
  } catch (error) {
    console.error('Error fetching CV:', error)
    return null
  }
}

export async function generateMetadata({ params }: PublicCVPageProps) {
  const cv = await getCV(params.slug)
  
  if (!cv) {
    return {
      title: 'CV Not Found',
      description: 'The CV you are looking for does not exist or is no longer public.'
    }
  }

  const fullName = `${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`.trim()
  
  return {
    title: `${fullName} - CV`,
    description: cv.personalInfo.summary || `Professional CV of ${fullName}`,
    openGraph: {
      title: `${fullName} - CV`,
      description: cv.personalInfo.summary || `Professional CV of ${fullName}`,
      type: 'profile',
      images: [
        {
          url: cv.customization.photoUrl || '/default-avatar.png',
          width: 400,
          height: 400,
          alt: `${fullName} profile picture`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fullName} - CV`,
      description: cv.personalInfo.summary || `Professional CV of ${fullName}`,
    }
  }
}

export default async function PublicCVPage({ params }: PublicCVPageProps) {
  const cv = await getCV(params.slug)

  if (!cv) {
    notFound()
  }

  return <PublicCVDisplay cv={cv} />
}