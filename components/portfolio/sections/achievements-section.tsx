'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Trophy, Medal, Star, ExternalLink, Calendar, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PortfolioSectionProps } from '@/types/portfolio'
import { usePortfolioTheme } from '../ui/theme-provider'
import { formatDate } from '@/lib/portfolio-utils'

export function AchievementsSection({ data, className = '' }: PortfolioSectionProps) {
  const { customization } = usePortfolioTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const achievementIcons = {
    award: Award,
    recognition: Trophy,
    milestone: Medal,
    certification: Star
  }

  const achievementColors = {
    award: customization.primaryColor,
    recognition: customization.secondaryColor,
    milestone: customization.accentColor,
    certification: '#f59e0b'
  }

  // Group achievements by category
  const groupedAchievements = data.achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = []
    }
    acc[achievement.category].push(achievement)
    return acc
  }, {} as Record<string, typeof data.achievements>)

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
              Achievements & Recognition
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Awards, certifications, and milestones that highlight my professional journey
            </p>
            <div 
              className="w-20 h-1 mx-auto mt-6 rounded-full"
              style={{ backgroundColor: customization.primaryColor }}
            />
          </motion.div>

          {/* Achievements by Category */}
          <div className="space-y-16">
            {Object.entries(groupedAchievements).map(([category, achievements]) => {
              const IconComponent = achievementIcons[category as keyof typeof achievementIcons] || Award
              const categoryColor = achievementColors[category as keyof typeof achievementColors]

              return (
                <motion.div key={category} variants={itemVariants}>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${categoryColor}20` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: categoryColor }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category.charAt(0).toUpperCase() + category.slice(1)}s
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {achievements.length} achievement{achievements.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Achievements Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        variants={itemVariants}
                        className="group"
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                          {/* Achievement Image */}
                          {achievement.imageUrl && (
                            <div className="mb-4">
                              <img
                                src={achievement.imageUrl}
                                alt={achievement.title}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            </div>
                          )}

                          {/* Achievement Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                {achievement.title}
                              </h4>
                              {achievement.organization && (
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  <Building className="w-4 h-4" />
                                  {achievement.organization}
                                </div>
                              )}
                            </div>
                            
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${categoryColor}20` }}
                            >
                              <IconComponent className="w-5 h-5" style={{ color: categoryColor }} />
                            </div>
                          </div>

                          {/* Achievement Description */}
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                            {achievement.description}
                          </p>

                          {/* Achievement Date */}
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                            <Calendar className="w-3 h-3" />
                            {formatDate(achievement.date, 'long')}
                          </div>

                          {/* Achievement URL */}
                          {achievement.url && (
                            <div className="flex justify-end">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs p-2"
                                style={{ color: categoryColor }}
                                onClick={() => window.open(achievement.url, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            </div>
                          )}

                          {/* Category Badge */}
                          <div className="absolute top-4 right-4">
                            <span 
                              className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                              style={{ backgroundColor: categoryColor }}
                            >
                              {category}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Achievement Stats */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-gradient-to-r p-8 rounded-2xl"
                 style={{
                   background: `linear-gradient(135deg, ${customization.primaryColor}10, ${customization.secondaryColor}10)`
                 }}>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-8">
                Achievement Summary
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(groupedAchievements).map(([category, achievements]) => {
                  const categoryColor = achievementColors[category as keyof typeof achievementColors]
                  return (
                    <div key={category} className="text-center">
                      <div 
                        className="text-3xl font-bold mb-2"
                        style={{ color: categoryColor }}
                      >
                        {achievements.length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {category}s
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Timeline of Recent Achievements */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Recent Achievements
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div 
                className="absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5"
                style={{ backgroundColor: `${customization.primaryColor}40` }}
              />

              {/* Timeline Items */}
              <div className="space-y-8">
                {data.achievements
                  .slice()
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map((achievement, index) => {
                    const IconComponent = achievementIcons[achievement.category as keyof typeof achievementIcons] || Award
                    const categoryColor = achievementColors[achievement.category as keyof typeof achievementColors]

                    return (
                      <motion.div
                        key={achievement.id}
                        variants={itemVariants}
                        className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}
                      >
                        {/* Content */}
                        <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg max-w-md ml-auto">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                              {achievement.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                              {formatDate(achievement.date, 'long')}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {achievement.description}
                            </p>
                          </div>
                        </div>

                        {/* Timeline Node */}
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800 z-10"
                          style={{ backgroundColor: categoryColor }}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>

                        {/* Spacer */}
                        <div className="flex-1" />
                      </motion.div>
                    )
                  })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}