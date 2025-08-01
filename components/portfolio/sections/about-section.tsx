'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Calendar, MapPin, Users, Briefcase, GraduationCap } from 'lucide-react'
import { PortfolioSectionProps } from '@/types/portfolio'
import { usePortfolioTheme } from '../ui/theme-provider'
import { calculateExperience, getPortfolioStats } from '@/lib/portfolio-utils'

export function AboutSection({ data, className = '' }: PortfolioSectionProps) {
  const { customization } = usePortfolioTheme()
  const stats = getPortfolioStats(data)

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

  const statItems = [
    {
      icon: Briefcase,
      value: `${stats.yearsExperience}+`,
      label: 'Years Experience',
      color: customization.primaryColor
    },
    {
      icon: Award,
      value: stats.totalProjects,
      label: 'Projects Completed',
      color: customization.secondaryColor
    },
    {
      icon: Users,
      value: stats.totalAchievements,
      label: 'Achievements',
      color: customization.accentColor
    },
    {
      icon: GraduationCap,
      value: data.education.length,
      label: 'Degrees',
      color: customization.primaryColor
    }
  ]

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
              About Me
            </h2>
            <div 
              className="w-20 h-1 mx-auto rounded-full"
              style={{ backgroundColor: customization.primaryColor }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Bio and Details */}
            <motion.div variants={itemVariants}>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {data.personalInfo.bio}
                </p>
                
                {data.personalInfo.location && (
                  <div className="flex items-center gap-3 mb-4 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-5 h-5" style={{ color: customization.primaryColor }} />
                    <span>Based in {data.personalInfo.location}</span>
                  </div>
                )}

                {/* Key Highlights */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    What I Do
                  </h3>
                  <div className="space-y-3">
                    {data.skills.slice(0, 6).map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        variants={itemVariants}
                        className="flex items-center gap-3"
                      >
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: customization.accentColor }}
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {skill.name} - {skill.level}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                {data.personalInfo.socialLinks && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      Connect With Me
                    </h3>
                    <div className="flex gap-4">
                      {Object.entries(data.personalInfo.socialLinks).map(([platform, url]) => (
                        url && (
                          <motion.a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:shadow-md transition-all duration-300 text-sm font-medium text-gray-700 dark:text-gray-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                          </motion.a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Column - Stats and Visual Elements */}
            <motion.div variants={itemVariants}>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {statItems.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                         style={{ backgroundColor: `${stat.color}20` }}>
                      <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Profile Completeness */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r p-6 rounded-2xl shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${customization.primaryColor}10, ${customization.secondaryColor}10)`
                }}
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Profile Completeness
                </h3>
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="h-3 rounded-full"
                      style={{ backgroundColor: customization.primaryColor }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stats.profileCompleteness}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {stats.profileCompleteness}% Complete
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      Keep building your profile!
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Fun Fact or Quote */}
              <motion.div
                variants={itemVariants}
                className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-1 h-16 rounded-full flex-shrink-0"
                    style={{ backgroundColor: customization.accentColor }}
                  />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                      "I believe in creating meaningful solutions that make a difference. 
                      Every project is an opportunity to learn, grow, and contribute to something greater."
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      - {data.personalInfo.firstName}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}