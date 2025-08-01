'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Calendar, Star, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PortfolioSectionProps } from '@/types/portfolio'
import { usePortfolioTheme } from '../ui/theme-provider'
import { formatDate } from '@/lib/portfolio-utils'

export function ProjectsSection({ data, className = '' }: PortfolioSectionProps) {
  const { customization } = usePortfolioTheme()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const categories = ['all', ...Array.from(new Set(data.projects.map(p => p.category)))]
  const filteredProjects = selectedCategory === 'all' 
    ? data.projects 
    : data.projects.filter(p => p.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  }

  const renderGridLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="wait">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={projectVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="group cursor-pointer"
            onClick={() => setSelectedProject(project.id)}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
              {/* Project Image */}
              {project.images && project.images.length > 0 && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <div 
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: customization.accentColor }}
                      >
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Quick Links Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.url && (
                      <Button
                        size="sm"
                        className="rounded-full w-10 h-10 p-0"
                        style={{ backgroundColor: customization.primaryColor }}
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.url, '_blank')
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full w-10 h-10 p-0 bg-white/90"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.githubUrl, '_blank')
                        }}
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${customization.primaryColor}20`,
                      color: customization.primaryColor
                    }}
                  >
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {formatDate(project.startDate)}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.url, '_blank')
                      }}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.githubUrl, '_blank')
                      }}
                    >
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  const renderMasonryLayout = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      <AnimatePresence mode="wait">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={projectVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="break-inside-avoid mb-8 group cursor-pointer"
            onClick={() => setSelectedProject(project.id)}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              {/* Similar content structure but adapted for masonry layout */}
              {project.images && project.images.length > 0 && (
                <div className="relative overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  return (
    <section className={`py-20 px-4 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A showcase of my recent work and creative solutions
            </p>
            <div 
              className="w-20 h-1 mx-auto mt-6 rounded-full"
              style={{ backgroundColor: customization.primaryColor }}
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category ? customization.primaryColor : 'transparent'
                  }}
                >
                  <Filter className="w-4 h-4 mr-2 inline" />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={itemVariants}>
            {customization.projectsLayout === 'masonry' 
              ? renderMasonryLayout() 
              : renderGridLayout()
            }
          </motion.div>

          {/* Load More Button */}
          {filteredProjects.length > 6 && (
            <motion.div variants={itemVariants} className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:shadow-lg transition-all duration-300"
                style={{
                  borderColor: customization.primaryColor,
                  color: customization.primaryColor
                }}
              >
                Load More Projects
              </Button>
            </motion.div>
          )}

          {/* Project Stats */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Projects', value: data.projects.length },
                { label: 'Featured', value: data.projects.filter(p => p.featured).length },
                { label: 'Categories', value: new Set(data.projects.map(p => p.category)).size },
                { label: 'Technologies', value: new Set(data.projects.flatMap(p => p.technologies)).size }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <div 
                    className="text-2xl font-bold mb-1"
                    style={{ color: customization.primaryColor }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal/Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal content would go here */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Project Details
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                {/* Detailed project information would be rendered here */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}