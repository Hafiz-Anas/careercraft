'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Calendar, MapPin, ExternalLink } from 'lucide-react'
import { PortfolioSectionProps } from '@/types/portfolio'
import { usePortfolioTheme } from '../ui/theme-provider'
import { createTimeline, formatDate } from '@/lib/portfolio-utils'

export function CareerTimelineSection({ data, className = '' }: PortfolioSectionProps) {
  const { customization } = usePortfolioTheme()
  const timeline = createTimeline(data.experience, data.education)

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

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  const renderVerticalTimeline = () => (
    <div className="relative">
      {/* Timeline Line */}
      <div 
        className="absolute left-8 top-0 bottom-0 w-0.5"
        style={{ backgroundColor: `${customization.primaryColor}40` }}
      />

      {/* Timeline Items */}
      <div className="space-y-12">
        {timeline.map((item, index) => (
          <motion.div
            key={item.id}
            variants={timelineItemVariants}
            className="relative pl-20"
          >
            {/* Timeline Node */}
            <div className="absolute left-0 top-0">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800"
                style={{ backgroundColor: customization.primaryColor }}
              >
                {item.type === 'experience' ? (
                  <Briefcase className="w-6 h-6 text-white" />
                ) : (
                  <GraduationCap className="w-6 h-6 text-white" />
                )}
              </div>
            </div>

            {/* Content Card */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <span className="font-semibold">{item.organization}</span>
                    {item.location && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {item.location}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="w-4 h-4" style={{ color: customization.accentColor }} />
                  <span className="text-gray-600 dark:text-gray-300">
                    {formatDate(item.startDate)} - {item.endDate ? formatDate(item.endDate) : 'Present'}
                  </span>
                  {item.current && (
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: customization.accentColor }}
                    >
                      Current
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {item.description}
                </p>
              )}

              {/* Skills or Achievements */}
              {item.skills && item.skills.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Key Skills & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Type Badge */}
              <div className="flex items-center justify-between">
                <span 
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: item.type === 'experience' ? customization.primaryColor : customization.secondaryColor }}
                >
                  {item.type === 'experience' ? 'Work Experience' : 'Education'}
                </span>

                {/* Duration indicator */}
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {calculateDuration(item.startDate, item.endDate)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderHorizontalTimeline = () => (
    <div className="overflow-x-auto pb-8">
      <div className="relative min-w-full" style={{ minWidth: `${timeline.length * 300}px` }}>
        {/* Timeline Line */}
        <div 
          className="absolute top-20 left-0 right-0 h-0.5"
          style={{ backgroundColor: `${customization.primaryColor}40` }}
        />

        {/* Timeline Items */}
        <div className="flex justify-between items-start">
          {timeline.map((item, index) => (
            <motion.div
              key={item.id}
              variants={timelineItemVariants}
              className="flex flex-col items-center w-80 px-4"
            >
              {/* Timeline Node */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800 mb-6"
                style={{ backgroundColor: customization.primaryColor }}
              >
                {item.type === 'experience' ? (
                  <Briefcase className="w-5 h-5 text-white" />
                ) : (
                  <GraduationCap className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Content Card */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg w-full"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  {item.organization}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <Calendar className="w-3 h-3" />
                  {formatDate(item.startDate)} - {item.endDate ? formatDate(item.endDate) : 'Present'}
                </div>
                {item.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
                    {item.description}
                  </p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const calculateDuration = (startDate: string, endDate?: string): string => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)

    if (years > 0) {
      return months > 0 ? `${years}y ${months}m` : `${years}y`
    }
    return `${months}m`
  }

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Career Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My professional and educational milestones that shaped my career
            </p>
            <div 
              className="w-20 h-1 mx-auto mt-6 rounded-full"
              style={{ backgroundColor: customization.primaryColor }}
            />
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants}>
            {customization.timelineStyle === 'horizontal' 
              ? renderHorizontalTimeline() 
              : renderVerticalTimeline()
            }
          </motion.div>

          {/* Summary Stats */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{ color: customization.primaryColor }}
                >
                  {data.experience.filter(exp => exp.current).length || 0}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Current Positions</div>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{ color: customization.secondaryColor }}
                >
                  {data.experience.length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Work Experiences</div>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{ color: customization.accentColor }}
                >
                  {data.education.length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Degrees & Certifications</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Add CSS for line-clamp utility (if not available in your Tailwind config)
const styles = `
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`