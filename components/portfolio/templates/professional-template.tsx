'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PortfolioTemplateProps } from '@/types/portfolio'
import { PortfolioThemeProvider } from '../ui/theme-provider'
import { HeroSection } from '../sections/hero-section'
import { AboutSection } from '../sections/about-section'
import { CareerTimelineSection } from '../sections/career-timeline'
import { SkillsSection } from '../sections/skills-radar'
import { ProjectsSection } from '../sections/projects-section'
import { AchievementsSection } from '../sections/achievements-section'
import { ContactSection } from '../sections/contact-section'

export function ProfessionalTemplate({ data, theme, preview = false }: PortfolioTemplateProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  // Filter sections based on customization settings
  const visibleSections = data.customization.sectionOrder.filter(
    section => data.customization.showSections[section]
  )

  const renderSection = (sectionType: string) => {
    const sectionProps = {
      data,
      theme,
      className: "professional-section"
    }

    switch (sectionType) {
      case 'hero':
        return <HeroSection key="hero" {...sectionProps} />
      case 'about':
        return <AboutSection key="about" {...sectionProps} />
      case 'career':
        return <CareerTimelineSection key="career" {...sectionProps} />
      case 'skills':
        return <SkillsSection key="skills" {...sectionProps} />
      case 'projects':
        return <ProjectsSection key="projects" {...sectionProps} />
      case 'achievements':
        return <AchievementsSection key="achievements" {...sectionProps} />
      case 'contact':
        return !preview && <ContactSection key="contact" {...sectionProps} />
      default:
        return null
    }
  }

  return (
    <PortfolioThemeProvider customization={data.customization}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="professional-template font-playfair"
      >
        {/* Custom CSS for professional template */}
        <style jsx global>{`
          .professional-template {
            --section-padding: 5rem 0;
            --container-max-width: 1100px;
            --text-primary: #1f2937;
            --text-secondary: #4b5563;
            --text-muted: #6b7280;
            --background: #ffffff;
            --surface: #f3f4f6;
            --border-color: #e5e7eb;
            --professional-blue: #1e40af;
            --professional-navy: #1e3a8a;
            --professional-gray: #374151;
          }

          .professional-template .professional-section {
            padding: var(--section-padding);
            max-width: var(--container-max-width);
            margin: 0 auto;
          }

          /* Professional typography */
          .professional-template h1,
          .professional-template h2,
          .professional-template h3 {
            font-family: 'Playfair Display', serif;
            font-weight: 600;
            letter-spacing: -0.01em;
          }

          .professional-template h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            line-height: 1.1;
            color: var(--professional-navy);
          }

          .professional-template h2 {
            font-size: clamp(2rem, 4vw, 3rem);
            line-height: 1.2;
            color: var(--professional-blue);
            position: relative;
            margin-bottom: 2rem;
          }

          .professional-template h2::after {
            content: '';
            position: absolute;
            bottom: -0.5rem;
            left: 0;
            width: 80px;
            height: 3px;
            background: linear-gradient(90deg, var(--professional-blue), var(--professional-navy));
          }

          .professional-template p,
          .professional-template li {
            font-family: 'Inter', sans-serif;
            line-height: 1.7;
            color: var(--text-secondary);
          }

          /* Professional buttons */
          .professional-template .btn-professional {
            background: linear-gradient(135deg, var(--professional-blue), var(--professional-navy));
            color: white;
            padding: 0.875rem 2rem;
            border-radius: 0.375rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: 0.875rem;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .professional-template .btn-professional::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
          }

          .professional-template .btn-professional:hover::before {
            left: 100%;
          }

          .professional-template .btn-professional:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(30, 64, 175, 0.3);
          }

          .professional-template .btn-professional-outline {
            background: transparent;
            color: var(--professional-blue);
            border: 2px solid var(--professional-blue);
            padding: 0.75rem 2rem;
            border-radius: 0.375rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .professional-template .btn-professional-outline:hover {
            background: var(--professional-blue);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(30, 64, 175, 0.2);
          }

          /* Professional cards */
          .professional-template .card-professional {
            background: var(--background);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            position: relative;
          }

          .professional-template .card-professional::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--professional-blue), var(--professional-navy));
          }

          .professional-template .card-professional:hover {
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
            transform: translateY(-4px);
            border-color: var(--professional-blue);
          }

          /* Professional timeline */
          .professional-template .timeline-professional {
            position: relative;
            padding: 2rem 0;
          }

          .professional-template .timeline-professional::before {
            content: '';
            position: absolute;
            left: 2rem;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, var(--professional-blue), var(--professional-navy));
          }

          .professional-template .timeline-item-professional {
            position: relative;
            margin-left: 4rem;
            margin-bottom: 3rem;
            padding-left: 2rem;
          }

          .professional-template .timeline-item-professional::before {
            content: '';
            position: absolute;
            left: -2.5rem;
            top: 1rem;
            width: 1rem;
            height: 1rem;
            background: var(--professional-blue);
            border: 3px solid var(--background);
            border-radius: 50%;
            box-shadow: 0 0 0 3px var(--professional-blue);
          }

          /* Professional project grid */
          .professional-template .projects-professional {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            margin: 2rem 0;
          }

          .professional-template .project-card-professional {
            background: var(--background);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }

          .professional-template .project-card-professional:hover {
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
            transform: translateY(-4px);
            border-color: var(--professional-blue);
          }

          .professional-template .project-image-professional {
            height: 200px;
            background: var(--surface);
            position: relative;
            overflow: hidden;
          }

          .professional-template .project-content-professional {
            padding: 1.5rem;
          }

          /* Professional skills */
          .professional-template .skills-professional {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
          }

          .professional-template .skill-category-professional {
            background: var(--background);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }

          .professional-template .skill-item-professional {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0.5rem 0;
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--border-color);
          }

          .professional-template .skill-item-professional:last-child {
            border-bottom: none;
          }

          .professional-template .skill-bar-professional {
            width: 100px;
            height: 6px;
            background: var(--surface);
            border-radius: 3px;
            overflow: hidden;
          }

          .professional-template .skill-progress-professional {
            height: 100%;
            background: linear-gradient(90deg, var(--professional-blue), var(--professional-navy));
            border-radius: 3px;
            transition: width 1.5s ease;
          }

          /* Professional sections alternating backgrounds */
          .professional-template .section-alt {
            background: var(--surface);
            margin: 4rem 0;
            padding: 4rem 2rem;
          }

          /* Professional navigation */
          .professional-template .nav-professional {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border-color);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          }

          .professional-template .nav-link-professional {
            color: var(--text-secondary);
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: 0.875rem;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            transition: all 0.2s ease;
            position: relative;
          }

          .professional-template .nav-link-professional:hover {
            color: var(--professional-blue);
            background: rgba(30, 64, 175, 0.05);
          }

          .professional-template .nav-link-professional.active {
            color: var(--professional-blue);
            background: rgba(30, 64, 175, 0.1);
          }

          /* Professional contact form */
          .professional-template .form-professional input,
          .professional-template .form-professional textarea {
            border: 2px solid var(--border-color);
            border-radius: 0.375rem;
            padding: 0.875rem 1rem;
            font-size: 1rem;
            transition: all 0.2s ease;
            background: var(--background);
          }

          .professional-template .form-professional input:focus,
          .professional-template .form-professional textarea:focus {
            border-color: var(--professional-blue);
            box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
            outline: none;
          }

          /* Responsive design */
          @media (max-width: 768px) {
            .professional-template {
              --section-padding: 3rem 0;
            }
            
            .professional-template .timeline-professional::before {
              left: 1rem;
            }
            
            .professional-template .timeline-item-professional {
              margin-left: 2rem;
            }
            
            .professional-template .timeline-item-professional::before {
              left: -1.5rem;
            }
            
            .professional-template .section-alt {
              margin: 2rem 0;
              padding: 3rem 1rem;
            }
          }

          /* Dark mode support */
          .dark .professional-template {
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --text-muted: #9ca3af;
            --background: #111827;
            --surface: #1f2937;
            --border-color: #374151;
          }

          .dark .professional-template h1 {
            color: #f9fafb;
          }

          .dark .professional-template h2 {
            color: #60a5fa;
          }

          .dark .professional-template .card-professional {
            background: var(--surface);
            border-color: var(--border-color);
          }

          .dark .professional-template .nav-professional {
            background: rgba(17, 24, 39, 0.95);
            border-bottom-color: var(--border-color);
          }

          /* Print styles */
          @media print {
            .professional-template {
              --section-padding: 2rem 0;
            }
            
            .professional-template .no-print {
              display: none !important;
            }
            
            .professional-template .card-professional {
              box-shadow: none;
              border: 1px solid #ccc;
            }
          }

          /* Accessibility */
          .professional-template *:focus {
            outline: 2px solid var(--professional-blue);
            outline-offset: 2px;
          }

          .professional-template .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--professional-blue);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
          }

          .professional-template .skip-link:focus {
            top: 6px;
          }
        `}</style>

        {/* Template Content */}
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/* Professional Navigation */}
          {!preview && (
            <nav className="nav-professional fixed top-0 left-0 right-0 z-50">
              <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center text-white font-bold">
                      {data.personalInfo.firstName.charAt(0)}{data.personalInfo.lastName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {data.personalInfo.firstName} {data.personalInfo.lastName}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {data.personalInfo.tagline}
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex space-x-1">
                    {visibleSections.map(section => (
                      <a
                        key={section}
                        href={`#${section}`}
                        className="nav-link-professional capitalize"
                      >
                        {section}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          )}

          {/* Main Content */}
          <main id="main-content" className={preview ? '' : 'pt-24'}>
            {visibleSections.map((section, index) => (
              <section 
                key={section} 
                id={section}
                className={index % 2 === 1 ? 'section-alt' : ''}
              >
                {renderSection(section)}
              </section>
            ))}
          </main>

          {/* Professional Footer */}
          {!preview && (
            <footer className="py-12 px-6 bg-gray-900 text-white">
              <div className="container mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-2 text-gray-300">
                      <p>{data.personalInfo.email}</p>
                      {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
                      {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Professional Links</h3>
                    <div className="space-y-2">
                      {Object.entries(data.personalInfo.socialLinks || {}).map(([platform, url]) => (
                        url && (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-gray-300 hover:text-white transition-colors capitalize"
                          >
                            {platform}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">About This Portfolio</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      This professional portfolio showcases my expertise, experience, and achievements. 
                      Built with modern web technologies for optimal performance and accessibility.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                  <p>
                    © {new Date().getFullYear()} {data.personalInfo.firstName} {data.personalInfo.lastName}. 
                    All rights reserved. • Built with{' '}
                    <a 
                      href="https://careercraft.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:underline"
                    >
                      CareerCraft
                    </a>
                  </p>
                </div>
              </div>
            </footer>
          )}
        </div>
      </motion.div>
    </PortfolioThemeProvider>
  )
}