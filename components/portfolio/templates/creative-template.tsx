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

export function CreativeTemplate({ data, theme, preview = false }: PortfolioTemplateProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  // Filter sections based on customization settings
  const visibleSections = data.customization.sectionOrder.filter(
    section => data.customization.showSections[section]
  )

  const renderSection = (sectionType: string, index: number) => {
    const sectionProps = {
      data,
      theme,
      className: `creative-section ${index % 2 === 0 ? 'creative-section-even' : 'creative-section-odd'}`
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

  // Dynamic background elements
  const BackgroundElements = () => (
    <div className="creative-bg-elements">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 transform rotate-45 opacity-30"
        animate={{
          y: [0, 30, 0],
          rotate: [45, 225, 405],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-1/4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-25"
        animate={{
          x: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-500/5 via-transparent to-transparent pointer-events-none" />
    </div>
  )

  return (
    <PortfolioThemeProvider customization={data.customization}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="creative-template font-poppins"
      >
        {/* Custom CSS for creative template */}
        <style jsx global>{`
          .creative-template {
            --section-padding: 8rem 0;
            --container-max-width: 1400px;
            --text-primary: #1e293b;
            --text-secondary: #475569;
            --text-muted: #94a3b8;
            --background: #fefefe;
            --surface: #f8fafc;
            --accent-gradient: linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b);
          }

          .creative-template .creative-section {
            padding: var(--section-padding);
            max-width: var(--container-max-width);
            margin: 0 auto;
            position: relative;
            overflow: hidden;
          }

          /* Alternating section layouts */
          .creative-template .creative-section-odd {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            transform: skewY(-1deg);
            margin: 4rem 0;
            padding: 6rem 2rem;
          }

          .creative-template .creative-section-odd > * {
            transform: skewY(1deg);
          }

          .creative-template .creative-section-even {
            background: var(--background);
          }

          /* Creative typography */
          .creative-template h1 {
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 800;
            line-height: 0.9;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.05em;
          }

          .creative-template h2 {
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 700;
            line-height: 1.1;
            position: relative;
          }

          .creative-template h2::after {
            content: '';
            position: absolute;
            bottom: -0.5rem;
            left: 0;
            width: 60px;
            height: 4px;
            background: var(--accent-gradient);
            border-radius: 2px;
          }

          /* Creative buttons */
          .creative-template .btn-creative {
            background: var(--accent-gradient);
            border: none;
            padding: 1rem 2rem;
            border-radius: 2rem;
            color: white;
            font-weight: 600;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
          }

          .creative-template .btn-creative::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s ease;
          }

          .creative-template .btn-creative:hover::before {
            left: 100%;
          }

          .creative-template .btn-creative:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(139, 92, 246, 0.4);
          }

          /* Creative cards */
          .creative-template .card-creative {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }

          .creative-template .card-creative::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--accent-gradient);
          }

          .creative-template .card-creative:hover {
            transform: translateY(-10px) rotate(1deg);
            box-shadow: 0 30px 60px rgba(0,0,0,0.15);
          }

          /* Creative timeline */
          .creative-template .timeline-creative {
            position: relative;
          }

          .creative-template .timeline-creative::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 4px;
            background: var(--accent-gradient);
            transform: translateX(-50%);
            border-radius: 2px;
          }

          .creative-template .timeline-item {
            position: relative;
            margin: 3rem 0;
          }

          .creative-template .timeline-item:nth-child(odd) .timeline-content {
            margin-right: 55%;
            text-align: right;
          }

          .creative-template .timeline-item:nth-child(even) .timeline-content {
            margin-left: 55%;
            text-align: left;
          }

          .creative-template .timeline-node {
            position: absolute;
            left: 50%;
            top: 2rem;
            transform: translateX(-50%);
            width: 60px;
            height: 60px;
            background: var(--accent-gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 0 8px var(--background), 0 10px 20px rgba(0,0,0,0.1);
            z-index: 10;
          }

          /* Creative project grid */
          .creative-template .projects-creative {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 3rem;
            padding: 2rem 0;
          }

          .creative-template .project-card {
            position: relative;
            border-radius: 1.5rem;
            overflow: hidden;
            background: white;
            box-shadow: 0 25px 50px rgba(0,0,0,0.1);
            transition: all 0.4s ease;
          }

          .creative-template .project-card:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 35px 70px rgba(0,0,0,0.15);
          }

          .creative-template .project-image {
            position: relative;
            overflow: hidden;
            height: 250px;
          }

          .creative-template .project-image::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--accent-gradient);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .creative-template .project-card:hover .project-image::after {
            opacity: 0.7;
          }

          /* Creative skills visualization */
          .creative-template .skills-creative .skill-item {
            background: white;
            border-radius: 1rem;
            padding: 1.5rem;
            margin: 1rem;
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .creative-template .skills-creative .skill-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--accent-gradient);
          }

          .creative-template .skills-creative .skill-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
          }

          /* Responsive design */
          @media (max-width: 768px) {
            .creative-template {
              --section-padding: 4rem 0;
            }
            
            .creative-template .creative-section-odd {
              transform: none;
              margin: 2rem 0;
              padding: 4rem 1rem;
            }
            
            .creative-template .creative-section-odd > * {
              transform: none;
            }
            
            .creative-template .timeline-creative::before {
              left: 2rem;
            }
            
            .creative-template .timeline-node {
              left: 2rem;
            }
            
            .creative-template .timeline-item:nth-child(odd) .timeline-content,
            .creative-template .timeline-item:nth-child(even) .timeline-content {
              margin-left: 5rem;
              margin-right: 0;
              text-align: left;
            }
          }

          /* Dark mode adaptations */
          .dark .creative-template {
            --text-primary: #f8fafc;
            --text-secondary: #cbd5e1;
            --text-muted: #94a3b8;
            --background: #0f172a;
            --surface: #1e293b;
          }

          .dark .creative-template .creative-section-odd {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          }

          .dark .creative-template .card-creative {
            background: #1e293b;
            border: 1px solid #334155;
          }

          /* Animation keyframes */
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
            50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
          }

          .creative-template .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .creative-template .animate-pulse-glow {
            animation: pulse-glow 3s ease-in-out infinite;
          }

          /* Print styles */
          @media print {
            .creative-template .creative-section-odd {
              transform: none;
              background: white;
            }
            
            .creative-template .creative-bg-elements {
              display: none;
            }
          }
        `}</style>

        {/* Background Elements */}
        <BackgroundElements />

        {/* Template Content */}
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative">
          {/* Creative Navigation */}
          {!preview && (
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
              <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                  <motion.div 
                    className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    {data.personalInfo.firstName} {data.personalInfo.lastName}
                  </motion.div>
                  
                  <div className="hidden md:flex space-x-6">
                    {visibleSections.map((section, index) => (
                      <motion.a
                        key={section}
                        href={`#${section}`}
                        className="relative text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 capitalize group"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {section}
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          )}

          {/* Main Content */}
          <main className={preview ? '' : 'pt-20'}>
            {visibleSections.map((section, index) => (
              <motion.section 
                key={section} 
                id={section}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {renderSection(section, index)}
              </motion.section>
            ))}
          </main>

          {/* Creative Footer */}
          {!preview && (
            <footer className="py-16 px-6 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
              <div className="container mx-auto text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-lg mb-4">
                    © {new Date().getFullYear()} {data.personalInfo.firstName} {data.personalInfo.lastName}
                  </p>
                  <p className="text-purple-200">
                    Crafted with creativity & passion • Built with{' '}
                    <a 
                      href="https://careercraft.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-purple-200 underline decoration-purple-400 underline-offset-4 transition-colors"
                    >
                      CareerCraft
                    </a>
                  </p>
                </motion.div>
              </div>
            </footer>
          )}
        </div>
      </motion.div>
    </PortfolioThemeProvider>
  )
}