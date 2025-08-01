'use client'

interface MinimalTemplateProps {
  data: any
  className?: string
  isPreview?: boolean
}

export function MinimalTemplate({ data, className = '', isPreview = false }: MinimalTemplateProps) {
  const { personalInfo, experience, education, skills = [] } = data

  if (isPreview) {
    return (
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden border ${className}`}>
        <div className="p-6 border-b">
          <h1 className="text-2xl font-light">Minimal Clean</h1>
          <p className="text-gray-500">Sleek minimalist design</p>
        </div>
        <div className="p-6">
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-light text-gray-900 text-lg mb-2">Professional Name</h3>
              <p className="text-gray-600">email@domain.com • +1 234 567 890</p>
              <div className="w-12 h-px bg-gray-300 mt-3"></div>
            </div>
            <div>
              <h3 className="font-light text-gray-900 mb-3">Experience</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-800">Senior Position</p>
                  <p className="text-gray-500">Company Name</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Previous Role</p>
                  <p className="text-gray-500">Another Company</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-light text-gray-900 mb-3">Education</h3>
              <div>
                <p className="font-medium text-gray-800">Degree Name</p>
                <p className="text-gray-500">University Name</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white max-w-4xl mx-auto ${className}`}>
      {/* Minimal Header */}
      <div className="border-b border-gray-200 p-8 mb-8">
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-wide">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap gap-6 text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      <div className="px-8 space-y-12">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <div className="mb-6">
              <div className="w-16 h-px bg-gray-900 mb-4"></div>
              <h2 className="text-2xl font-light text-gray-900 tracking-wide">Summary</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg font-light max-w-3xl">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <div className="mb-8">
              <div className="w-16 h-px bg-gray-900 mb-4"></div>
              <h2 className="text-2xl font-light text-gray-900 tracking-wide">Experience</h2>
            </div>
            <div className="space-y-8">
              {experience.map((exp: any) => (
                <div key={exp.id} className="grid md:grid-cols-4 gap-6">
                  <div className="md:col-span-1">
                    <p className="text-gray-500 font-light">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-medium text-gray-900 mb-1">{exp.position}</h3>
                    <p className="text-gray-600 font-light mb-3">{exp.company}</p>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed font-light">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8">
            <div className="mb-8">
              <div className="w-16 h-px bg-gray-900 mb-4"></div>
              <h2 className="text-2xl font-light text-gray-900 tracking-wide">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu: any) => (
                <div key={edu.id} className="grid md:grid-cols-4 gap-6">
                  <div className="md:col-span-1">
                    <p className="text-gray-500 font-light">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-medium text-gray-900 mb-1">{edu.degree}</h3>
                    <p className="text-gray-600 font-light mb-2">{edu.institution}</p>
                    {edu.field && <p className="text-gray-600 font-light mb-2">{edu.field}</p>}
                    {edu.description && (
                      <p className="text-gray-700 leading-relaxed font-light text-sm">{edu.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}