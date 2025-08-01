import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { cvId } = await request.json()
    
    if (!cvId) {
      return NextResponse.json({ error: 'CV ID is required' }, { status: 400 })
    }

    const supabase = createClient()
    
    // Get CV data
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
      .eq('id', cvId)
      .single()

    if (error) {
      return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    }

    // Check access permissions
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!cv.is_public && (!user || cv.user_id !== user.id)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // For now, we'll return the CV data and generate PDF on the client side
    // In production, you might want to use Puppeteer or a PDF service
    const pdfData = {
      personalInfo: cv.personal_info,
      education: cv.education,
      experience: cv.experience,
      skills: cv.skills,
      projects: cv.projects,
      certifications: cv.certifications,
      template: cv.templates,
      customization: cv.customization
    }

    // Update download count
    await supabase.rpc('increment_downloads', { cv_id: cvId })

    return NextResponse.json({ 
      success: true, 
      cvData: pdfData,
      fileName: `${cv.personal_info?.firstName || 'CV'}_${cv.personal_info?.lastName || ''}.pdf`.replace(/\s+/g, '_')
    })

  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}