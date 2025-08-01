'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { personalInfoSchema } from '@/lib/validations/cv'
import type { PersonalInfo, FormStepProps } from '@/types'
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'

export function PersonalInfoForm({ data, onUpdate, onNext, onPrev, isFirst, isLast }: FormStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data.personalInfo,
    mode: 'onChange'
  })

  const watchedValues = watch()

  const onSubmit = (formData: PersonalInfo) => {
    onUpdate({ personalInfo: formData })
    if (!isLast) {
      onNext()
    }
  }

  // Auto-save on form changes
  const handleFieldChange = (field: keyof PersonalInfo, value: string) => {
    const updatedInfo = { ...data.personalInfo, [field]: value }
    onUpdate({ personalInfo: updatedInfo })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 h-5 w-5" />
          Personal Information
        </CardTitle>
        <CardDescription>
          Tell us about yourself. This information will appear at the top of your CV.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                onChange={(e) => {
                  register('firstName').onChange(e)
                  handleFieldChange('firstName', e.target.value)
                }}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                onChange={(e) => {
                  register('lastName').onChange(e)
                  handleFieldChange('lastName', e.target.value)
                }}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="mr-1 h-4 w-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                onChange={(e) => {
                  register('email').onChange(e)
                  handleFieldChange('email', e.target.value)
                }}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="mr-1 h-4 w-4" />
                Phone *
              </Label>
              <Input
                id="phone"
                {...register('phone')}
                onChange={(e) => {
                  register('phone').onChange(e)
                  handleFieldChange('phone', e.target.value)
                }}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              Location *
            </Label>
            <Input
              id="location"
              {...register('location')}
              onChange={(e) => {
                register('location').onChange(e)
                handleFieldChange('location', e.target.value)
              }}
              placeholder="New York, NY, USA"
            />
            {errors.location && (
              <p className="text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          {/* Optional Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Optional Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center">
                  <Globe className="mr-1 h-4 w-4" />
                  Website
                </Label>
                <Input
                  id="website"
                  type="url"
                  {...register('website')}
                  onChange={(e) => {
                    register('website').onChange(e)
                    handleFieldChange('website', e.target.value)
                  }}
                  placeholder="https://yourwebsite.com"
                />
                {errors.website && (
                  <p className="text-sm text-red-600">{errors.website.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="flex items-center">
                  <Linkedin className="mr-1 h-4 w-4" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  type="url"
                  {...register('linkedin')}
                  onChange={(e) => {
                    register('linkedin').onChange(e)
                    handleFieldChange('linkedin', e.target.value)
                  }}
                  placeholder="https://linkedin.com/in/johndoe"
                />
                {errors.linkedin && (
                  <p className="text-sm text-red-600">{errors.linkedin.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="github" className="flex items-center">
                  <Github className="mr-1 h-4 w-4" />
                  GitHub
                </Label>
                <Input
                  id="github"
                  type="url"
                  {...register('github')}
                  onChange={(e) => {
                    register('github').onChange(e)
                    handleFieldChange('github', e.target.value)
                  }}
                  placeholder="https://github.com/johndoe"
                />
                {errors.github && (
                  <p className="text-sm text-red-600">{errors.github.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary *</Label>
            <Textarea
              id="summary"
              {...register('summary')}
              onChange={(e) => {
                register('summary').onChange(e)
                handleFieldChange('summary', e.target.value)
              }}
              placeholder="Write a brief professional summary highlighting your key skills and experience..."
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              {watchedValues.summary?.length || 0}/500 characters
            </p>
            {errors.summary && (
              <p className="text-sm text-red-600">{errors.summary.message}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              disabled={isFirst}
            >
              Previous
            </Button>
            <Button type="submit" disabled={!isValid}>
              {isLast ? 'Save' : 'Next'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}