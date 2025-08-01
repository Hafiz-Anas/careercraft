'use client'

interface ExecutiveTemplateProps {
  data: any
  className?: string
  isPreview?: boolean
}

export function ExecutiveTemplate({ data, className = '', isPreview = false }: ExecutiveTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  if (isPreview) {
    return (
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
          <h1 className="text-2xl font-bold">Executive Professional</h1>
          <p className="text-slate-200">Sophisticated design for senior leaders</p>
        </div>
        <div className="p-6">
          <div className="space-y-4 text-sm">
            <div className="border-l-4 border-slate-600 pl-4">
              <p className="font-bold text-slate-800">EXECUTIVE SUMMARY</p>
              <p className="text-slate-600 mt-1">Strategic leader with proven track record</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-800 mb-1">LEADERSHIP</p>
                <div className="space-y-1 text-xs">
                  <p className="text-slate-600">• CEO at Fortune 500</p>
                  <p className="text-slate-600">• VP of Operations</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">EDUCATION</p>
                <p className="text-slate-600 text-xs">MBA • Harvard Business</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white max-w-4xl mx-auto shadow-lg ${className}`}>
      {/* Executive Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8">
        <div className="border-l-4 border-amber-400 pl-6">
          <h1 className="text-5xl font-bold mb-4 tracking-wide">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="text-slate-200 space-y-2">
            {personalInfo.email && <p className="flex items-center"><span className="mr-3">✉</span> {personalInfo.email}</p>}
            {personalInfo.phone && <p className="flex items-center"><span className="mr-3">📞</span> {personalInfo.phone}</p>}
            {personalInfo.location && <p className="flex items-center"><span className="mr-3">📍</span> {personalInfo.location}</p>}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* Executive Summary */}
        {personalInfo.summary && (
          <section>
            <div className="border-l-4 border-amber-400 pl-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-800 tracking-wide">EXECUTIVE SUMMARY</h2>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-slate-300">
              <p className="text-slate-700 leading-relaxed text-lg">{personalInfo.summary}</p>
            </div>
          </section>
        )}

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Leadership Experience */}
            {experience.length > 0 && (
              <section>
                <div className="border-l-4 border-amber-400 pl-6 mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 tracking-wide">LEADERSHIP EXPERIENCE</h2>
                </div>
                <div className="space-y-8">
                  {experience.map((exp: any) => (
                    <div key={exp.id} className="border-l-2 border-slate-200 pl-6 pb-6">
                      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">{exp.position}</h3>
                            <p className="text-slate-600 font-semibold text-lg">{exp.company}</p>
                          </div>
                          <div className="text-right">
                            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </span>
                          </div>
                        </div>
                        {exp.description && (
                          <div className="prose prose-slate max-w-none">
                            <p className="text-slate-700 leading-relaxed">{exp.description}</p>
                          </div>
                        )}
                      </div>
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
                <div className="border-l-4 border-amber-400 pl-6 mb-6">
                  <h2 className="text-xl font-bold text-slate-800 tracking-wide">CORE COMPETENCIES</h2>
                </div>
                <div className="space-y-4">
                  {Array.from(new Set(skills.map((s: any) => s.category))).map((category: unknown) => (
                    <div key={category as string} className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="font-bold text-slate-800 mb-3">{(category as string).toUpperCase()}</h3>
                      <div className="space-y-2">
                        {skills
                          .filter((skill: any) => skill.category === category as string)
                          .map((skill: any) => (
                            <div key={skill.id} className="flex justify-between items-center">
                              <span className="text-slate-700">{skill.name}</span>
                              <div className="flex space-x-1">
                                {[...Array(4)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${
                                      i < (skill.level === 'Expert' ? 4 : skill.level === 'Advanced' ? 3 : skill.level === 'Intermediate' ? 2 : 1)
                                        ? 'bg-amber-400' : 'bg-slate-300'
                                    }`}
                                  />
                                ))}
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
                <div className="border-l-4 border-amber-400 pl-6 mb-6">
                  <h2 className="text-xl font-bold text-slate-800 tracking-wide">EDUCATION</h2>
                </div>
                <div className="space-y-4">
                  {education.map((edu: any) => (
                    <div key={edu.id} className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="font-bold text-slate-800 mb-1">{edu.degree}</h3>
                      <p className="text-slate-600 font-semibold">{edu.institution}</p>
                      {edu.field && <p className="text-slate-600 text-sm">{edu.field}</p>}
                      <p className="text-xs text-slate-500 mt-2">
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