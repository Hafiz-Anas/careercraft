'use client'

import React, { createContext, useContext } from 'react'
import { PortfolioTheme, PortfolioCustomization } from '@/types/portfolio'
import { portfolioThemes } from '@/lib/portfolio-utils'

interface ThemeContextType {
  theme: PortfolioTheme
  customization: PortfolioCustomization
  applyTheme: (element: HTMLElement) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  customization: PortfolioCustomization
}

export function PortfolioThemeProvider({ children, customization }: ThemeProviderProps) {
  const theme = portfolioThemes[customization.template]
  
  const applyTheme = (element: HTMLElement) => {
    // Apply CSS custom properties for theming
    element.style.setProperty('--color-primary', customization.primaryColor)
    element.style.setProperty('--color-secondary', customization.secondaryColor)
    element.style.setProperty('--color-accent', customization.accentColor)
    element.style.setProperty('--color-background', theme.colors.background)
    element.style.setProperty('--color-surface', theme.colors.surface)
    element.style.setProperty('--color-text-primary', theme.colors.text.primary)
    element.style.setProperty('--color-text-secondary', theme.colors.text.secondary)
    element.style.setProperty('--color-text-muted', theme.colors.text.muted)
    element.style.setProperty('--font-heading', theme.fonts.heading)
    element.style.setProperty('--font-body', theme.fonts.body)
    element.style.setProperty('--font-mono', theme.fonts.mono)
    element.style.setProperty('--section-spacing', theme.spacing.section)
    element.style.setProperty('--container-width', theme.spacing.container)
    
    // Apply font size class
    element.classList.add(`font-size-${customization.fontSize}`)
    
    // Apply font family class
    element.classList.add(`font-family-${customization.fontFamily}`)
  }

  React.useEffect(() => {
    const root = document.documentElement
    applyTheme(root)
  }, [customization, theme])

  const contextValue: ThemeContextType = {
    theme,
    customization,
    applyTheme
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={`portfolio-theme-${customization.template}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function usePortfolioTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('usePortfolioTheme must be used within a PortfolioThemeProvider')
  }
  return context
}

// Theme-aware component wrapper
interface ThemedProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function Themed({ children, className = '', style = {} }: ThemedProps) {
  const { customization } = usePortfolioTheme()
  
  const themedStyle = {
    ...style,
    '--primary': customization.primaryColor,
    '--secondary': customization.secondaryColor,
    '--accent': customization.accentColor,
  } as React.CSSProperties

  return (
    <div className={className} style={themedStyle}>
      {children}
    </div>
  )
}