-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  subscription TEXT DEFAULT 'free' CHECK (subscription IN ('free', 'premium'))
);

-- Create templates table
CREATE TABLE public.templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  preview_image TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('modern', 'classic', 'creative')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- Create CVs table
CREATE TABLE public.cvs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled CV',
  personal_info JSONB NOT NULL DEFAULT '{}',
  education JSONB NOT NULL DEFAULT '[]',
  experience JSONB NOT NULL DEFAULT '[]',
  skills JSONB NOT NULL DEFAULT '[]',
  projects JSONB NOT NULL DEFAULT '[]',
  certifications JSONB NOT NULL DEFAULT '[]',
  template_id UUID REFERENCES public.templates(id) NOT NULL,
  customization JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_public BOOLEAN DEFAULT false,
  slug TEXT UNIQUE
);

-- Create analytics table
CREATE TABLE public.analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  cv_id UUID REFERENCES public.cvs(id) ON DELETE CASCADE NOT NULL,
  views INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating updated_at
CREATE TRIGGER update_cvs_updated_at BEFORE UPDATE ON public.cvs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for CVs table
CREATE POLICY "Users can view own CVs" ON public.cvs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own CVs" ON public.cvs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs" ON public.cvs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs" ON public.cvs
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public CVs are viewable by everyone" ON public.cvs
  FOR SELECT USING (is_public = true);

-- Create policies for analytics table
CREATE POLICY "Users can view own CV analytics" ON public.analytics
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.cvs WHERE cvs.id = analytics.cv_id AND cvs.user_id = auth.uid()
  ));

CREATE POLICY "Analytics can be inserted for any CV" ON public.analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Analytics can be updated for any CV" ON public.analytics
  FOR UPDATE USING (true);

-- Create policies for templates table (public read)
CREATE POLICY "Templates are viewable by everyone" ON public.templates
  FOR SELECT USING (is_active = true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, first_name, last_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default templates
INSERT INTO public.templates (name, description, preview_image, category) VALUES
  ('Modern Professional', 'Clean and contemporary design perfect for tech and business roles', '/templates/modern-1.jpg', 'modern'),
  ('Classic Executive', 'Traditional layout ideal for corporate and senior positions', '/templates/classic-1.jpg', 'classic'),
  ('Creative Designer', 'Bold and artistic design for creative professionals', '/templates/creative-1.jpg', 'creative'),
  ('Modern Minimal', 'Sleek minimalist design with focus on content', '/templates/modern-2.jpg', 'modern'),
  ('Classic Academic', 'Traditional academic format for education and research', '/templates/classic-2.jpg', 'classic'),
  ('Creative Portfolio', 'Showcase-focused design for portfolios and creative work', '/templates/creative-2.jpg', 'creative');

-- Create indexes for better performance
CREATE INDEX idx_cvs_user_id ON public.cvs(user_id);
CREATE INDEX idx_cvs_slug ON public.cvs(slug);
CREATE INDEX idx_cvs_is_public ON public.cvs(is_public);
CREATE INDEX idx_analytics_cv_id ON public.analytics(cv_id);
CREATE INDEX idx_templates_category ON public.templates(category);
CREATE INDEX idx_templates_is_active ON public.templates(is_active);