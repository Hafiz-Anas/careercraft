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

export function MinimalTemplate({ data, theme, preview = false }: PortfolioTemplateProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
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
      className: "minimal-section"
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
        className="minimal-template font-inter"
      >
        {/* Custom CSS for minimal template */}
        <style jsx global>{`
          .minimal-template {
            --section-padding: 5rem 0;
            --container-max-width: 1100px;
            --text-primary: #1f2937;
            --text-secondary: #6b7280;
            --text-muted: #9ca3af;
            --background: #ffffff;
            --surface: #f9fafb;
            --border-color: #e5e7eb;
          }

          .minimal-template .minimal-section {
            padding: var(--section-padding);
            max-width: var(--container-max-width);
            margin: 0 auto;
          }

          /* Typography refinements for minimal design */
          .minimal-template h1,
          .minimal-template h2,
          .minimal-template h3,
          .minimal-template h4 {
            font-weight: 300;
            letter-spacing: -0.025em;
          }

          .minimal-template h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            line-height: 1.1;
          }

          .minimal-template h2 {
            font-size: clamp(2rem, 4vw, 3rem);
            line-height: 1.2;
          }

          /* Minimal spacing and clean lines */
          .minimal-template .container {
            padding-left: 2rem;
            padding-right: 2rem;
          }

          /* Subtle shadows and borders */
          .minimal-template .shadow-lg {
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -1px rgb(0 0 0 / 0.03);
          }

          .minimal-template .shadow-xl {
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -2px rgb(0 0 0 / 0.03);
          }

          /* Clean button styles */
          .minimal-template .btn-minimal {
            border: 1px solid var(--border-color);
            background: transparent;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            transition: all 0.2s ease;
            font-weight: 400;
          }

          .minimal-template .btn-minimal:hover {
            border-color: var(--primary-color);
            background: var(--primary-color);
            color: white;
          }

          /* Minimal timeline styling */
          .minimal-template .timeline-minimal .timeline-line {
            width: 1px;
            background: linear-gradient(to bottom, transparent, var(--border-color), transparent);
          }

          .minimal-template .timeline-minimal .timeline-node {
            width: 12px;
            height: 12px;
            border: 2px solid var(--background);
            box-shadow: 0 0 0 1px var(--border-color);
          }

          /* Clean card styling */
          .minimal-template .card-minimal {
            background: var(--background);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            padding: 1.5rem;
            transition: all 0.2s ease;
          }

          .minimal-template .card-minimal:hover {
            border-color: var(--primary-color);
            transform: translateY(-2px);
          }

          /* Minimal project grid */
          .minimal-template .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
          }

          /* Clean skills visualization */
          .minimal-template .skills-minimal .skill-bar {
            height: 4px;
            background: var(--surface);
            border-radius: 2px;
            overflow: hidden;
          }

          .minimal-template .skills-minimal .skill-progress {
            height: 100%;
            background: var(--primary-color);
            border-radius: 2px;
            transition: width 1s ease;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .minimal-template {
              --section-padding: 3rem 0;
            }
            
            .minimal-template .container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }

          /* Dark mode support */
          .dark .minimal-template {
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --text-muted: #9ca3af;
            --background: #111827;
            --surface: #1f2937;
            --border-color: #374151;
          }

          /* Smooth scrolling */
          .minimal-template {
            scroll-behavior: smooth;
          }

          /* Focus states for accessibility */
          .minimal-template *:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
          }

          /* Print styles */
          @media print {
            .minimal-template {
              --section-padding: 2rem 0;
            }
            
            .minimal-template .no-print {
              display: none !important;
            }
          }
        `}</style>

        {/* Template Content */}
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          {/* Navigation for non-preview mode */}
          {!preview && (
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
              <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-light">
                    {data.personalInfo.firstName} {data.personalInfo.lastName}
                  </div>
                  
                  <div className="hidden md:flex space-x-8">
                    {visibleSections.map(section => (
                      <a
                        key={section}
                        href={`#${section}`}
                        className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 capitalize"
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
          <main className={preview ? '' : 'pt-20'}>
            {visibleSections.map(section => (
              <section key={section} id={section}>
                {renderSection(section)}
              </section>
            ))}
          </main>

          {/* Footer */}
          {!preview && (
            <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-700">
              <div className="container mx-auto text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  © {new Date().getFullYear()} {data.personalInfo.firstName} {data.personalInfo.lastName}. 
                  Built with{' '}
                  <a 
                    href="https://careercraft.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    CareerCraft
                  </a>
                </p>
              </div>
            </footer>
          )}
        </div>
      </motion.div>
    </PortfolioThemeProvider>
  )
}