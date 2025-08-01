import { NextRequest, NextResponse } from 'next/server'
import { PortfolioData, PortfolioResponse } from '@/types/portfolio'
import { convertCVToPortfolio, getDefaultCustomization } from '@/lib/portfolio-utils'

// Mock database - In a real application, you would use a proper database
const mockPortfolios: Record<string, PortfolioData> = {}

// Mock function to simulate database operations
async function getPortfolioByUsername(username: string): Promise<PortfolioData | null> {
  // In a real application, you would query your database here
  // Example with Supabase:
  // const { data, error } = await supabase
  //   .from('portfolios')
  //   .select('*')
  //   .eq('username', username)
  //   .eq('isPublic', true)
  //   .single()
  
  // For now, return mock data or create sample data
  if (mockPortfolios[username]) {
    return mockPortfolios[username]
  }

  // Create sample portfolio data for demo purposes
  if (username === 'demo' || username === 'sample') {
    const samplePortfolio: PortfolioData = {
      id: 'demo-portfolio-id',
      userId: 'demo-user-id',
      username: username,
      slug: username,
      isPublic: true,
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        website: 'https://johndoe.dev',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        summary: 'Experienced full-stack developer with a passion for creating innovative web applications and solving complex problems.',
        tagline: 'Full-Stack Developer & Tech Enthusiast',
        bio: 'I am a passionate full-stack developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies. When I\'m not coding, you can find me contributing to open source projects or mentoring junior developers.',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        coverImage: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=1200&h=400&fit=crop',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/johndoe',
          github: 'https://github.com/johndoe',
          twitter: 'https://twitter.com/johndoe',
          website: 'https://johndoe.dev'
        }
      },
      videoIntro: {
        url: 'https://example.com/video-intro.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=800&h=450&fit=crop',
        duration: 120,
        description: 'A brief introduction about my background and expertise'
      },
      experience: [
        {
          id: '1',
          title: 'Senior Full-Stack Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          startDate: '2022-01-01',
          endDate: '',
          current: true,
          description: 'Lead development of scalable web applications using React, Node.js, and AWS. Mentored junior developers and collaborated with cross-functional teams to deliver high-quality products.'
        },
        {
          id: '2',
          title: 'Full-Stack Developer',
          company: 'StartupXYZ',
          location: 'Remote',
          startDate: '2020-06-01',
          endDate: '2021-12-31',
          current: false,
          description: 'Developed and maintained multiple client projects using modern web technologies. Implemented CI/CD pipelines and improved application performance by 40%.'
        },
        {
          id: '3',
          title: 'Frontend Developer',
          company: 'WebSolutions Ltd.',
          location: 'New York, NY',
          startDate: '2019-03-01',
          endDate: '2020-05-31',
          current: false,
          description: 'Built responsive web applications using React and Vue.js. Collaborated with UX/UI designers to create intuitive user interfaces.'
        }
      ],
      education: [
        {
          id: '1',
          degree: 'Bachelor of Science in Computer Science',
          institution: 'Stanford University',
          location: 'Stanford, CA',
          startDate: '2015-09-01',
          endDate: '2019-05-31',
          gpa: '3.8',
          description: 'Focused on software engineering, algorithms, and data structures. Graduated Magna Cum Laude.'
        }
      ],
      skills: [
        { id: '1', name: 'JavaScript', category: 'Programming Languages', level: 'Expert' },
        { id: '2', name: 'TypeScript', category: 'Programming Languages', level: 'Expert' },
        { id: '3', name: 'Python', category: 'Programming Languages', level: 'Advanced' },
        { id: '4', name: 'React', category: 'Frontend Frameworks', level: 'Expert' },
        { id: '5', name: 'Next.js', category: 'Frontend Frameworks', level: 'Advanced' },
        { id: '6', name: 'Vue.js', category: 'Frontend Frameworks', level: 'Intermediate' },
        { id: '7', name: 'Node.js', category: 'Backend Technologies', level: 'Expert' },
        { id: '8', name: 'Express.js', category: 'Backend Technologies', level: 'Advanced' },
        { id: '9', name: 'MongoDB', category: 'Databases', level: 'Advanced' },
        { id: '10', name: 'PostgreSQL', category: 'Databases', level: 'Advanced' },
        { id: '11', name: 'AWS', category: 'Cloud Platforms', level: 'Advanced' },
        { id: '12', name: 'Docker', category: 'DevOps', level: 'Intermediate' }
      ],
      projects: [
        {
          id: '1',
          name: 'E-commerce Platform',
          description: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment processing, inventory management, and admin dashboard.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
          url: 'https://ecommerce-demo.com',
          githubUrl: 'https://github.com/johndoe/ecommerce-platform',
          startDate: '2023-01-01',
          endDate: '2023-06-30',
          images: [
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
          ],
          featured: true,
          category: 'Web Development',
          testimonial: {
            text: 'John delivered an exceptional e-commerce solution that exceeded our expectations.',
            author: 'Sarah Johnson',
            role: 'Product Manager',
            company: 'RetailCorp'
          }
        },
        {
          id: '2',
          name: 'Task Management App',
          description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced reporting capabilities.',
          technologies: ['Vue.js', 'Express.js', 'Socket.io', 'PostgreSQL'],
          url: 'https://taskapp-demo.com',
          githubUrl: 'https://github.com/johndoe/task-management',
          startDate: '2022-08-01',
          endDate: '2022-12-31',
          images: [
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop'
          ],
          featured: true,
          category: 'Web Development'
        },
        {
          id: '3',
          name: 'Weather Dashboard',
          description: 'A responsive weather dashboard with location-based forecasts, interactive maps, and weather alerts.',
          technologies: ['React', 'Chart.js', 'OpenWeather API', 'Tailwind CSS'],
          url: 'https://weather-dashboard-demo.com',
          githubUrl: 'https://github.com/johndoe/weather-dashboard',
          startDate: '2022-03-01',
          endDate: '2022-05-31',
          images: [
            'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop'
          ],
          featured: false,
          category: 'Web Development'
        }
      ],
      achievements: [
        {
          id: '1',
          title: 'AWS Certified Solutions Architect',
          description: 'Achieved AWS Solutions Architect certification, demonstrating expertise in designing distributed systems on AWS.',
          date: '2023-03-15',
          category: 'certification',
          organization: 'Amazon Web Services',
          url: 'https://aws.amazon.com/certification/',
          imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop'
        },
        {
          id: '2',
          title: 'Best Developer Award 2022',
          description: 'Recognized as the best developer of the year for outstanding contributions to product development and team collaboration.',
          date: '2022-12-31',
          category: 'award',
          organization: 'TechCorp Inc.'
        },
        {
          id: '3',
          title: '10,000+ GitHub Stars',
          description: 'Achieved over 10,000 stars across open-source projects, contributing to the developer community.',
          date: '2023-06-01',
          category: 'milestone'
        }
      ],
      customization: {
        template: 'minimal',
        primaryColor: '#3b82f6',
        secondaryColor: '#8b5cf6',
        accentColor: '#10b981',
        fontFamily: 'inter',
        fontSize: 'medium',
        sectionOrder: ['hero', 'about', 'career', 'skills', 'projects', 'achievements', 'contact'],
        showSections: {
          hero: true,
          about: true,
          career: true,
          skills: true,
          projects: true,
          achievements: true,
          contact: true
        },
        heroStyle: 'centered',
        projectsLayout: 'grid',
        timelineStyle: 'vertical'
      },
      seo: {
        title: 'John Doe - Full-Stack Developer & Tech Enthusiast',
        description: 'Experienced full-stack developer specializing in React, Node.js, and cloud technologies. View my portfolio of innovative web applications.',
        keywords: ['full-stack developer', 'react', 'node.js', 'javascript', 'web development', 'aws'],
        ogImage: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=1200&h=630&fit=crop'
      },
      analytics: {
        views: 1250,
        uniqueVisitors: 987,
        lastViewed: new Date().toISOString()
      },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: new Date().toISOString()
    }

    // Cache the sample portfolio
    mockPortfolios[username] = samplePortfolio
    return samplePortfolio
  }

  return null
}

