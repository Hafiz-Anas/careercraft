'use client'

interface CreativeTemplateProps {
  data: any
  className?: string
  isPreview?: boolean
}

export function CreativeTemplate({ data, className = '', isPreview = false }: CreativeTemplateProps) {
  const { personalInfo, experience, education, skills = [] } = data

  if (isPreview) {
    return (
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <h1 className="text-2xl font-bold">Creative Designer</h1>
          <p className="text-purple-100">Bold and artistic design</p>
        </div>
        <div className="p-6">
          <div className="space-y-4 text-sm">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h3 className="font-bold text-purple-800">CREATIVE PROFILE</h3>
              <p className="text-purple-600 mt-1">Innovative designer with passion</p>
            </div>
            <div className="bg-pink-50 p-3 rounded-lg">
              <h3 className="font-bold text-pink-800">EXPERIENCE</h3>
              <div className="mt-2 space-y-1">
                <p className="text-pink-600">• Creative Director</p>
                <p className="text-pink-600">• Senior Designer</p>
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <h3 className="font-bold text-purple-800">EDUCATION</h3>
              <p className="text-purple-600 mt-1">Design Degree</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white max-w-4xl mx-auto shadow-lg ${className}`}>
      {/* Creative Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="grid md:grid-cols-2 gap-4 text-purple-100">
            <div className="space-y-1">
              {personalInfo.email && <p className="flex items-center"><span className="mr-2">✉</span> {personalInfo.email}</p>}
              {personalInfo.phone && <p className="flex items-center"><span className="mr-2">📞</span> {personalInfo.phone}</p>}
            </div>
            <div className="space-y-1">
              {personalInfo.location && <p className="flex items-center"><span className="mr-2">📍</span> {personalInfo.location}</p>}
              {personalInfo.website && <p className="flex items-center"><span className="mr-2">🌐</span> {personalInfo.website}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Creative Summary */}
        {personalInfo.summary && (
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-4">
              ✨ CREATIVE PROFILE
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-6">
              💼 PROFESSIONAL JOURNEY
            </h2>
            <div className="space-y-6">
              {experience.map((exp: any, index: number) => (
                <div key={exp.id} className={`p-6 rounded-lg ${index % 2 === 0 ? 'bg-purple-50' : 'bg-pink-50'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                      <p className={`font-semibold ${index % 2 === 0 ? 'text-purple-600' : 'text-pink-600'}`}>{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${index % 2 === 0 ? 'bg-purple-200 text-purple-800' : 'bg-pink-200 text-pink-800'}`}>
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
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
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-6">
              🎓 EDUCATION & LEARNING
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu: any, index: number) => (
                <div key={edu.id} className={`p-6 rounded-lg ${index % 2 === 0 ? 'bg-gradient-to-br from-purple-50 to-purple-100' : 'bg-gradient-to-br from-pink-50 to-pink-100'}`}>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{edu.degree}</h3>
                  <p className={`font-semibold mb-2 ${index % 2 === 0 ? 'text-purple-600' : 'text-pink-600'}`}>{edu.institution}</p>
                  {edu.field && <p className="text-gray-600 mb-2">{edu.field}</p>}
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${index % 2 === 0 ? 'bg-purple-200 text-purple-800' : 'bg-pink-200 text-pink-800'}`}>
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
      </div>
    </div>
  )
}