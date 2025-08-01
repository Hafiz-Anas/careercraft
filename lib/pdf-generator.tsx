import React from 'react'
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'

// Define template-specific styles
const getTemplateStyles = (templateId: string) => {
  const baseStyles = {
    page: {
      flexDirection: 'column' as const,
      backgroundColor: '#FFFFFF',
      padding: 40,
      fontFamily: 'Helvetica',
    },
    section: {
      marginBottom: 20,
    },
    text: {
      fontSize: 10,
      color: '#374151',
      marginBottom: 3,
      lineHeight: 1.4,
    },
    experienceItem: {
      marginBottom: 12,
    },
  }

  switch (templateId) {
    case 'modern':
      return StyleSheet.create({
        ...baseStyles,
        header: {
          marginBottom: 20,
          borderBottom: '2 solid #2563eb',
          paddingBottom: 10,
        },
        name: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: 5,
        },
        contact: {
          fontSize: 11,
          color: '#6b7280',
          marginBottom: 2,
        },
        sectionTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#2563eb',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: 1,
        },
        jobTitle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#1f2937',
        },
        company: {
          fontSize: 11,
          color: '#2563eb',
          marginBottom: 2,
        },
        duration: {
          fontSize: 10,
          color: '#6b7280',
          marginBottom: 4,
        },
        skill: {
          fontSize: 10,
          backgroundColor: '#eff6ff',
          color: '#2563eb',
          padding: '4 8',
          borderRadius: 4,
          marginBottom: 4,
          marginRight: 8,
        },
        skillsContainer: {
          flexDirection: 'row' as const,
          flexWrap: 'wrap' as const,
        },
      })

    case 'executive':
      return StyleSheet.create({
        ...baseStyles,
        header: {
          marginBottom: 25,
          borderBottom: '3 solid #1f2937',
          paddingBottom: 15,
        },
        name: {
          fontSize: 28,
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: 8,
        },
        contact: {
          fontSize: 11,
          color: '#6b7280',
          marginBottom: 2,
        },
        sectionTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: 10,
          textTransform: 'uppercase',
          letterSpacing: 1.5,
        },
        jobTitle: {
          fontSize: 13,
          fontWeight: 'bold',
          color: '#1f2937',
        },
        company: {
          fontSize: 12,
          color: '#374151',
          marginBottom: 3,
        },
        duration: {
          fontSize: 10,
          color: '#6b7280',
          marginBottom: 5,
        },
        skill: {
          fontSize: 10,
          backgroundColor: '#f3f4f6',
          color: '#1f2937',
          padding: '4 8',
          borderRadius: 2,
          marginBottom: 4,
          marginRight: 8,
        },
        skillsContainer: {
          flexDirection: 'row' as const,
          flexWrap: 'wrap' as const,
        },
      })

    case 'creative':
      return StyleSheet.create({
        ...baseStyles,
        header: {
          marginBottom: 20,
          borderBottom: '3 solid #e11d48',
          paddingBottom: 10,
        },
        name: {
          fontSize: 26,
          fontWeight: 'bold',
          color: '#e11d48',
          marginBottom: 5,
        },
        contact: {
          fontSize: 11,
          color: '#6b7280',
          marginBottom: 2,
        },
        sectionTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#e11d48',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: 1,
        },
        jobTitle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#1f2937',
        },
        company: {
          fontSize: 11,
          color: '#e11d48',
          marginBottom: 2,
        },
        duration: {
          fontSize: 10,
          color: '#6b7280',
          marginBottom: 4,
        },
        skill: {
          fontSize: 10,
          backgroundColor: '#fce7f3',
          color: '#e11d48',
          padding: '4 8',
          borderRadius: 4,
          marginBottom: 4,
          marginRight: 8,
        },
        skillsContainer: {
          flexDirection: 'row' as const,
          flexWrap: 'wrap' as const,
        },
      })

    case 'tech':
      return StyleSheet.create({
        ...baseStyles,
        header: {
          marginBottom: 20,
          borderBottom: '2 solid #10b981',
          paddingBottom: 10,
        },
        name: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: 5,
        },
        contact: {
          fontSize: 11,
          color: '#6b7280',
          marginBottom: 2,
        },
        sectionTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#10b981',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: 1,
        },
        jobTitle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#1f2937',
        },
        company: {
          fontSize: 11,
          color: '#10b981',
          marginBottom: 2,
        },
        duration: {
          fontSize: 10,
          color: '#6b7280',
          marginBottom: 4,
        },
        skill: {
          fontSize: 10,
          backgroundColor: '#d1fae5',
          color: '#10b981',
          padding: '4 8',
          borderRadius: 4,
          marginBottom: 4,
          marginRight: 8,
        },
        skillsContainer: {
          flexDirection: 'row' as const,
          flexWrap: 'wrap' as const,
        },
      })

    default: // modern template as default
      return StyleSheet.create({
        ...baseStyles,
        header: {
          marginBottom: 20,
          borderBottom: '2 solid #2563eb',
          paddingBottom: 10,
        },
        name: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: 5,
        },
        contact: {
          fontSize: 11,
          color: '#6b7280',
          marginBottom: 2,
        },
        sectionTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#2563eb',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: 1,
        },
        jobTitle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#1f2937',
        },
        company: {
          fontSize: 11,
          color: '#2563eb',
          marginBottom: 2,
        },
        duration: {
          fontSize: 10,
          color: '#6b7280',
          marginBottom: 4,
        },
        skill: {
          fontSize: 10,
          backgroundColor: '#eff6ff',
          color: '#2563eb',
          padding: '4 8',
          borderRadius: 4,
          marginBottom: 4,
          marginRight: 8,
        },
        skillsContainer: {
          flexDirection: 'row' as const,
          flexWrap: 'wrap' as const,
        },
      })
  }
}

