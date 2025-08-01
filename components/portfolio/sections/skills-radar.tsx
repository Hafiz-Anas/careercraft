'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer, 
  Legend 
} from 'recharts'
import { PortfolioSectionProps } from '@/types/portfolio'
import { usePortfolioTheme } from '../ui/theme-provider'
import { convertSkillsToRadarData } from '@/lib/portfolio-utils'

export function SkillsSection({ data, className = '' }: PortfolioSectionProps) {
  const { customization } = usePortfolioTheme()
  const radarData = convertSkillsToRadarData(data.skills)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const skillLevelColors = {
    'Beginner': '#94a3b8',
    'Intermediate': '#60a5fa',
    'Advanced': '#3b82f6',
    'Expert': '#1d4ed8'
  }

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
              Skills & Expertise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here's a visual representation of my technical skills and professional competencies
            </p>
            <div 
              className="w-20 h-1 mx-auto mt-6 rounded-full"
              style={{ backgroundColor: customization.primaryColor }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Radar Chart */}
            <motion.div variants={itemVariants}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
                  Skills Overview
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid 
                        stroke="#e5e7eb" 
                        className="dark:stroke-gray-600"
                      />
                      <PolarAngleAxis 
                        dataKey="category" 
                        tick={{ 
                          fontSize: 12, 
                          fill: '#6b7280',
                          fontWeight: 500
                        }}
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={false}
                        axisLine={false}
                      />
                      <Radar
                        name="Skill Level"
                        dataKey="level"
                        stroke={customization.primaryColor}
                        fill={customization.primaryColor}
                        fillOpacity={0.2}
                        strokeWidth={3}
                        dot={{ 
                          fill: customization.primaryColor, 
                          strokeWidth: 2, 
                          r: 6 
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Skills List */}
            <motion.div variants={itemVariants}>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Technical Skills
                </h3>
                
                {/* Skills by Category */}
                {Object.entries(
                  data.skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) {
                      acc[skill.category] = []
                    }
                    acc[skill.category].push(skill)
                    return acc
                  }, {} as Record<string, any[]>)
                ).map(([category, skills], categoryIndex) => (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  >
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: customization.primaryColor }}
                      />
                      {category}
                    </h4>
                    <div className="space-y-3">
                      {skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 
                          }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4].map((level) => (
                                <div
                                  key={level}
                                  className={`w-2 h-2 rounded-full ${
                                    level <= ['Beginner', 'Intermediate', 'Advanced', 'Expert'].indexOf(skill.level) + 1
                                      ? 'bg-current'
                                      : 'bg-gray-300 dark:bg-gray-600'
                                  }`}
                                  style={{
                                    color: level <= ['Beginner', 'Intermediate', 'Advanced', 'Expert'].indexOf(skill.level) + 1
                                      ? skillLevelColors[skill.level as keyof typeof skillLevelColors]
                                      : undefined
                                  }}
                                />
                              ))}
                            </div>
                            <span 
                              className="text-xs font-medium px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: `${skillLevelColors[skill.level as keyof typeof skillLevelColors]}20`,
                                color: skillLevelColors[skill.level as keyof typeof skillLevelColors]
                              }}
                            >
                              {skill.level}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Skill Legend */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r p-6 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${customization.primaryColor}10, ${customization.secondaryColor}10)`
                  }}
                >
                  <h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">
                    Skill Levels
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(skillLevelColors).map(([level, color]) => (
                      <div key={level} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {level}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Additional Skills Stats */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Skills', value: data.skills.length },
                { label: 'Expert Level', value: data.skills.filter(s => s.level === 'Expert').length },
                { label: 'Categories', value: new Set(data.skills.map(s => s.category)).size },
                { label: 'Years Learning', value: '10+' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}