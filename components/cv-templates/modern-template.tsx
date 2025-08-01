interface ModernTemplateProps {
  data: any
  className?: string
  isPreview?: boolean
}

export function ModernTemplate({ data, className = '', isPreview = false }: ModernTemplateProps) {
  const { personalInfo, experience, education, skills = [] } = data

  if (isPreview) {
    return (
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <h1 className="text-2xl font-bold">Modern Professional</h1>
          <p className="text-blue-100">Clean and contemporary design</p>
        </div>
        <div className="p-6">
          <div className="space-y-4 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs">👤</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Professional Name</p>
                <p className="text-gray-600">email@domain.com</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Senior Position at Company</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Previous Role at Another Company</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-blue-800 font-medium">Education</p>
              <p className="text-blue-600 text-xs">Degree • University</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white max-w-4xl mx-auto shadow-lg ${className}`}>
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold">
              {personalInfo.firstName?.[0]}{personalInfo.lastName?.[0]}
            </span>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 text-blue-100">
          <div className="space-y-2">
            {personalInfo.email && (
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4">✉</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4">📞</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            {personalInfo.location && (
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4">📍</span>
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4">🌐</span>
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">💡</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Professional Summary</h2>
            </div>
            <div className="ml-11 bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">💼</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Professional Experience</h2>
            </div>
            <div className="ml-11 space-y-6">
              {experience.map((exp: any) => (
                <div key={exp.id} className="border-l-4 border-blue-600 pl-6 pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed mt-3">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🎓</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Education</h2>
            </div>
            <div className="ml-11 grid md:grid-cols-2 gap-6">
              {education.map((edu: any) => (
                <div key={edu.id} className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{edu.degree}</h3>
                  <p className="text-blue-600 font-medium mb-2">{edu.institution}</p>
                  {edu.field && <p className="text-gray-600 mb-2">{edu.field}</p>}
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 text-sm mt-3">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">⚡</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Skills & Expertise</h2>
            </div>
            <div className="ml-11 grid md:grid-cols-2 gap-6">
              {Array.from(new Set(skills.map((s: any) => s.category))).map((category: unknown) => (
                <div key={category as string} className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">{category as string}</h3>
                  <div className="space-y-2">
                    {skills
                      .filter((skill: any) => skill.category === category as string)
                      .map((skill: any) => (
                        <div key={skill.id} className="flex justify-between items-center">
                          <span className="text-gray-700">{skill.name}</span>
                          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs">
                            {skill.level}
                          </span>
                        </div>
                      ))
                    }
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