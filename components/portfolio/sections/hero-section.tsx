'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Play, Download, ExternalLink, MapPin, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PortfolioSectionProps } from '@/types/portfolio'
import { usePortfolioTheme } from '../ui/theme-provider'

export function HeroSection({ data, className = '' }: PortfolioSectionProps) {
  const { customization } = usePortfolioTheme()
  const { personalInfo, videoIntro } = data

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const renderCenteredHero = () => (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Profile Image */}
        {personalInfo.profileImage && (
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative inline-block">
              <img
                src={personalInfo.profileImage}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto shadow-xl"
              />
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-tr opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Name and Tagline */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`
                  }}>
              {personalInfo.firstName}
            </span>{' '}
            <span className="text-gray-900 dark:text-white">
              {personalInfo.lastName}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
            {personalInfo.tagline}
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {personalInfo.bio}
          </p>
        </motion.div>

        {/* Quick Info */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {personalInfo.location}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </div>
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {personalInfo.phone}
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          {videoIntro && (
            <Button
              size="lg"
              className="group relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`
              }}
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Video Intro
            </Button>
          )}
          
          <Button
            size="lg"
            variant="outline"
            className="group border-2 hover:shadow-lg transition-all duration-300"
            style={{
              borderColor: customization.primaryColor,
              color: customization.primaryColor
            }}
          >
            <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Download Resume
          </Button>

          {personalInfo.website && (
            <Button
              size="lg"
              variant="ghost"
              className="group"
              style={{ color: customization.accentColor }}
            >
              <ExternalLink className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Visit Website
            </Button>
          )}
        </motion.div>
      </motion.div>
    </div>
  )

  const renderSplitHero = () => (
    <div className="min-h-screen flex items-center px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-gray-900 dark:text-white">Hi, I'm</span><br />
                <span className="bg-gradient-to-r bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`
                      }}>
                  {personalInfo.firstName} {personalInfo.lastName}
                </span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 font-medium">
                {personalInfo.tagline}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {personalInfo.bio}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="group"
                  style={{
                    background: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`
                  }}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2"
                  style={{
                    borderColor: customization.primaryColor,
                    color: customization.primaryColor
                  }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image/Video */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {personalInfo.profileImage && (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={personalInfo.profileImage}
                    alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                    className="w-full h-auto object-cover"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr opacity-10"
                    style={{
                      background: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`
                    }}
                  />
                </div>
              )}
              
              {/* Video Intro Overlay */}
              {videoIntro && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    size="lg"
                    className="rounded-full w-20 h-20 shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`
                    }}
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )

  const renderMinimalHero = () => (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-gray-900 dark:text-white">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            {personalInfo.tagline}
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="w-24 h-px mx-auto mb-8"
               style={{ backgroundColor: customization.primaryColor }} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
            {personalInfo.bio}
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            variant="ghost"
            className="text-sm font-medium hover:underline"
            style={{ color: customization.primaryColor }}
          >
            Scroll to explore
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )

  const heroComponents = {
    centered: renderCenteredHero,
    split: renderSplitHero,
    minimal: renderMinimalHero
  }

  return (
    <section className={`relative ${className}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" />
      
      {/* Content */}
      <div className="relative z-10">
        {heroComponents[customization.heroStyle]()}
      </div>
    </section>
  )
}