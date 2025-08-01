'use client'

import { Button } from '@/components/ui/button'
import { ModernTemplate } from '@/components/cv-templates/modern-template'
import { Download, Share2 } from 'lucide-react'
import type { CVData } from '@/types'

interface PublicCVDisplayProps {
  cv: CVData
}

export function PublicCVDisplay({ cv }: PublicCVDisplayProps) {
  const fullName = `${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`.trim()

  const handleDownloadPDF = async () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${fullName} - CV`,
          text: `Check out ${fullName}'s professional CV`,
          url: window.location.href
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy link', err)
      }
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50 print:hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div>
                <h1 className="font-semibold">{fullName}</h1>
                <p className="text-sm text-muted-foreground">Professional CV</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownloadPDF}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* CV Content */}
        <main className="py-8 print:py-0">
          <div className="container mx-auto px-4 print:px-0">
            <div className="print:shadow-none">
              {cv.template.category === 'modern' && (
                <ModernTemplate data={cv} className="print:shadow-none print:max-w-none" />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: A4;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .print\\:max-w-none {
            max-width: none !important;
          }
          
          .print\\:py-0 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          
          .print\\:px-0 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </>
  )
}