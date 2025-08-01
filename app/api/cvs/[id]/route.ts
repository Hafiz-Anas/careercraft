import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: 'CV not found' }, { status: 404 })
    }

    // Check if user has access (owner or public CV)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!cv.is_public && (!user || cv.user_id !== user.id)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    return NextResponse.json({ cv })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      title,
      personal_info,
      education,
      experience,
      skills,
      projects,
      certifications,
      template_id,
      customization,
      is_public
    } = body

    // First, verify ownership
    const { data: existingCV } = await supabase
      .from('cvs')
      .select('user_id, title, slug, is_public')
      .eq('id', params.id)
      .single()

    if (!existingCV || existingCV.user_id !== user.id) {
      return NextResponse.json({ error: 'CV not found or access denied' }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (personal_info !== undefined) updateData.personal_info = personal_info
    if (education !== undefined) updateData.education = education
    if (experience !== undefined) updateData.experience = experience
    if (skills !== undefined) updateData.skills = skills
    if (projects !== undefined) updateData.projects = projects
    if (certifications !== undefined) updateData.certifications = certifications
    if (template_id !== undefined) updateData.template_id = template_id
    if (customization !== undefined) updateData.customization = customization
    if (is_public !== undefined) updateData.is_public = is_public

    // Handle slug generation for public CVs
    if (is_public && !existingCV.is_public) {
      // Making CV public - generate slug
      const slug = generateSlug(title || existingCV.title, params.id)
      updateData.slug = slug
    } else if (!is_public && existingCV.is_public) {
      // Making CV private - remove slug
      updateData.slug = null
    } else if (is_public && title && title !== existingCV.title) {
      // CV is public and title changed - update slug
      const slug = generateSlug(title, params.id)
      updateData.slug = slug
    }

    const { data: cv, error } = await supabase
      .from('cvs')
      .update(updateData)
      .eq('id', params.id)
      .select(`
        *,
        templates (
          id,
          name,
          category,
          preview_image
        )
      `)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ cv })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { error } = await supabase
      .from('cvs')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'CV deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}