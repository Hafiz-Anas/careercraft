import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data: cvs, error } = await supabase
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
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ cvs })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      title = 'Untitled CV',
      personal_info,
      education = [],
      experience = [],
      skills = [],
      projects = [],
      certifications = [],
      template_id,
      customization = {},
      is_public = false
    } = body

    // Create the CV
    const { data: cv, error } = await supabase
      .from('cvs')
      .insert({
        user_id: user.id,
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
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Generate and update slug if making public
    if (is_public) {
      const slug = generateSlug(title, cv.id)
      await supabase
        .from('cvs')
        .update({ slug })
        .eq('id', cv.id)
      
      cv.slug = slug
    }

    // Create analytics entry
    await supabase
      .from('analytics')
      .insert({
        cv_id: cv.id,
        views: 0,
        downloads: 0,
        shares: 0
      })

    return NextResponse.json({ cv }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}