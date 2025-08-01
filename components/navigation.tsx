'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Sparkles,
  FileText,
  Video,
  User,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

interface NavigationProps {
  variant?: 'default' | 'minimal'
}

export function Navigation({ variant = 'default' }: NavigationProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/create', label: 'Create CV', icon: FileText },
    { href: '/video-intro', label: 'Create Video', icon: Video },
    { href: '/portfolio/builder', label: 'Create Portfolio', icon: User },
  ]

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <header className="relative bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-gradient-to-r from-blue-200/20 via-purple-200/20 to-pink-200/20 shadow-lg shadow-blue-500/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-pink-50/30" />
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="relative container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="h-14 w-14 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-1">
                <Sparkles className="h-7 w-7 text-white group-hover:rotate-12 transition-transform duration-700" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 group-hover:blur-md transition-all duration-700 animate-pulse"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-20 transition-all duration-700 animate-ping"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-500">
                CareerCraft
              </span>
              <span className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                Build Your Future
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = isActiveLink(item.href)
                
                return (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`group relative px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 hover:scale-[1.01] ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 shadow-md shadow-blue-500/10' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:shadow-sm hover:shadow-blue-500/5'
                    }`}
                  >
                    {/* Background Glow Effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-sm opacity-0 group-hover:opacity-8 transition-all duration-300 ${
                      isActive ? 'opacity-12' : ''
                    }`}></div>
                    
                    {/* Icon with enhanced styling */}
                    <div className={`relative z-10 p-1 rounded-md transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20' 
                        : 'group-hover:bg-blue-100 group-hover:scale-105'
                    }`}>
                      <Icon className={`h-4 w-4 transition-all duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-600 group-hover:text-blue-600'
                      }`} />
                    </div>
                    
                    {/* Label */}
                    <span className="relative z-10 text-sm font-medium">
                      {item.label}
                    </span>
                    
                    {/* Animated dot indicator */}
                    {isActive && (
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse"></div>
                    )}
                    
                    {/* Hover shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                )
              })}
            </nav>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {variant === 'default' && (
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link href="/auth/signin" className="flex items-center space-x-2">
                    <span className="text-sm">Sign In</span>
                    <User className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              
              {/* Mobile Menu Button */}
              <div className="relative group lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="h-12 w-12 rounded-2xl bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 hover:from-blue-200 hover:via-purple-200 hover:to-pink-200 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 text-gray-700 group-hover:text-red-600 group-hover:rotate-90 transition-all duration-300" />
                  ) : (
                    <Menu className="h-5 w-5 text-gray-700 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
                  )}
                </button>
                
                {/* Button glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30">
            <nav className="flex flex-col space-y-3 mt-6">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = isActiveLink(item.href)
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-[1.01] ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white shadow-md shadow-blue-500/10'
                        : 'text-gray-700 hover:text-blue-600 bg-gradient-to-r from-gray-50 via-blue-50/50 to-purple-50/50 hover:from-blue-100 hover:via-purple-100 hover:to-pink-100 hover:shadow-sm hover:shadow-blue-500/5'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Icon container */}
                    <div className={`relative p-2 rounded-md transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20' 
                        : 'bg-white group-hover:bg-blue-100'
                    }`}>
                      <Icon className={`h-4 w-4 transition-all duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-600 group-hover:text-blue-600'
                      }`} />
                    </div>
                    
                    {/* Label */}
                    <span className="font-medium text-sm">{item.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse"></div>
                    )}
                    
                    {/* Hover shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                )
              })}
              
              {variant === 'default' && (
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center space-x-2">
                      <span className="text-sm">Sign In</span>
                      <User className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}