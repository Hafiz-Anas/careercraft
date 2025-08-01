'use client'

interface TechTemplateProps {
  data: any
  className?: string
  isPreview?: boolean
}

export function TechTemplate({ data, className = '', isPreview = false }: TechTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  if (isPreview) {
    return (
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
          <h1 className="text-2xl font-bold">Tech Innovator</h1>
          <p className="text-emerald-100">Modern design for tech professionals</p>
        </div>
        <div className="p-6">
          <div className="space-y-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="font-semibold text-gray-800">Full Stack Developer</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex flex-wrap gap-2">
                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">React</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Node.js</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Python</span>
              </div>
            </div>
            <div className="border-l-2 border-emerald-500 pl-3">
              <p className="text-gray-700 text-xs">5+ years building scalable applications</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white max-w-4xl mx-auto shadow-lg ${className}`}>
      {/* Tech Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full translate-y-16 -translate-x-16"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-mono font-bold">&lt;/&gt;</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className="text-emerald-100 text-lg">Software Engineer & Tech Innovator</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 text-emerald-100">
            {personalInfo.email && (
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4">✉</span>
                <span className="text-sm">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4">📞</span>
                <span className="text-sm">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4">📍</span>
                <span className="text-sm">{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* About */}
        {personalInfo.summary && (
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                <span className="text-white text-sm">📝</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 bg-emerald-50 p-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          </section>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                    <span className="text-white text-sm">💼</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
                </div>
                <div className="space-y-6">
                  {experience.map((exp: any, index: number) => (
                    <div key={exp.id} className="relative">
                      {index < experience.length - 1 && (
                        <div className="absolute left-6 top-12 w-px h-full bg-emerald-200"></div>
                      )}
                      <div className="flex space-x-4">
                        <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1 bg-gray-50 p-6 rounded-lg border-l-4 border-emerald-500">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                              <p className="text-emerald-600 font-semibold">{exp.company}</p>
                            </div>
                            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </span>
                          </div>
                          {exp.description && (
                            <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tech Stack */}
            {skills.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Tech Stack</h2>
                </div>
                <div className="space-y-4">
                  {Array.from(new Set(skills.map((s: any) => s.category))).map((category: unknown) => (
                    <div key={category as string}>
                      <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">{category as string}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {skills
                          .filter((skill: any) => skill.category === category as string)
                          .map((skill: any) => (
                            <span
                              key={skill.id}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                skill.level === 'Expert' ? 'bg-emerald-600 text-white' :
                                skill.level === 'Advanced' ? 'bg-emerald-500 text-white' :
                                skill.level === 'Intermediate' ? 'bg-emerald-100 text-emerald-800' :
                                'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {skill.name}
                              {skill.level === 'Expert' && ' ★'}
                            </span>
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
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                    <span className="text-white text-sm">🎓</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Education</h2>
                </div>
                <div className="space-y-4">
                  {education.map((edu: any) => (
                    <div key={edu.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-emerald-500">
                      <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                      <p className="text-emerald-600 font-medium">{edu.institution}</p>
                      {edu.field && <p className="text-gray-600 text-sm">{edu.field}</p>}
                      <p className="text-gray-500 text-xs mt-2">
                        {edu.startDate} - {edu.endDate}
                      </p>
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