import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { 
  FileText, 
  Download, 
  Palette, 
  Share2, 
  CheckCircle, 
  Star,
  ArrowRight,
  Sparkles,
  Trophy,
  Users,
  Zap,
  Eye,
  User,
  Video
} from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Templates',
    description: 'Choose from premium, professionally designed templates crafted by career experts to maximize your impact.'
  },
  {
    icon: Zap,
    title: 'Lightning-Fast Builder',
    description: 'Create stunning CVs in minutes with our intuitive drag-and-drop interface and smart auto-fill features.'
  },
  {
    icon: Trophy,
    title: 'ATS-Optimized',
    description: 'All templates are optimized for Applicant Tracking Systems to ensure your CV gets seen by recruiters.'
  },
  {
    icon: Users,
    title: 'Expert Insights',
    description: 'Get real-time suggestions and industry-specific tips to craft the perfect CV for your dream job.'
  }
]

const templates = [
  {
    name: 'Executive Pro',
    description: 'Sophisticated design for senior executives and C-level positions.',
    image: '/templates/executive-preview.jpg',
    badge: 'Premium'
  },
  {
    name: 'Tech Innovator',
    description: 'Modern, clean layout perfect for tech professionals and developers.',
    image: '/templates/tech-preview.jpg',
    badge: 'Popular'
  },
  {
    name: 'Creative Studio',
    description: 'Bold, artistic design that showcases creativity and portfolio work.',
    image: '/templates/creative-preview.jpg',
    badge: 'New'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.08) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}/>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 75px 75px, rgba(168, 85, 247, 0.06) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}/>
        
        {/* Enhanced Floating elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-30 animate-bounce shadow-lg shadow-blue-500/20" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-32 left-32 w-8 h-8 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-40 animate-bounce shadow-md shadow-purple-500/20" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-purple-200 to-purple-400 rounded-full opacity-25 animate-bounce shadow-lg shadow-purple-500/20" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 right-40 w-12 h-12 bg-gradient-to-br from-pink-200 to-pink-400 rounded-full opacity-35 animate-bounce shadow-md shadow-pink-500/20" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-br from-indigo-200 to-indigo-400 rounded-full opacity-30 animate-bounce shadow-lg shadow-indigo-500/20" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-60 right-60 w-10 h-10 bg-gradient-to-br from-cyan-200 to-cyan-400 rounded-full opacity-40 animate-bounce shadow-md shadow-cyan-500/20" style={{animationDelay: '5s'}}></div>
        
        {/* Animated light rays */}
        <div className="absolute top-10 left-1/4 w-1 h-32 bg-gradient-to-b from-blue-300/30 to-transparent rotate-12 animate-pulse"></div>
        <div className="absolute top-20 right-1/3 w-1 h-24 bg-gradient-to-b from-purple-300/30 to-transparent -rotate-12 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-1 h-28 bg-gradient-to-t from-pink-300/30 to-transparent rotate-45 animate-pulse" style={{animationDelay: '4s'}}></div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-100/80 via-purple-100/80 to-pink-100/80 backdrop-blur-sm px-8 py-4 rounded-full text-sm font-bold text-blue-700 mb-12 shadow-2xl border border-white/50 transform hover:scale-105 transition-all duration-500 group">
              <div className="flex space-x-1 animate-pulse">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" style={{transitionDelay: '50ms'}} />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" style={{transitionDelay: '100ms'}} />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" style={{transitionDelay: '150ms'}} />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" style={{transitionDelay: '200ms'}} />
              </div>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-base">
                Trusted by 50,000+ professionals worldwide
              </span>
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping"></div>
            </div>
            
            {/* Enhanced Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-10 leading-tight">
              <span className="block text-gray-900 mb-4 transform hover:scale-105 transition-transform duration-500">
                Build Your Dream
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative">
                <span className="relative z-10">Career Today</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-pink-200/20 blur-2xl animate-pulse"></div>
              </span>
            </h1>
            
            {/* Enhanced Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-14 max-w-5xl mx-auto leading-relaxed font-medium">
              Create stunning, <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold">ATS-optimized CVs</span> and professional documents in minutes. 
              Join thousands of professionals who landed their dream jobs with <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold">CareerCraft</span>.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <div className="relative group">
                <Button size="lg" className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 px-8 py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-blue-500/15 transform hover:scale-[1.02] transition-all duration-300 border-0" asChild>
                  <Link href="/portfolio/builder" className="flex items-center space-x-2">
                    <span className="relative z-10 text-white">Create Portfolio</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-all duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </Link>
                </Button>
                
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-sm opacity-0 group-hover:opacity-15 transition-all duration-300"></div>
              </div>
              
              <div className="relative group">
                <Button size="lg" variant="outline" className="relative overflow-hidden px-8 py-3 text-base font-semibold border-2 border-gray-300 rounded-lg bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:border-blue-400 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300" asChild>
                  <Link href="/create" className="flex items-center space-x-2">
                    <div className="relative p-1 rounded-md bg-gradient-to-r from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                      <FileText className="h-4 w-4 text-blue-600 group-hover:text-purple-600 transition-all duration-300" />
                    </div>
                    <span className="relative z-10 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">Create CV</span>
                  </Link>
                </Button>
                
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 rounded-lg opacity-0 group-hover:opacity-10 blur-sm transition-all duration-300"></div>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Free forever plan</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">ATS-optimized templates</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Instant PDF export</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full text-sm font-semibold text-blue-700 mb-6">
              <Zap className="h-4 w-4" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Create Your Perfect CV in 
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                3 Simple Steps
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes it easy to create professional CVs that get results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Choose Template</h3>
              <p className="text-gray-600 leading-relaxed">
                Select from our collection of professionally designed, ATS-optimized templates crafted by career experts
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Fill Your Info</h3>
              <p className="text-gray-600 leading-relaxed">
                Add your personal information, work experience, education, and skills with our intuitive form builder
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Download className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Download & Apply</h3>
              <p className="text-gray-600 leading-relaxed">
                Export your professional CV as PDF and start applying to your dream jobs with confidence
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" asChild>
                <Link href="/create" className="flex items-center">
                  Create CV
                  <FileText className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" asChild>
                <Link href="/video-intro" className="flex items-center">
                  Create Video
                  <Video className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-6">
              <Trophy className="h-4 w-4" />
              <span>Industry-Leading Platform</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose CareerCraft?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, customize, and share professional CVs that get you hired faster.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-blue-200">
                <CardHeader className="pb-4">
                  <div className="relative">
                    <div className={`h-18 w-18 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-gradient-to-br ${
                      index === 0 ? 'from-blue-500 to-cyan-500' :
                      index === 1 ? 'from-purple-500 to-pink-500' :
                      index === 2 ? 'from-green-500 to-emerald-500' :
                      'from-orange-500 to-red-500'
                    } group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="h-9 w-9 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-3 group-hover:text-blue-600 transition-colors font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <CardDescription className="text-gray-600 leading-relaxed text-sm">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Premium Templates</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our collection of professionally designed templates, crafted by career experts 
              and optimized for modern hiring practices.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <Card key={template.name} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      template.badge === 'Premium' ? 'bg-yellow-100 text-yellow-800' :
                      template.badge === 'Popular' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {template.badge}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <span className="text-sm">Template Preview</span>
                    </div>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">{template.name}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{template.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2" asChild>
              <Link href="/templates">View All Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full text-sm font-semibold text-green-700 mb-6">
              <Users className="h-4 w-4" />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of professionals who've successfully landed their dream jobs using CareerCraft
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "CareerCraft helped me create a professional CV that stood out from the crowd. I landed my dream job at a Fortune 500 company within 2 weeks!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  S
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Software Engineer at Google</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "The ATS-optimized templates are fantastic! My CV passed through all the screening systems and I got multiple interview calls."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  M
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Michael Chen</p>
                  <p className="text-sm text-gray-600">Marketing Director at Tesla</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Super easy to use and the templates look so professional. I'm not tech-savvy but was able to create an amazing CV in minutes!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  E
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Emily Rodriguez</p>
                  <p className="text-sm text-gray-600">HR Manager at Microsoft</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <p className="text-gray-600">Happy Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">24h</div>
              <p className="text-gray-600">Avg. Job Offer</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">4.9/5</div>
              <p className="text-gray-600">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 md:p-16">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
            }}/>
            <div className="relative text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
              <p className="text-lg text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join over 50,000 professionals who have successfully landed their dream jobs using CareerCraft. 
                Start creating your standout CV today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg" asChild>
                  <Link href="/create" className="flex items-center">
                    Create CV <FileText className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-4 text-lg" asChild>
                  <Link href="/video-intro" className="flex items-center">
                    Create Video <Video className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-center space-x-6 text-sm text-blue-200">
                <span>✓ No credit card required</span>
                <span>✓ Free forever plan</span>
                <span>✓ Export unlimited PDFs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 font-bold text-xl mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CareerCraft
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Your complete career development platform. Build professional documents, track your growth, and accelerate your career journey. Trusted by over 50,000 professionals worldwide.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>⭐ 4.9/5 rating</span>
                <span>•</span>
                <span>50,000+ users</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/examples" className="hover:text-white transition-colors">CV Examples</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Career Resources</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/blog" className="hover:text-white transition-colors">Career Blog</Link></li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Career Guides</Link></li>
                <li><Link href="/salary-guide" className="hover:text-white transition-colors">Salary Guide</Link></li>
                <li><Link href="/interview-prep" className="hover:text-white transition-colors">Interview Prep</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 CareerCraft. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made with ❤️ for job seekers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}