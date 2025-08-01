import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortfolioData } from '@/types/portfolio'
import { MinimalTemplate } from '@/components/portfolio/templates/minimal-template'
import { CreativeTemplate } from '@/components/portfolio/templates/creative-template'
import { ProfessionalTemplate } from '@/components/portfolio/templates/professional-template'
import { portfolioThemes } from '@/lib/portfolio-utils'

interface PageProps {
  params: {
    username: string
  }
}

// This would typically fetch from your database
async function getPortfolioData(username: string): Promise<PortfolioData | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/portfolio/${username}`, {
      cache: 'no-store', // Ensure fresh data
    })
    
    if (!response.ok) {
      return null
    }
    
    const result = await response.json()
    return result.success ? result.data : null
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return null
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const portfolio = await getPortfolioData(params.username)
  
  if (!portfolio) {
    return {
      title: 'Portfolio Not Found',
      description: 'The requested portfolio could not be found.',
    }
  }

  const fullName = `${portfolio.personalInfo.firstName} ${portfolio.personalInfo.lastName}`
  
  return {
    title: portfolio.seo.title || `${fullName} - Portfolio`,
    description: portfolio.seo.description || portfolio.personalInfo.bio,
    keywords: portfolio.seo.keywords || [],
    authors: [{ name: fullName }],
    creator: fullName,
    publisher: 'CareerCraft',
    
    // Open Graph
    openGraph: {
      title: portfolio.seo.title || `${fullName} - Portfolio`,
      description: portfolio.seo.description || portfolio.personalInfo.bio,
      url: `/u/${params.username}`,
      siteName: 'CareerCraft Portfolios',
      type: 'profile',
      images: portfolio.seo.ogImage ? [
        {
          url: portfolio.seo.ogImage,
          width: 1200,
          height: 630,
          alt: `${fullName} - Portfolio`,
        }
      ] : [],
      locale: 'en_US',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: portfolio.seo.title || `${fullName} - Portfolio`,
      description: portfolio.seo.description || portfolio.personalInfo.bio,
      images: portfolio.seo.ogImage ? [portfolio.seo.ogImage] : [],
      creator: portfolio.personalInfo.socialLinks?.twitter,
    },
    
    // Additional SEO
    robots: portfolio.isPublic ? 'index, follow' : 'noindex, nofollow',
    canonical: `/u/${params.username}`,
    
    // Schema.org structured data
    other: {
      'profile:first_name': portfolio.personalInfo.firstName,
      'profile:last_name': portfolio.personalInfo.lastName,
      'profile:username': portfolio.username,
    },
  }
}

// Generate static params for known users (optional, for SSG)
export async function generateStaticParams() {
  // In a real application, you would fetch this from your database
  // For now, return empty array to use SSR for all routes
  return []
}

export default async function UserPortfolioPage({ params }: PageProps) {
  const portfolio = await getPortfolioData(params.username)
  
  if (!portfolio) {
    notFound()
  }

  if (!portfolio.isPublic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio Not Public
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This portfolio is currently private and not available for public viewing.
          </p>
        </div>
      </div>
    )
  }

  // Get the appropriate theme
  const theme = portfolioThemes[portfolio.customization.template]

  // Track portfolio view (you might want to implement analytics)
  // await trackPortfolioView(portfolio.id)

  // Render the appropriate template
  const renderTemplate = () => {
    const templateProps = {
      data: portfolio,
      theme,
      preview: false
    }

    switch (portfolio.customization.template) {
      case 'minimal':
        return <MinimalTemplate {...templateProps} />
      case 'creative':
        return <CreativeTemplate {...templateProps} />
      case 'professional':
        return <ProfessionalTemplate {...templateProps} />
      default:
        return <MinimalTemplate {...templateProps} />
    }
  }

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: `${portfolio.personalInfo.firstName} ${portfolio.personalInfo.lastName}`,
            jobTitle: portfolio.personalInfo.tagline,
            description: portfolio.personalInfo.bio,
            url: `/u/${params.username}`,
            image: portfolio.personalInfo.profileImage,
            email: portfolio.personalInfo.email,
            telephone: portfolio.personalInfo.phone,
            address: portfolio.personalInfo.location ? {
              '@type': 'PostalAddress',
              addressLocality: portfolio.personalInfo.location,
            } : undefined,
            sameAs: Object.values(portfolio.personalInfo.socialLinks || {}).filter(Boolean),
            knowsAbout: portfolio.skills.map(skill => skill.name),
            hasOccupation: portfolio.experience.map(exp => ({
              '@type': 'Occupation',
              name: exp.title,
              occupationLocation: exp.location,
              skills: exp.description,
            })),
            alumniOf: portfolio.education.map(edu => ({
              '@type': 'EducationalOrganization',
              name: edu.institution,
              address: edu.location,
            })),
            award: portfolio.achievements.map(achievement => achievement.title),
          }),
        }}
      />

      {/* Portfolio Template */}
      <div className="portfolio-page">
        {renderTemplate()}
      </div>

      {/* Analytics Script (optional) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Track portfolio view
            if (typeof gtag !== 'undefined') {
              gtag('event', 'portfolio_view', {
                'portfolio_id': '${portfolio.id}',
                'username': '${portfolio.username}',
                'template': '${portfolio.customization.template}'
              });
            }
          `,
        }}
      />
    </>
  )
}

// Loading component
export function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading portfolio...</p>
      </div>
    </div>
  )
}

// Not found component
export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Portfolio Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The portfolio you're looking for doesn't exist or has been removed.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}