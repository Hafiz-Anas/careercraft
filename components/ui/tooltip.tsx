"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

interface TooltipProps {
  children: React.ReactNode
  content: string | React.ReactNode
  disabled?: boolean
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  content, 
  disabled = false,
  position = 'top'
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const [isBelow, setIsBelow] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      
      // Use viewport coordinates directly (no scroll offset needed for fixed positioning)
      let x = rect.left + rect.width / 2
      let y = rect.top - 12 // Position above the button using viewport coordinates
      
      // Ensure tooltip doesn't go off screen
      const tooltipWidth = 300 // max-w-xs approximation
      const padding = 16
      
      // Adjust x if tooltip would go off screen
      if (x - tooltipWidth / 2 < padding) {
        x = padding + tooltipWidth / 2
      } else if (x + tooltipWidth / 2 > window.innerWidth - padding) {
        x = window.innerWidth - padding - tooltipWidth / 2
      }
      
      // Ensure tooltip doesn't go above viewport
      let positionedBelow = false
      if (y < padding) {
        y = rect.bottom + 12 // Position below button instead
        positionedBelow = true
      }
      
      setTooltipPosition({ x, y })
      setIsBelow(positionedBelow)
    }
  }, [isVisible])

  const handleMouseEnter = () => {
    setIsVisible(true)
    setIsAnimating(true)
  }

  const handleMouseLeave = () => {
    setIsAnimating(false)
    // Delay hiding to allow smooth transition
    setTimeout(() => setIsVisible(false), 150)
  }

  if (disabled || !content) {
    return <>{children}</>
  }

  const tooltipContent = isVisible && (
    <div
      ref={tooltipRef}
      className="fixed pointer-events-none z-[9999] transition-all duration-200 ease-out"
      style={{
        left: tooltipPosition.x,
        top: tooltipPosition.y,
        transform: `translateX(-50%) ${isBelow ? 'translateY(0)' : 'translateY(-100%)'} ${isAnimating ? (isBelow ? 'translateY(8px)' : 'translateY(-8px)') : (isBelow ? 'translateY(4px)' : 'translateY(-4px)')}`,
        opacity: isAnimating ? 1 : 0
      }}
    >
      <div className="relative">
        {/* Tooltip Box */}
        <div className="bg-gray-900 text-white text-sm px-4 py-3 rounded-lg shadow-2xl border border-gray-700 max-w-xs whitespace-normal backdrop-blur-sm">
          <div className="font-medium text-center leading-relaxed">
            {content}
          </div>
        </div>
        
        {/* Arrow pointing to the button */}
        {!isBelow ? (
          /* Arrow pointing down when tooltip is above */
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div 
              className="w-0 h-0 border-transparent border-t-gray-900"
              style={{
                borderLeftWidth: '6px',
                borderRightWidth: '6px', 
                borderTopWidth: '6px'
              }}
            ></div>
          </div>
        ) : (
          /* Arrow pointing up when tooltip is below */
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2">
            <div 
              className="w-0 h-0 border-transparent border-b-gray-900"
              style={{
                borderLeftWidth: '6px',
                borderRightWidth: '6px', 
                borderBottomWidth: '6px'
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {typeof window !== 'undefined' && createPortal(tooltipContent, document.body)}
    </>
  )
}