async function updatePortfolioAnalytics(portfolioId: string) {
  // In a real application, you would update analytics in your database
  // Example with Supabase:
  // await supabase.rpc('increment_portfolio_views', { portfolio_id: portfolioId })
  
  console.log(`Portfolio view tracked for: ${portfolioId}`)
}

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params

    // Validate username
    if (!username || username.length < 2) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid username' 
        } satisfies PortfolioResponse,
        { status: 400 }
      )
    }

    // Get portfolio data
    const portfolio = await getPortfolioByUsername(username)

    if (!portfolio) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Portfolio not found' 
        } satisfies PortfolioResponse,
        { status: 404 }
      )
    }

    // Check if portfolio is public
    if (!portfolio.isPublic) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Portfolio is not public' 
        } satisfies PortfolioResponse,
        { status: 403 }
      )
    }

    // Update analytics (async, don't wait)
    updatePortfolioAnalytics(portfolio.id).catch(console.error)

    // Return portfolio data
    return NextResponse.json(
      { 
        success: true, 
        data: portfolio 
      } satisfies PortfolioResponse,
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        }
      }
    )

  } catch (error) {
    console.error('Portfolio API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch portfolio' 
      } satisfies PortfolioResponse,
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// PUT method for updating portfolio (protected endpoint)
export async function PUT(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    // In a real application, you would:
    // 1. Authenticate the user
    // 2. Verify they own the portfolio
    // 3. Validate the request body
    // 4. Update the portfolio in the database

    return NextResponse.json(
      { 
        success: false, 
        error: 'Portfolio updates not yet implemented' 
      } satisfies PortfolioResponse,
      { status: 501 }
    )

  } catch (error) {
    console.error('Portfolio update error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update portfolio' 
      } satisfies PortfolioResponse,
      { status: 500 }
    )
  }
}