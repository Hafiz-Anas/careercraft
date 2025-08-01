'use client'

interface ClassicTemplateProps {
  data: any
  className?: string
  isPreview?: boolean
}

export function ClassicTemplate({ data, className = '', isPreview = false }: ClassicTemplateProps) {
  const { personalInfo, experience, education, skills = [] } = data

  if (isPreview) {
    return (
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
        <div className="bg-gray-800 text-white p-6">
          <h1 className="text-2xl font-bold">Classic Executive</h1>
          <p className="text-gray-300">Traditional professional layout</p>
        </div>
        <div className="p-6">
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 border-b border-gray-200 pb-1">PERSONAL INFO</h3>
              <div className="mt-2 text-gray-600">
                <p>Professional Name</p>
                <p>email@domain.com</p>
                <p>Phone Number</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 border-b border-gray-200 pb-1">EXPERIENCE</h3>
              <div className="mt-2 space-y-2">
                <div>
                  <p className="font-medium text-gray-700">Senior Position</p>
                  <p className="text-gray-500 text-xs">Company Name • 2020-Present</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Previous Role</p>
                  <p className="text-gray-500 text-xs">Another Company • 2018-2020</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 border-b border-gray-200 pb-1">EDUCATION</h3>
              <div className="mt-2">
                <p className="font-medium text-gray-700">Degree Name</p>
                <p className="text-gray-500 text-xs">University Name • Year</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white max-w-4xl mx-auto shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gray-800 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div>
            {personalInfo.email && <p>✉ {personalInfo.email}</p>}
            {personalInfo.phone && <p>📞 {personalInfo.phone}</p>}
          </div>
          <div>
            {personalInfo.location && <p>📍 {personalInfo.location}</p>}
            {personalInfo.website && <p>🌐 {personalInfo.website}</p>}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-800 pb-2 mb-4">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-800 pb-2 mb-4">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-6">
              {experience.map((exp: any) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-gray-600">
                      <p className="font-medium">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-800 pb-2 mb-4">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu: any) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    {edu.field && <p className="text-gray-600">{edu.field}</p>}
                    {edu.description && (
                      <p className="text-gray-700 text-sm mt-1">{edu.description}</p>
                    )}
                  </div>
                  <div className="text-right text-gray-600">
                    <p className="font-medium">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-800 pb-2 mb-4">
              SKILLS & COMPETENCIES
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from(new Set(skills.map((s: any) => s.category))).map((category: unknown) => (
                <div key={category as string}>
                  <h3 className="font-semibold text-blue-600 mb-3">{category as string}</h3>
                  <div className="space-y-2">
                    {skills
                      .filter((skill: any) => skill.category === category as string)
                      .map((skill: any) => (
                        <div key={skill.id} className="flex justify-between items-center">
                          <span className="text-gray-700">{skill.name}</span>
                          <span className="text-blue-600 font-medium text-sm">{skill.level}</span>
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