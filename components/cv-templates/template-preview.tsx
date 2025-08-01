import { Card } from '@/components/ui/card'

interface TemplatePreviewProps {
  template: 'modern' | 'classic' | 'creative' | 'minimal'
  className?: string
}

export function TemplatePreview({ template, className = '' }: TemplatePreviewProps) {
  const renderModern = () => (
    <div className={`aspect-[3/4] bg-white border rounded-lg overflow-hidden shadow-sm ${className}`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
          <div className="h-3 bg-white/30 rounded mb-1 w-3/4"></div>
          <div className="h-2 bg-white/20 rounded w-1/2"></div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 space-y-4">
          <div className="space-y-2">
            <div className="h-2 bg-gray-300 rounded w-1/3"></div>
            <div className="space-y-1">
              <div className="h-1.5 bg-gray-200 rounded w-full"></div>
              <div className="h-1.5 bg-gray-200 rounded w-5/6"></div>
              <div className="h-1.5 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
            <div className="space-y-1">
              <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
              <div className="h-1.5 bg-gray-200 rounded w-3/5"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-2 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-1.5 bg-gray-200 rounded"></div>
              <div className="h-1.5 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderClassic = () => (
    <div className={`aspect-[3/4] bg-white border rounded-lg overflow-hidden shadow-sm ${className}`}>
      <div className="h-full flex flex-col p-4 space-y-3">
        {/* Header - centered */}
        <div className="text-center border-b pb-3">
          <div className="h-3 bg-gray-800 rounded mb-1 w-1/2 mx-auto"></div>
          <div className="h-2 bg-gray-500 rounded w-1/3 mx-auto"></div>
        </div>
        
        {/* Two column layout */}
        <div className="flex-1 grid grid-cols-3 gap-3">
          {/* Left column */}
          <div className="col-span-2 space-y-3">
            <div className="space-y-1">
              <div className="h-2 bg-gray-700 rounded w-1/2"></div>
              <div className="space-y-0.5">
                <div className="h-1 bg-gray-400 rounded w-full"></div>
                <div className="h-1 bg-gray-400 rounded w-5/6"></div>
                <div className="h-1 bg-gray-400 rounded w-4/6"></div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="h-2 bg-gray-700 rounded w-1/3"></div>
              <div className="space-y-0.5">
                <div className="h-1 bg-gray-400 rounded w-4/5"></div>
                <div className="h-1 bg-gray-400 rounded w-3/5"></div>
              </div>
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-2">
            <div className="space-y-1">
              <div className="h-1.5 bg-gray-600 rounded w-3/4"></div>
              <div className="space-y-0.5">
                <div className="h-1 bg-gray-400 rounded"></div>
                <div className="h-1 bg-gray-400 rounded"></div>
                <div className="h-1 bg-gray-400 rounded w-3/4"></div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="h-1.5 bg-gray-600 rounded w-2/3"></div>
              <div className="space-y-0.5">
                <div className="h-1 bg-gray-400 rounded"></div>
                <div className="h-1 bg-gray-400 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCreative = () => (
    <div className={`aspect-[3/4] bg-white border rounded-lg overflow-hidden shadow-sm ${className}`}>
      <div className="h-full flex">
        {/* Left sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-3 space-y-3">
          <div className="space-y-1">
            <div className="h-2.5 bg-white/40 rounded w-full"></div>
            <div className="h-1.5 bg-white/30 rounded w-3/4"></div>
          </div>
          
          <div className="space-y-1">
            <div className="h-1.5 bg-white/30 rounded w-2/3"></div>
            <div className="space-y-0.5">
              <div className="h-1 bg-white/20 rounded"></div>
              <div className="h-1 bg-white/20 rounded w-4/5"></div>
              <div className="h-1 bg-white/20 rounded w-3/5"></div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="h-1.5 bg-white/30 rounded w-1/2"></div>
            <div className="space-y-0.5">
              <div className="h-1 bg-white/20 rounded"></div>
              <div className="h-1 bg-white/20 rounded w-3/4"></div>
            </div>
          </div>
        </div>
        
        {/* Right content */}
        <div className="flex-1 p-3 space-y-3">
          <div className="space-y-1">
            <div className="h-2.5 bg-gray-800 rounded w-3/4"></div>
            <div className="h-1.5 bg-gray-500 rounded w-1/2"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-1.5 bg-purple-600 rounded w-1/3"></div>
            <div className="space-y-0.5">
              <div className="h-1 bg-gray-400 rounded w-full"></div>
              <div className="h-1 bg-gray-400 rounded w-5/6"></div>
              <div className="h-1 bg-gray-400 rounded w-4/6"></div>
              <div className="h-1 bg-gray-400 rounded w-3/6"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-1.5 bg-purple-600 rounded w-1/2"></div>
            <div className="space-y-0.5">
              <div className="h-1 bg-gray-400 rounded w-4/5"></div>
              <div className="h-1 bg-gray-400 rounded w-3/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMinimal = () => (
    <div className={`aspect-[3/4] bg-white border rounded-lg overflow-hidden shadow-sm ${className}`}>
      <div className="h-full p-6 space-y-4">
        {/* Header - minimal */}
        <div className="border-b pb-3 space-y-1">
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          <div className="h-2 bg-gray-400 rounded w-1/3"></div>
        </div>
        
        {/* Content with lots of whitespace */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-2 bg-gray-600 rounded w-1/4"></div>
            <div className="space-y-1">
              <div className="h-1.5 bg-gray-300 rounded w-full"></div>
              <div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-1.5 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-2 bg-gray-600 rounded w-1/3"></div>
            <div className="space-y-1">
              <div className="h-1.5 bg-gray-300 rounded w-4/5"></div>
              <div className="h-1.5 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-2 bg-gray-600 rounded w-1/5"></div>
            <div className="flex gap-2">
              <div className="h-1.5 bg-gray-300 rounded flex-1"></div>
              <div className="h-1.5 bg-gray-300 rounded flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  switch (template) {
    case 'modern':
      return renderModern()
    case 'classic':
      return renderClassic()
    case 'creative':
      return renderCreative()
    case 'minimal':
      return renderMinimal()
    default:
      return renderModern()
  }
}