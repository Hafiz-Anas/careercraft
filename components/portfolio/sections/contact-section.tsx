'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, Linkedin, Github, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PortfolioSectionProps, ContactFormData } from '@/types/portfolio'
import { usePortfolioTheme } from '../ui/theme-provider'

export function ContactSection({ data, className = '' }: PortfolioSectionProps) {
  const { customization } = usePortfolioTheme()
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    portfolioId: data.id
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          portfolioId: data.id
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: data.personalInfo.email,
      href: `mailto:${data.personalInfo.email}`,
      color: customization.primaryColor
    },
    {
      icon: Phone,
      label: 'Phone',
      value: data.personalInfo.phone,
      href: `tel:${data.personalInfo.phone}`,
      color: customization.secondaryColor
    },
    {
      icon: MapPin,
      label: 'Location',
      value: data.personalInfo.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(data.personalInfo.location || '')}`,
      color: customization.accentColor
    }
  ].filter(method => method.value)

  const socialLinks = [
    {
      platform: 'LinkedIn',
      icon: Linkedin,
      url: data.personalInfo.socialLinks?.linkedin,
      color: '#0077b5'
    },
    {
      platform: 'GitHub',
      icon: Github,
      url: data.personalInfo.socialLinks?.github,
      color: '#333'
    },
    {
      platform: 'Website',
      icon: ExternalLink,
      url: data.personalInfo.socialLinks?.website,
      color: customization.primaryColor
    }
  ].filter(link => link.url)

  return (
    <section className={`py-20 px-4 bg-gray-50 dark:bg-gray-900 ${className}`}>
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
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can work together.
            </p>
            <div 
              className="w-20 h-1 mx-auto mt-6 rounded-full"
              style={{ backgroundColor: customization.primaryColor }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Let's Connect
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    Whether you have a project in mind, want to collaborate, or just want to say hello, 
                    I'd love to hear from you. Feel free to reach out through any of the methods below.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      target={method.label === 'Location' ? '_blank' : undefined}
                      rel={method.label === 'Location' ? 'noopener noreferrer' : undefined}
                      variants={itemVariants}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${method.color}20` }}
                      >
                        <method.icon className="w-6 h-6" style={{ color: method.color }} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {method.label}
                        </div>
                        <div className="text-gray-900 dark:text-white font-semibold">
                          {method.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Follow Me
                  </h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="w-5 h-5" style={{ color: social.color }} />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Availability Status */}
                <motion.div
                  variants={itemVariants}
                  className="p-6 rounded-2xl border-2 border-dashed"
                  style={{ borderColor: `${customization.accentColor}40` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: customization.accentColor }}
                    />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Currently Available
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    I'm open to freelance projects and full-time opportunities. 
                    Let's discuss how I can help bring your ideas to life.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-2 border-2 focus:border-opacity-50 transition-colors"
                        style={{ 
                          borderColor: `${customization.primaryColor}40`,
                          '--tw-ring-color': customization.primaryColor
                        } as React.CSSProperties}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-2 border-2 focus:border-opacity-50 transition-colors"
                        style={{ 
                          borderColor: `${customization.primaryColor}40`,
                          '--tw-ring-color': customization.primaryColor
                        } as React.CSSProperties}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300 font-medium">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mt-2 border-2 focus:border-opacity-50 transition-colors"
                      style={{ 
                        borderColor: `${customization.primaryColor}40`,
                        '--tw-ring-color': customization.primaryColor
                      } as React.CSSProperties}
                      placeholder="Project Collaboration"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 font-medium">
                      Message *
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-2 w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      style={{ 
                        borderColor: `${customization.primaryColor}40`,
                        '--tw-ring-color': customization.primaryColor
                      } as React.CSSProperties}
                      placeholder="Tell me about your project, ideas, or just say hello..."
                    />
                  </div>

                  {/* Submit Status */}
                  {submitStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-3 p-4 rounded-lg ${
                        submitStatus === 'success' 
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                          : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {submitStatus === 'success' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                      <span className="text-sm font-medium">
                        {submitStatus === 'success' 
                          ? 'Message sent successfully! I\'ll get back to you soon.' 
                          : 'Failed to send message. Please try again or contact me directly.'
                        }
                      </span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </form>

                {/* Contact Notice */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    I typically respond within 24 hours. For urgent matters, 
                    feel free to reach out directly via email or phone.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}