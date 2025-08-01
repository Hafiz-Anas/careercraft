'use client'

interface CorporateTemplateProps {
  data: any
  className?: string
  isPreview?: boolean
}

export function CorporateTemplate({ data, className = '', isPreview = false }: CorporateTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  if (isPreview) {
    return (
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
        <div className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white p-6">
          <h1 className="text-2xl font-bold">Corporate Elite</h1>
          <p className="text-indigo-200">Premium design for business leaders</p>
        </div>
        <div className="p-6">
          <div className="space-y-4 text-sm">
            <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-600">
              <p className="font-bold text-indigo-900">PROFESSIONAL PROFILE</p>
              <p className="text-indigo-700 text-xs mt-1">Strategic business leader</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-semibold text-gray-800 text-xs mb-1">EXPERTISE</p>
                <div className="space-y-1">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-indigo-600 h-1 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <p className="text-gray-600 text-xs">Management</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-xs mb-1">EDUCATION</p>
                <p className="text-gray-600 text-xs">MBA Business Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white max-w-4xl mx-auto shadow-lg ${className}`}>
      {/* Corporate Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white p-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="h-1 w-24 bg-amber-400 mb-4"></div>
            <p className="text-indigo-200 text-lg">Professional Executive</p>
          </div>
          <div className="space-y-3 text-indigo-200">
            {personalInfo.email && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-800 rounded flex items-center justify-center">
                  <span className="text-xs">✉</span>
                </div>
                <span className="text-sm">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-800 rounded flex items-center justify-center">
                  <span className="text-xs">📞</span>
                </div>
                <span className="text-sm">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-800 rounded flex items-center justify-center">
                  <span className="text-xs">📍</span>
                </div>
                <span className="text-sm">{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* Professional Profile */}
        {personalInfo.summary && (
          <section>
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4 uppercase tracking-wide">Professional Profile</h2>
              <p className="text-indigo-800 leading-relaxed text-lg">{personalInfo.summary}</p>
            </div>
          </section>
        )}

        <div className="grid lg:grid-cols-4 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-10">
            {/* Professional Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-indigo-900 mb-8 uppercase tracking-wide border-b-2 border-indigo-200 pb-3">
                  Professional Experience
                </h2>
                <div className="space-y-8">
                  {experience.map((exp: any) => (
                    <div key={exp.id} className="bg-white border border-indigo-100 rounded-lg p-6 shadow-sm">
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div className="md:col-span-3">
                          <h3 className="text-xl font-bold text-indigo-900 mb-2">{exp.position}</h3>
                          <p className="text-indigo-700 font-semibold text-lg">{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded font-semibold text-sm">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </div>
                        </div>
                      </div>
                      {exp.description && (
                        <div className="border-l-4 border-indigo-200 pl-4">
                          <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Core Competencies */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-indigo-900 mb-6 uppercase tracking-wide">Core Competencies</h2>
                <div className="space-y-6">
                  {Array.from(new Set(skills.map((s: any) => s.category))).map((category: unknown) => (
                    <div key={category as string}>
                      <h3 className="font-bold text-indigo-800 mb-4 text-sm uppercase">{category as string}</h3>
                      <div className="space-y-3">
                        {skills
                          .filter((skill: any) => skill.category === category as string)
                          .map((skill: any) => (
                            <div key={skill.id}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-700 font-medium text-sm">{skill.name}</span>
                                <span className="text-indigo-600 text-xs font-semibold">{skill.level}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                  style={{ 
                                    width: `${
                                      skill.level === 'Expert' ? '100%' :
                                      skill.level === 'Advanced' ? '80%' :
                                      skill.level === 'Intermediate' ? '60%' : '40%'
                                    }`
                                  }}
                                ></div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-indigo-900 mb-6 uppercase tracking-wide">Education</h2>
                <div className="space-y-4">
                  {education.map((edu: any) => (
                    <div key={edu.id} className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600">
                      <h3 className="font-bold text-indigo-900 mb-1">{edu.degree}</h3>
                      <p className="text-indigo-700 font-medium">{edu.institution}</p>
                      {edu.field && <p className="text-indigo-600 text-sm mt-1">{edu.field}</p>}
                      <div className="mt-2 text-xs text-indigo-500 bg-white px-2 py-1 rounded inline-block">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}