interface CVData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    website: string
    summary: string
  }
  experience: Array<{
    id: string
    position: string
    company: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    description: string
  }>
  skills: Array<{
    id: string
    name: string
    level: string
    category: string
  }>
  selectedTemplate: string
}

// PDF Document Component
const CVDocument: React.FC<{ data: CVData }> = ({ data }) => {
  const styles = getTemplateStyles(data.selectedTemplate)
  
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </Text>
        {data.personalInfo.email && (
          <Text style={styles.contact}>{data.personalInfo.email}</Text>
        )}
        {data.personalInfo.phone && (
          <Text style={styles.contact}>{data.personalInfo.phone}</Text>
        )}
        {data.personalInfo.location && (
          <Text style={styles.contact}>{data.personalInfo.location}</Text>
        )}
      </View>

      {/* Summary Section */}
      {data.personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.text}>{data.personalInfo.summary}</Text>
        </View>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.position}</Text>
              <Text style={styles.company}>
                {exp.company}
              </Text>
              <Text style={styles.duration}>
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </Text>
              {exp.description && (
                <Text style={styles.text}>{exp.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{edu.degree} {edu.field && `in ${edu.field}`}</Text>
              <Text style={styles.company}>
                {edu.institution}
              </Text>
              <Text style={styles.duration}>
                {edu.startDate} - {edu.endDate}
              </Text>
              {edu.description && (
                <Text style={styles.text}>{edu.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>
                {skill.name}
              </Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
  )
}

// Function to generate and download PDF
export const generatePDF = async (cvData: CVData): Promise<void> => {
  try {
    const doc = <CVDocument data={cvData} />
    const asPdf = pdf(doc)
    const blob = await asPdf.toBlob()
    
    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    // Generate filename
    const fileName = `${cvData.personalInfo.firstName || 'CV'}_${cvData.personalInfo.lastName || 'Resume'}_${new Date().toISOString().split('T')[0]}.pdf`
    link.download = fileName
    
    // Trigger download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Cleanup
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF. Please try again.')
  }
}

export default CVDocument